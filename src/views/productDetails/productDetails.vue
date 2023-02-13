<template>
  <div class="fz">
    <!-- 轮播图 -->
    <van-swipe @change="onChange">
      <van-swipe-item
        v-for="(item, index) in produInfo.sliderImageArr"
        :key="index"
        ><van-image width="100%" :src="$baseApi + item"
      /></van-swipe-item>

      <template #indicator>
        <div class="custom-indicator" v-if="produInfo.sliderImageArr">
          {{ current + 1 }} /{{ produInfo.sliderImageArr.length }}
        </div>
      </template>
    </van-swipe>
    <!-- 商品信息 -->
    <van-cell-group class="cell">
      <van-cell class="info">
        <template #title>
          <font color="#ED6A0C" size="4">￥</font>
          <font color="#ED6A0C" size="6">{{ produInfo.price }}</font>
        </template>
        <template #default>
          <div class="defaultbox">
            <span>{{ produInfo.browse }}</span
            ><span>浏览</span>
          </div>
          <div class="defaultbox">
            <span>{{ produInfo.sales }}</span
            ><span>销量</span>
          </div>
        </template>
        <template #label>
          <font color="black">{{ produInfo.storeInfo }}</font>
        </template>
      </van-cell>
      <!-- sku -->
      <van-cell
        title="选择价格"
        is-link
        style="padding: 15px 15px"
        @click="show = true"
        v-if="!skuInfo"
      />
      <van-cell
        v-else
        title="选择价格"
        :value="skuInfo"
        style="padding: 15px 15px"
        @click="show = true"
      />
    </van-cell-group>
    <!-- img -->
    <div class="imgBox">
      <van-cell-group>
        <van-cell title="图文详情" />
      </van-cell-group>
      <div
        v-if="produInfo.description"
        v-html="$options.filters.chageUrl(produInfo.description, $baseApi)"
      ></div>
    </div>
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" to="/cart" />
      <van-goods-action-icon
        icon="star"
        text="已收藏"
        color="#ff5000"
        v-if="produInfo.userCollect"
        @click="Collection"
      />
      <van-goods-action-icon
        icon="star-o"
        text="收藏"
        v-else
        @click="Collection"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="show = true"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="show = true"
      />
    </van-goods-action>
    <!-- sku商品规格 -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
      @sku-selected="onByselect"
    />
  </div>
</template>

