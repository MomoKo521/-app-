<template>
  <div class="warr">
    <van-row>
      <van-col span="8">
        <font color="#f0ad4e" size="2">总资产 (元)</font>
        <font color="#f0ad4e" size="2">{{ balance.nowMoney }}</font>
      </van-col>
      <van-col span="8"
        ><font color="#f0ad4e" size="2">累计充值(元)</font>
        <font color="#f0ad4e" size="2">{{ balance.recharge }}</font></van-col
      >
      <van-col span="8"
        ><font color="#f0ad4e" size="2">累计消费(元)</font>
        <font color="#f0ad4e" size="2">{{
          balance.orderStatusSum
        }}</font></van-col
      >
    </van-row>
    <div style="margin-top: 20px">
      <van-cell v-for="item in recharge" :key="item.id">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #title>
          <van-icon name="shop-o" />
          充值￥{{ item.value.price }}赠送￥{{ item.value.give_price }}
        </template>
        <template #right-icon>
          <van-button
            round
            type="danger"
            size="mini"
            style="padding: 0 20px"
            @click="czmoney(item.id)"
            >充值</van-button
          >
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { balance, rechargeTypeList, moneycz } from "@/api/user.js";
export default {
  name: "wallet",
  data() {
    return {
      balance: {}, //用户资金统计
      recharge: [], //充值方案
    };
  },
  created() {
    this.getbalance();
    this.getrecharge();
  },
  methods: {
    // 获取用户资金统计
    async getbalance() {
      let result = await balance();
      //console.log(result);
      if (result.status == 200) {
        this.balance = result.data;
      }
    },
    // 获取充值方案
    async getrecharge() {
      let result = await rechargeTypeList();
      //console.log(result);
      if (result.status == 200) {
        this.recharge = result.data.rechargePriceWays;
      }
    },
    // 模拟充值
    async czmoney(id) {
      let result = await moneycz(id);
      if (result.status == 200) {
        this.$toast.success("充值成功");
        this.getbalance();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.warr {
  padding: 5px;
  .van-row {
    border-radius: 7px;
    background-color: #000000;
    text-align: center;
    padding: 5px 0;
    .van-col {
      font {
        display: block;
      }
      font:nth-child(1) {
        margin-bottom: 20px;
      }
    }
  }
}
</style>