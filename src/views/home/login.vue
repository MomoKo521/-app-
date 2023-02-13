
<template>
  <div class="content">
    <!-- 三角形 -->
    <div class="right-top-sign"></div>
    <!-- 表单 -->
    <div class="wrapper">
      <div class="left-top-sign">LOGIN</div>
      <div class="welcome">登陆</div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
    <!-- 文字 -->
    <div class="register-section">
      还没有账户？<router-link to="/register">马上注册</router-link>
    </div>
    <!-- 圆角 -->
    <div class="yuan"></div>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login.js";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    // 用户点点击提交按钮
    onSubmit(values) {
      let data = {
        username: this.username,
        password: this.password,
      };
      login(data).then((res) => {
        if (res.status == 200) {
          // 登陆成功
          // 保存token
          this.$store.dispatch("SaveToken", res.data.token);
          // 根据token获取用户信息并存储进vuex中
          getUserInfo().then((r) => {
            if (r.status == 200) {
              this.$store.dispatch("SaveUser", r.data);
              this.$router.push("/home");
            }
          });
        } else {
          Notify({ type: "warning", message: refult.msg });
        }
      });
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