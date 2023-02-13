
<template>
  <div class="warpper">
    <!-- 滑动商品 -->
    <div class="cart" v-if="nodata">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <van-swipe-cell v-for="item in cartList" :key="item.id">
          <van-card
            :num="item.cartNum"
            :desc="item.productInfo.storeInfo"
            :title="item.productInfo.storeName"
            class="goods-card"
            :thumb="$baseApi + item.productInfo.image"
          >
            <!-- 步进器 -->
            <template #footer>
              <van-stepper
                v-model="item.cartNum"
                :max="item.trueStock"
                integer
                @change="changecartnum(item.id, item.cartNum)"
              />
            </template>
            <!-- tags -->
            <template #tags>
              <van-tag plain type="danger" style="margin-top: 10px"
                >{{ item.productInfo.attrInfo.sku }}
              </van-tag>
            </template>
            <!-- 价钱(单价)-->
            <template #price>
              <font size="3" style="color: red">￥{{ item.truePrice }}</font>
            </template>
            <!-- 圆形多选框 -->
            <template #tag>
              <van-checkbox
                :name="item.id"
                checked-color="#ee0a24"
              ></van-checkbox>
            </template>
          </van-card>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="deletecart(item.id)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <!-- 没有数据提示盒子 -->
    <van-empty v-else description="空空如也！" />
    <!-- 商品提交 -->
    <!---->
    <van-submit-bar
      :price="cartmoney * 100"
      @submit="onSubmit"
      button-text="提交订单"
    >
      <van-checkbox v-model="checked" @click="checkALL">全选</van-checkbox>
      <template #tip> 向左滑动商品课删除该商品!</template>
    </van-submit-bar>
  </div>
</template>

<script>
import { getcartList, setCartNum, delCart } from "@/api/cart.js";
export default {
  name: "cart",
  data() {
    return {
      cartList: [], //存储购物车列表
      result: [], //全选的 name数组
      checked: false, //是否全选
      nodata: true, //是否有数据 默认有
    };
  },
  created() {
    this.getcartList();
  },
  computed: {
    // 结算出勾选的总价格
    cartmoney() {
      // 顺手判断一下每次勾选时存储勾选产品数组长度是否等于  购物车产品长度  等于全选就勾上
      // 前提有数据
      if (this.cartList.length > 1) {
        if (this.result.length == this.cartList.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      }
      // 计算总价钱
      let Allmoney = 0;
      this.result.forEach((r) => {
        this.cartList.forEach((res) => {
          if (r == res.id) {
            Allmoney += res.cartNum * res.truePrice;
          }
        });
      });
      return Allmoney;
    },
  },
  methods: {
    // 获取购物车列表
    getcartList() {
      getcartList().then((res) => {
        // console.log(res);
        if (res.status == 200) {
          this.cartList = res.data.valid;
          // 判断返回的数据长度是否大于1
          if (this.cartList.length > 0) {
            this.nodata = true;
          } else {
            this.nodata = false;
          }
        }
      });
    },
    // 修改购物车数量
    changecartnum(id, num) {
      this.$toast.loading({
        forbidClick: true,
      });
      let params = {
        number: num,
        id: id,
      };
      setCartNum(params).then((res) => {
        // 刷新数据
        this.getcartList();
      });
    },
    // 删除购物车商品
    deletecart(id) {
      let arr = [];
      arr.push(id);
      let params = {
        ids: arr,
      };
      delCart(params).then((res) => {
        if (res.status == 200) {
          this.getcartList();
          this.$toast.success("删除成功");
        }
      });
    },
    // 全选切换
    checkALL() {
      this.result = [];
      if (this.checked == true) {
        // 全选
        this.cartList.forEach((item) => {
          this.result.push(item.id);
        });
      }
    },
    // 点击提交订单
    onSubmit() {
      if (this.result.length > 0) {
        let ids = this.result.join();
        // 跳转到创建订单页面
        this.$router.push({ name: "creationOrder", query: { ids: ids } });
      } else {
        this.$toast.fail("请至少选择一个商品");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cart {
  padding: 0 10px;
  background-color: white;
  ::v-deep .van-swipe-cell {
    margin-top: 10px;
    .van-swipe-cell__wrapper {
      .goods-card {
        background-color: #fafafa;
      }
    }
  }
}
</style>
<style>
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
</style>