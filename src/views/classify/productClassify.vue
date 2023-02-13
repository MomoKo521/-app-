<template>
  <!-- 商品分类 -->
  <div class="warpper">
    <van-row>
      <van-col span="9">
        <van-cell
          :title="item.cateName"
          v-for="(item, index) in list"
          :key="item.id"
          @click="navclick(item.id, index)"
          :class="{ active: index == active }"
        />
      </van-col>
      <van-col span="15">
        <!-- 宫格 -->
        <van-grid :border="false" :column-num="3">
          <!-- :to="item.url" -->
          <van-grid-item
            v-for="item in data"
            :key="item.id"
            @click="goProductList(item)"
          >
            <van-image :src="$baseApi + item.pic" />
            <font size="2">{{ item.cateName }}</font>
          </van-grid-item>
        </van-grid>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { getDate } from "@/api/productClassify.js";
export default {
  name: "productClassify",
  data() {
    return {
      activeKey: 0,
      list: [], //存储分类数据
      data: [], //存储展示的数据
      active: 0,
    };
  },
  created() {
    this.getDate();
  },
  methods: {
    // 获取分类数据
    async getDate() {
      let result = await getDate();
      //console.log(result);
      if (result.status == 200) {
        this.list = result.data;
        this.navclick(this.list[0].id, 0);
      }
    },
    // 获取要展示的数据
    navclick(data, index) {
      this.active = index;
      let list = [];
      this.list.forEach((r) => {
        r.children.forEach((res) => {
          if (res.pid == data) {
            list.push(res);
          }
        });
      });
      this.data = list;
    },
    // 跳转ProductList组件
    goProductList(item) {
      console.log(item);
      this.$router.push({ name: "productList", query: { ids: item.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.warpper {
  background-color: white;
  .active {
    span {
      padding-left: 10px;
      border-left: 3px solid #ff6634;
    }
  }
  ::v-deep .van-image {
    .van-image__img {
      border-radius: 50%;
    }
  }
}
</style>