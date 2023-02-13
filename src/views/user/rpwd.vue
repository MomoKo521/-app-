<template>
  <!--  修改密码-->
  <div class="warr">
    <van-form style="margin-top: 20px" @submit="onSubmit">
      <van-field
        v-model="yuanpassword"
        label="原始密码"
        type="password"
        placeholder="请输入"
      />
      <van-field
        v-model="newparssword"
        label="新密码"
        type="password"
        placeholder="请输入"
      />
      <van-field
        v-model="cfparssword"
        label="重复密码"
        type="password"
        placeholder="请输入"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          native-type="submit"
          color="#FE5E48"
          style="border-radius: 8px"
          >确定</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { forget, loginOut } from "@/api/login.js";
import Cookie from "js-cookie";
export default {
  name: "rpwd",
  data() {
    return {
      yuanpassword: "", //原密码
      newparssword: "", //新密码
      cfparssword: "", //重复密码
    };
  },
  methods: {
    // 用户点击确
    async onSubmit() {
      if (
        this.yuanpassword == "" ||
        this.newparssword == "" ||
        this.cfparssword == ""
      ) {
        this.$toast("请输入完整信息");
        return;
      }

      if (this.newparssword == this.cfparssword) {
        if (this.newparssword.length < 6) {
          this.$toast("新密码长度不能少于6");
          return;
        }
      } else {
        this.$toast("两次密码不相同");
        return;
      }
      // 发送请求
      let params = {
        newPassword: this.newparssword,
        password: this.yuanpassword,
      };
      let result = await forget(params);
      console.log(result);
      if (result.status == 200) {
        this.$router.push("/login");
        this.loginot();
      } else {
        this.$router.push("/nullPage");
      }
    },
    // 退出登陆
    async loginot() {
      let result = await loginOut();
      Cookie.remove("Token");
    },
  },
};
</script>

<style lang="scss" scoped>
.warr {
  min-height: 600px;
}
</style>