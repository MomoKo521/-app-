<template>
  <div>
    <!--layouts底部组件 -->
    <van-tabbar fixed v-model="active">
      <van-tabbar-item
        :icon="item.icon"
        v-for="(item, index) in data"
        :key="index"
        :to="item.to.name"
        >{{ item.title }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  props: ["data"],
  data() {
    return {
      active: null,
    };
  },
};
</script>

<style>
</style>