<script>
// 商品接口
import { getGoodsdetails, addCollection, cancel } from "@/api/product.js";
// 添加购物车接口
import { addCart } from "@/api/cart.js";
export default {
  nanme: "productDetails",
  data() {
    return {
      id: null, //商品id
      current: 0,
      produInfo: {}, //商品信息

      show: false, //sku商品管理是否显示
      sku: {
        // 数据结构见下方文档
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: "1.00", // 默认价格（单位元）
        none_sku: false, // 是否无规格商品
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://img01.yzcdn.cn/1.jpg",
      },
      skuInfo: "", //用户选择的商品规格
    };
  },
  created() {
    if (this.$route.query.id) {
      //console.log(this.$route.query.id);
      this.id = this.$route.query.id;
    }
    this.getList();
  },
  filters: {
    // 通过正则获取正确的大图
    chageUrl: function (data, url) {
      if (data) {
        var a = data;
        var vm = this;
        var b = /<img [^>]*src=['"]([^'"]+)[^>]*>/g;
        var s = a.match(b); //获取img标签
      }

      if (s != null) {
        for (var i = 0; i < s.length; i++) {
          var srcImg = s[i].replace(b, "$1").replace(/\s+/g, ""); //获取img标签src属性
          //console.log(srcImg)
          a = a.replace(new RegExp(srcImg, "g"), url + srcImg); //将api地址添加到src属性中
        }
      }
      // console.log(a);
      return a;
    },
  },
  methods: {
    // 获取商品详情
    async getList() {
      const refult = await getGoodsdetails(this.id);
      console.log(refult);
      if (refult.status == 200) {
        this.produInfo = refult.data.storeInfo;
        // 商品sku部分
        this.sku.stock_num = refult.data.storeInfo.stock; //默认库存
        this.sku.price = this.produInfo.price; //默认价格
        this.goods.picture = this.$baseApi + this.produInfo.image;
        // tree
        refult.data.productAttr.forEach((element) => {
          let treMap = {
            v: [],
          };
          // 获取skn标题
          treMap.k = element.attrName;
          treMap.k_s = element.attrName;
          // 获取商品参数
          element.attrValueArr.forEach((item) => {
            let skuMap = {};
            skuMap.id = item;
            skuMap.name = item;
            treMap.v.push(skuMap);
          });
          this.sku.tree.push(treMap);
        });
        //List
        for (let value in refult.data.productValue) {
          let list = {};
          list.id = refult.data.productValue[value].unique;
          let sk = refult.data.productValue[value].sku.split(",");
          for (let values in refult.data.productValue) {
            this.sku.tree.forEach((r, i) => {
              // lsit[商品规格]=商品规格
              list[r.k_s] = sk[i];
            });
          }
          list.price = refult.data.productValue[value].price * 100;
          list.stock_num = refult.data.productValue[value].stock;
          this.sku.list.push(list);
        }
      }
    },
    // 轮播图
    onChange(index) {
      this.current = index;
    },
    // sku用户点击 购买回调
    async onBuyClicked(skuData) {
      let params = {
        cartNum: skuData.selectedNum,
        productId: this.id,
        uniqueId: skuData.selectedSkuComb.id,
        new: 0,
      };
      const result = await addCart(params);
      if (result.status == 200) {
        this.$router.push({
          path: "/creationOrder",
          query: {
            ids: result.data.cartId,
          },
        });
      }
    },
    // sku用户点击加入购物车回调
    async onAddCartClicked(skuData) {
      // console.log(skuData);
      let params = {
        cartNum: skuData.selectedNum,
        productId: this.id,
        uniqueId: skuData.selectedSkuComb.id,
        new: 0,
      };
      const result = await addCart(params);
      // console.log(result);
      if (result.status == 200) {
        this.$toast.success("添加购物车成功");
      } else {
        this.$toast.fail("添加购物车失败");
      }
      this.show = false;
    },
    // 用户切换  切换规格类目时触发
    onByselect(skuValue) {
      //console.log(skuValue);
      let list = "";
      this.sku.tree.forEach((item) => {
        for (let value in skuValue.selectedSku) {
          if (item.k == value) {
            list += skuValue.selectedSku[value];
          }
        }
      });
      this.skuInfo = list;
    },
    // 取消收藏或者加入收藏
    async Collection() {
      let params = {
        category: "collect",
        id: this.id,
      };
      if (this.produInfo.userCollect) {
        // 取消收藏
        let result = await cancel(params);

        if (result.status == 200) {
          this.$toast.fail("取消成功");
          this.produInfo.userCollect = false;
        }
      } else {
        // 添加收藏
        let result = await addCollection(params);
        if (result.status == 200) {
          this.$toast.success("收藏成功");
          this.produInfo.userCollect = true;
        }
      }
    },
  },
};
</script>

<style>
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
</style>
<style lang="scss" scoped>
.fz {
  background-color: #f8f8f8;
  padding: 10px 10px 0 10px;
  .cell {
    background-color: transparent;
    //padding: 20px 16px;
    .van-cell {
      margin-top: 10px;
      border-radius: 10px;
    }
  }
  .info {
    padding: 20px 16px;
    .van-cell__value {
      display: flex;
      justify-content: flex-end;
      text-align: center;
      .defaultbox {
        display: flex;
        flex-direction: column;
        margin: 0 3px;
        span {
          line-height: normal;
        }
      }
    }
  }
  .imgBox {
    margin-top: 10px;
    padding: 0 15px;
    background-color: white;
  }
}
</style>