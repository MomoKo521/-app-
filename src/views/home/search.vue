<template>
  <div class="warrr">
    <!-- 搜索 -->
    <van-search
      v-model="value"
      shape="round"
      background="#FF0000"
      placeholder="请输入搜索关键词"
      @search="Onsearch"
      ref="s"
    />
    <!-- 最近搜索 -->
    <div style="padding: 15px">
      <div style="font-size: 12px">最近搜索：</div>
      <van-tag
        style="margin: 10px"
        type="primary"
        size="large"
        color="#EEEEEE"
        text-color="#B8B8B8"
        v-for="(item, index) in lately"
        :key="index"
        @click="ontag(item)"
        >{{ item }}</van-tag
      >
    </div>
    <!-- 热门搜索 -->
    <div style="padding: 15px">
      <div style="font-size: 12px">热门搜索</div>
      <van-tag
        type="primary"
        size="large"
        color="#EEEEEE"
        text-color="#B8B8B8"
        v-for="(item, index) in hotList"
        :key="index"
        style="margin: 10px"
        @click="ontag(item)"
        >{{ item }}</van-tag
      >
    </div>
    <!-- 搜索列表 -->
    <van-grid :column-num="2" :gutter="10" v-if="searchList.length > 0">
      <van-grid-item
        v-for="value in searchList"
        :key="value.id"
        @click="goproduc(value.id)"
      >
        <van-image :src="$baseApi + value.image" />
        <span>
          <font size="3" style="margin-left: 5px">{{ value.storeName }}</font>
        </span>
        <span>
          <font size="3" color="#FF831A">￥{{ value.price }}</font>
          <font size="2" color="#C8D0DE" style="text-decoration: line-through"
            >￥{{ value.otPrice }}</font
          >
        </span>
      </van-grid-item>
    </van-grid>
    <!-- 空状态 -->
    <van-empty image="error" description="描述文字" v-else />
  </div>
</template>

<script>
import { getHot, getsearchList } from "@/api/search.js";
export default {
  name: "search",
  data() {
    return {
      hotList: [], //热门搜索
      lately: [], //最近搜索
      value: "", //搜索关键字
      searchList: [], //搜索list
    };
  },
  created() {
    this.gethot();
  },
  methods: {
    // 获取热门关键字
    async gethot() {
      const result = await getHot();
      if (result.status == 200) {
        this.hotList = result.data;
      }
    },
    // 用户输入关键字搜索
    async Onsearch() {
      // 添加最近搜索
      let num = this.lately.indexOf(this.value);
      if (num == -1) {
        this.lately.unshift(this.value);
      } else {
        this.lately.splice(num, 1);
        this.lately.unshift(this.value);
      }
      // 发送获取搜索商品信息
      const result = await getsearchList(this.value);
      console.log(result);
      if (result.status == 200) {
        this.searchList = result.data.content;
      }
    },
    // 跳转详情
    goproduc(id) {
      this.$router.push({ path: "/productDetails", query: { id: id } });
    },
    // 用户点击热门搜索和最近搜索
    ontag(item) {
      this.value = item;
      console.log(item);
      let num = this.lately.indexOf(item);
      if (num == -1) {
        this.lately.unshift(item);
      } else {
        // 存在
        this.lately.splice(num, 1);
        this.lately.unshift(item);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.warrr {
  background-color: #f8f8f8;
  height: 95vh;
}
</style>