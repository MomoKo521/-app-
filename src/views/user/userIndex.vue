<template>
  <div class="warr">
    <!-- 个人信息 -->
    <div style="padding: 10px" class="top">
      <van-row>
        <van-col span="24"
          ><van-icon
            name="setting-o"
            size="30"
            style="float: right"
            color="white"
        /></van-col>
        <van-col span="24" class="portrait" style="min-height: 160px">
          <van-image
            v-if="userinfo.avatar"
            width="100"
            height="100"
            :src="$baseApi + '/file/' + userinfo.avatar"
          />
          <font style="line-height: 100px; margin-left: 20px; color: white">{{
            userinfo.nickname
          }}</font>
        </van-col>
        <div class="userBox">
          <div>
            <font color="#E83A53">{{ userinfo.nowMoney }}</font>
            <font color="white">余额</font>
          </div>
          <div>
            <font color="#E83A53">{{ userinfo.couponCount }}</font>
            <font color="white">优惠券</font>
          </div>
          <div>
            <font color="#E83A53">{{ userinfo.payCount }}</font>
            <font color="white">购买数</font>
          </div>
          <div>
            <font color="#E83A53">{{ userinfo.integral }}</font>
            <font color="white">积分</font>
          </div>
        </div>
      </van-row>
    </div>
    <!-- 订单状态 -->
    <van-grid class="zt" :column-num="5" :border="false">
      <van-grid-item icon="shop-o" text="未支付" to="/orderType?type=0" />
      <van-grid-item icon="logistics" text="代发货" to="/orderType?type=1" />
      <van-grid-item
        icon="goods-collect-o"
        text="待收货"
        to="/orderType?type=2"
      />
      <van-grid-item icon="cart-o" text="待评价" to="/orderType?type=3" />
      <van-grid-item icon="cart-o" text="已完成" to="/orderType?type=4" />
    </van-grid>
    <!-- 信息管理 -->
    <div class="zt">
      <!-- 地址管理 -->
      <van-cell title="地址管理" is-link to="/contactList">
        <template #icon>
          <van-icon
            name="location"
            style="margin: 5px 5px 0 0"
            color="#5FCDB3"
          />
        </template>
      </van-cell>
      <!-- 我的钱包 -->
      <van-cell title="我的钱包" is-link to="/wallet">
        <template #icon>
          <van-icon name="paid" style="margin: 5px 5px 0 0" color="pink" />
        </template>
      </van-cell>
      <!-- 我的收藏 -->
      <van-cell title="我的收藏" is-link to="/collect?type=collect">
        <template #icon>
          <van-icon
            name="goods-collect"
            style="margin: 5px 5px 0 0"
            color="#54B4EF"
          />
        </template>
      </van-cell>
      <!-- 我的足迹 -->
      <van-cell title="我的足迹" is-link to="/collect?type=foot">
        <template #icon>
          <van-icon
            name="underway"
            style="margin: 5px 5px 0 0"
            color="#e07472"
          />
        </template>
      </van-cell>
      <!-- 修改密码 -->
      <van-cell title="修改密码" is-link to="/rpwd">
        <template #icon>
          <van-icon
            name="setting"
            style="margin: 5px 5px 0 0"
            color="#e07472"
          />
        </template>
      </van-cell>
      <!-- 提出登陆按钮 -->
      <van-button
        type="danger"
        style="width: 100%; margin-top: 10px"
        @click="logintuo"
        >退出登陆</van-button
      >
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { getUserInfo, loginOut } from "@/api/login.js";
export default {
  name: "userIndex",
  data() {
    return {
      userinfo: {}, //用户信息
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      let result = await getUserInfo();
      console.log(result);
      if (result.status == 200) {
        this.userinfo = result.data;
      }
    },
    // 退出登陆
    async logintuo() {
      let result = await loginOut();
      console.log(result);
      if (result.status == 200) {
        this.$toast.success("退出成功");
        Cookies.remove("Token");
        sessionStorage.clear();
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.warr {
  height: 95vh;
  background-color: #f8f8f8;
  .top {
    margin-bottom: 30px;
    position: relative;
    background-image: url("../../../static/userBg.png");
    border-bottom-left-radius: 16%;
    border-bottom-right-radius: 16%;
    .portrait {
      display: flex;
    }
    .userBox {
      position: absolute;
      padding: 5px 0;
      bottom: -10px;
      display: flex;
      background-color: #3e171f;
      width: calc(100% - 24px);
      border-radius: 7px;
      div {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 25%;
        font {
          margin: 5px 0;
        }
      }
    }
  }
  .zt {
    width: calc(100% - 24px);
    margin: 20px auto;
  }
}
</style>