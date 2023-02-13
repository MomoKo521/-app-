<template>
  <div class="warrr">
    <!-- tabs栏 -->
    <van-tabs
      sticky
      title-active-color="red"
      color="#fff"
      v-model="active"
      @click="Oncilcik"
    >
      <van-tab title="综合"></van-tab>
      <van-tab title="价格">
        <template #title> 价格<van-icon name="sort" /> </template>
      </van-tab>
      <van-tab title="新品"></van-tab>
    </van-tabs>
    <!-- 商品列表 -->
    <!-- gutter  格子之间的距离 -->
    <van-grid :column-num="2" :gutter="10">
      <van-grid-item
        v-for="(item, index) in productList"
        :key="index"
        :to="'/productDetails?id=' + item.id"
      >
        <van-image :src="$baseApi + item.image" height="140" />
        <span>
          <font size="2">{{ item.storeName }}</font>
        </span>
        <span>
          <font size="4" color="#ff8001">￥{{ item.price }}</font>
        </span>
      </van-grid-item>
    </van-grid>
    <van-divider @click="Onincrease" v-if="limit < totalElements"
      >加载更多</van-divider
    >
    <van-empty description="空空如也" v-if="totalElements == 0" />
  </div>
</template>

<script>
import { getproductList } from "@/api/product.js";
export default {
  name: "productList",
  data() {
    return {
      limit: 10, // 页大小,默认为 10
      priceOrder: null, // 必须 价格排序（asc 升、desc 降）
      sid: null, //分类 ID
      news: null, //是否新品
      totalElements: 0, //总商品数
      productList: [], //存储商品列表
      active: 0, //tabs栏参数 默认选中综合
    };
  },
  created() {
    // 判断是否有路由中是否有ids参数
    if (this.$route.query.ids) {
      this.sid = this.$route.query.ids;
    }
    this.getproduct();
  },
  methods: {
    // 获取商品列表
    async getproduct() {
      let params = {
        // keyword, // 关键字
        limit: this.limit, //必须 页大小,默认为 10
        page: 1,
        news: this.news,
        priceOrder: this.priceOrder, // 必须 价格排序（asc 升、desc 降）
        sid: this.sid, //非必须 分类 ID
      };
      const refult = await getproductList(params);
      // console.log(refult);
      if (refult.status == 200) {
        this.totalElements = refult.data.totalElements;
        this.productList = refult.data.content;
      }
    },
    // 用户点击加载更多
    Onincrease() {
      this.limit += 10;
      //console.log(this.limit);
      this.getproduct();
    },
    // 用户切换商品类型
    Oncilcik() {
      this.limit = 10;
      if (this.active == 0) {
        // 综合
        this.news = null;
        this.priceOrder = null;
        this.getproduct();
      } else if (this.active == 1) {
        // 价格
        this.news = null;
        this.priceOrder = this.priceOrder == "asc" ? "desc" : "asc";
        this.getproduct();
      } else if (this.active == 2) {
        // 新品
        this.priceOrder = null;
        this.news = true;
        this.getproduct();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.warrr {
  padding: 5px;

  .van-grid-item {
    margin-top: 10px;
    .van-grid-item__content::after {
      border-width: 0;
    }
  }
}
</style>