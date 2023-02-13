<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <van-nav-bar left-arrow v-if="$route.meta.navBar">
      <template #title> {{ $route.meta.title }} </template>
      <template #right>
        <van-icon name="search" size="18" @click="gosearch" />
      </template>
      <template #left>
        <van-icon name="arrow-left" size="18" @click="$router.go(-1)" />
      </template>
    </van-nav-bar>
    <!-- router-view -->
    <div class="layouts-content">
      <!-- 根据路由meta中keepAlive判断当前路由组件是否需要缓存路由组件 -->
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view
      ></keep-alive>
      <router-view v-else></router-view>
    </div>
    <!-- 底部导航栏 -->
    <div class="layouts-footer" v-if="$route.meta.tabBar">
      <tabbars :data="tabbarsdata"></tabbars>
    </div>
  </div>
</template>

<script>
import tabbars from "@/components/TabBar.vue";
export default {
  name: "layouts",
  components: {
    tabbars,
  },
  data() {
    return {
      // 底部组件的数据
      tabbarsdata: [
        {
          title: "首页",
          icon: "home-o",
          to: {
            name: "/home",
          },
        },
        {
          title: "分类",
          icon: "apps-o",
          to: {
            name: "/productClassify",
          },
        },
        {
          title: "购物车",
          icon: "shopping-cart-o",
          to: {
            name: "/cart",
          },
        },
        {
          title: "个人中心",
          icon: "user-o",
          to: {
            name: "/userIndex",
          },
        },
      ],
    };
  },
  methods: {
    // 跳转搜索
    gosearch() {
      this.$router.push("/search");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>