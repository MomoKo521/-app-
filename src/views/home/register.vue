
<template>
  <div class="content">
    <!-- 三角形 -->
    <div class="right-top-sign"></div>
    <!-- 表单 -->
    <div class="wrapper">
      <div class="left-top-sign">RREGISTER</div>
      <div class="welcome">注册</div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="nickname"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="account"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          name="密码"
          type="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="cfpassword"
          name="重复密码"
          type="password"
          label="重复密码"
          placeholder="重复密码"
          :rules="[{ required: true, message: '请填写重复密码' }]"
        />
        <van-field v-model="captcha" center clearable label="短信验证码">
          <template #button>
            <div class="btn" @click="registerCode">{{ code }}</div>
          </template>
        </van-field>

        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
    <!-- 文字 -->
    <div class="register-section">
      已有账户？<router-link to="/login">点击登陆</router-link>
    </div>
    <!-- 圆角 -->
    <div class="yuan"></div>
  </div>
</template>

<script>
import { registerCode, register } from "@/api/login.js";
import { Toast } from "vant";
export default {
  name: "register",
  data() {
    return {
      code: "获取验证码",
      nickname: "", //昵称
      account: "", //手机号码
      captcha: "", //验证码
      password: "", //密码
      cfpassword: "", //重复密码
    };
  },
  methods: {
    // 用户点点击提交按钮
    onSubmit() {
      let reg = /^1[34578]\d{9}$/;
      // 手机号
      if (!reg.test(this.account)) {
        Toast.fail("手机号不符合");
        return;
      }
      // 验证密码
      if (this.password != this.cfpassword) {
        Toast.fail("两次密码不一致");
        return;
      }
      // 验证码是否一致
      if (this.code != this.captcha) {
        Toast.fail("验证码错误");
        return;
      }
      let data = {
        nickname: this.nickname, //昵称
        account: this.account, //手机号码
        captcha: this.captcha, //验证码
        password: this.password, //密码
      };
      // console.log(data);
      register(data).then((res) => {
        if (res.status == 200) {
          Toast.success("注册成功");
          this.$router.push("/login");
        }
      });
    },
    //用户点击获取验证码
    registerCode() {
      // 手机正则
      let reg = /^1[34578]\d{9}$/;
      if (reg.test(this.account)) {
        registerCode({
          phone: this.account,
          type: "register",
        }).then((res) => {
          this.code = res.data;
        });
      } else {
        Toast("手机号不符合要求");
      }
    },
  },
};
</script>

<style  lang="scss" scoped>
@import "uni.scss";
.content {
  width: 100%;
  padding-top: 115px;
  position: absolute;
  height: 82.5%;
  overflow: hidden;
  background: #fff;
  .right-top-sign {
    position: absolute;
    top: 40px;
    right: -15px;
    z-index: 95;

    &:before,
    &:after {
      display: block;
      content: "";
      width: 200px;
      height: 40px;
      background: #b4f3e2;
    }

    &:before {
      webkit-transform: rotate(50deg);
      transform: rotate(50deg);
      border-radius: 0 50px 0 0;
    }

    &:after {
      position: absolute;
      right: -99px;
      top: 0;
      -webkit-transform: rotate(-50deg);
      transform: rotate(-50deg);
      border-radius: 50px 0 0 0;
      /* background: pink;
			/* background: pink; */
    }
  }
  .wrapper {
    position: relative;
    .left-top-sign {
      position: relative;
      color: rgb(230, 228, 228);
      opacity: 0.5;
      font-size: 50px;
      left: -5px;
    }
    .welcome {
      position: relative;
      font-size: 20px;
      top: -35px;
      font-weight: 600;
      color: #555;
      left: 20px;
    }
    .van-form {
      padding: 0 20px;
      .van-button {
        background-color: red;
        border-color: red;
      }
      .btn {
        padding: 2px 3px;
        background-color: #5695f9;
        color: white;
      }
    }
  }

  .register-section {
    z-index: 98;
    position: absolute;
    text-align: center;
    width: 100%;
    bottom: 30px;
    color: #555;
    font-size: 14px;
    a {
      color: #555;
    }
  }
  .yuan {
    position: absolute;
    bottom: -150px;
    left: -100px;
    height: 180px;
    width: 180px;
    border: 40px solid #d0d1fd;
    border-radius: 50%;
  }
}
</style>