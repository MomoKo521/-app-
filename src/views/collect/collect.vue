<template>
  <div class="warr">
    <div v-if="list.length > 0">
      <van-cell title="">
        <template #right-icon>
          <font
            v-html="status ? '取消' : '管理'"
            @click="status ? (status = false) : (status = true)"
          ></font>
        </template>
      </van-cell>
    </div>
    <!-- 商品 -->

    <van-checkbox-group v-model="result">
      <van-grid :column-num="2">
        <van-grid-item v-for="value in list" :key="value.pid">
          <van-checkbox
            :name="value.pid"
            class="checkbox"
            v-if="status"
            @click="checkchange"
          ></van-checkbox>
          <router-link :to="'/productDetails?id=' + value.pid">
            <van-image width="165" height="150" :src="$baseApi + value.image" />
            <font
              style="width: 100%; margin-top: 10px"
              size="2"
              color="#774BA9"
              >{{ value.storeName }}</font
            >
            <font
              style="width: 100%; margin-top: 10px"
              size="3"
              color="#FF8974"
              >{{ value.price }}</font
            >
          </router-link>
        </van-grid-item>
      </van-grid>
    </van-checkbox-group>
    <!-- 加载更多 -->
    <van-divider @click="Onmore" v-if="list.length == limit"
      >加载更多</van-divider
    >
    <!-- 操作 -->
    <!--  -->
    <van-submit-bar
      button-text="删除"
      v-if="status && list.length > 0"
      @submit="ondel"
    >
      <template #default>
        <van-checkbox
          v-model="checked"
          style="margin-right: 48%"
          @click="checkAll"
          >全选</van-checkbox
        >
      </template>
    </van-submit-bar>
    <!-- 没有数据 -->
    <van-empty image="error" description="空空如也" v-if="list.length == 0" />
  </div>
</template>

<script>
import { collect, delcollect } from "@/api/collect.js";
export default {
  name: "collect",
  data() {
    return {
      page: 1,
      limit: 10,
      list: [], //商品数据
      result: [], //存储勾选商品的pid
      checked: false, //是否全选
      status: false, //当前操作状态  管理状态/默认状态
    };
  },
  created() {
    // 存在type就调用函数
    if (this.$route.query.type) {
      this.getcollect();
      // 判断type的值 修改router.mata.title数据
      if (this.$route.query.type == "collect") {
        this.$route.meta.title = "我的收藏";
      } else if (this.$route.query.type == "foot") {
        this.$route.meta.title = "我的足迹";
      }
    }
  },
  methods: {
    // 获取收藏/足迹
    async getcollect() {
      let params = {
        page: this.page,
        limit: this.limit,
        type: this.$route.query.type,
      };
      //console.log(params);
      let result = await collect(params);
      //console.log(result);
      if (result.status == 200) {
        this.list = result.data;
      }
    },
    // 用户点击全选单选框
    checkAll() {
      if (this.checked) {
        // 全选
        this.list.forEach((element) => {
          this.result.push(element.pid);
        });
      } else {
        // 取消全选
        this.result = [];
      }
    },
    // 用户点击多选框
    checkchange() {
      // 如果长度相同说明全部勾选
      if (this.result.length == this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    // 点击加载更多
    Onmore() {
      this.limit += 10;
      this.getcollect();
    },
    // 点击删除
    async ondel() {
      if (this.$route.query.type) {
        let productIds = this.result.join(",");
        //console.log(productIds);
        let result = await delcollect(productIds, this.$route.query.type);
        // console.log(result);
        if (result.status == 200) {
          this.$toast("删除成功");
          this.getcollect();
          this.result = [];
          this.checked = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.warr {
  min-height: 600px;
  padding: 10px 5px;
  .van-grid-item {
    position: relative;
    .checkbox {
      z-index: 999;
      position: absolute;
      left: 10px;
      top: 10px;
    }
  }
}
</style>