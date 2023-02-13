<template>
  <div>
    <div class="content">
      <van-icon name="checked" />
      <span class="titile">订单已生成!</span>
      <div class="btn">
        <van-button type="default" @click="goOrdertype">查看订单</van-button>
        <van-button type="default" @click="gohome">返回首页</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "paySuccess",
  methods: {
    goOrdertype() {
      this.$router.push({ path: "orderType", query: { type: "1" } });
    },
    gohome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .van-icon {
    font-size: 100px;
    color: #fa436a;
  }
  .titile {
    color: #fa436a;
  }
  .btn {
    margin-top: 40px;
    width: 80%;
    display: flex;
    flex-direction: column;
    .van-button:nth-child(1) {
      background-color: #fa436a;
      margin-bottom: 20px;
      color: white;
    }
  }
}
</style>