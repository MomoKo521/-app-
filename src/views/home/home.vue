<template>
  <div class="warpper">
    <!-- 搜索 -->
    <van-search
      shape="round"
      background="white"
      placeholder="请输入搜索关键词"
      @click="gosearch"
    />
    <!-- 轮播图 -->

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1989fa">
      <van-swipe-item v-for="(item, index) in bannerList" :key="index">
        <img :src="$baseApi + item.pic" />
      </van-swipe-item>
    </van-swipe>

    <!-- 宫格-->
    <van-grid :border="false" :column-num="4">
      <van-grid-item v-for="item in Menus" :key="item.id" :to="item.url">
        <van-image :src="imgUrls + item.pic" />
        <span>{{ item.name }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 精品推荐 -->
    <div class="Bastbox">
      <div class="title">
        <font size="3">精品推荐:</font>
      </div>
      <van-grid :border="false" :column-num="2">
        <van-grid-item
          v-for="item in BastList"
          :key="item.id"
          :to="'/productDetails?id=' + item.id"
        >
          <van-image :src="imgUrls + item.image" style="height: 140px" />
          <div>
            <font size="2">{{ item.storeName }}</font>
          </div>
          <div>
            <font size="4" style="color: rgb(255, 128, 1)"
              >￥{{ item.price }}</font
            >
            <font
              size="1"
              style="color: rgb(192, 196, 204); text-decoration: line-through"
              >￥{{ item.otPrice }}</font
            >
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 猜你喜欢 -->
    <div class="likebox">
      <div class="title">
        <font size="3">猜你喜欢:</font>
      </div>
      <van-card
        v-for="item in likeList"
        :key="item.id"
        tag="Like"
        price="2.00"
        :desc="item.storeInfo"
        :title="item.storeName"
        :thumb="imgUrls + item.image"
        origin-price="10.00"
        @click="goto(item.id)"
      >
        <template #price>
          <font size="4" style="color: rgb(255, 128, 1)"
            >￥{{ item.price }}</font
          >
        </template>
        <template #origin-price>
          <font
            size="1"
            style="color: rgb(192, 196, 204); text-decoration: line-through"
            >￥{{ item.otPrice }}</font
          >
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
// 导入axios pai请求
import { getBanner, getMenus, getBastList, getLikeList } from "@/api/home.js";
export default {
  name: "home",
  data() {
    return {
      bannerList: [], //轮播图数据
      Menus: [], //菜单
      BastList: [], //精品推荐
      likeList: [], //猜你喜欢
      imgUrls: this.$baseApi,
    };
  },
  created() {
    this.getBanner();
    this.getMenus();
    this.getBastList();
    this.getLikeList();
  },
  methods: {
    // 获取首页轮播图
    async getBanner() {
      let refult = await getBanner();
      //console.log(refult);
      if (refult.status == 200) {
        this.bannerList = refult.data;
      }
    },
    //获取菜单
    async getMenus() {
      let refult = await getMenus();
      //console.log(refult);
      if (refult.status == 200) {
        this.Menus = refult.data;
      }
    },
    //精品推荐
    async getBastList() {
      let refult = await getBastList();
      //console.log(refult);
      if (refult.status == 200) {
        this.BastList = refult.data;
      }
    },
    //猜你喜欢
    async getLikeList() {
      let refult = await getLikeList();
      // console.log(refult);
      if (refult.status == 200) {
        this.likeList = refult.data;
      }
    },
    // 用户点击猜你喜欢
    goto(ids) {
      this.$router.push({ path: "/productDetails", query: { id: ids } });
    },
    // 跳转搜索页面
    gosearch() {
      this.$router.push("/search");
    },
  },
};
</script>

<style lang="scss" scoped>
.warpper {
  padding: 5px;
  background-color: #f8f8f8;
  .van-swipe {
    margin: 10px 0;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .Bastbox {
    padding: 10px 0;
    background-color: white;
    padding: 5px;
    .title {
      padding: 10px 0;
    }
  }
  .likebox {
    padding: 10px 0;
    background-color: white;
    padding: 5px;
    .title {
      padding: 10px 0;
    }
    .van-card {
      background-color: white;
    }
  }
}
</style>