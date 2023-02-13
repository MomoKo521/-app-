<template>
  <div>
    <div class="top" v-if="Object.keys(orderInfo).length > 0">
      <div class="tite">
        <font color="white" size="3">{{ orderInfo.statusDto.msg }}</font>
      </div>
      <van-cell>
        <template #title>
          <font>{{ orderInfo.realName }}</font>
          {{ orderInfo.userPhone }}</template
        >
        <template #label> {{ orderInfo.userAddress }}</template>
      </van-cell>
    </div>
    <div
      class="cont"
      style="margin-top: 10px"
      v-if="Object.keys(orderInfo).length > 0"
    >
      <van-cell title="订单状态" :value="orderInfo.statusDto.title" />
      <van-card
        v-for="item in orderInfo.cartInfo"
        :key="item.id"
        :num="item.cartNum"
        :desc="item.productInfo.storeInfo"
        :title="item.productInfo.keyword"
        :thumb="$baseApi + item.productInfo.image"
      >
        <template #price>
          <font color="#ED6A0C" size="4">{{ item.truePrice }}</font>
        </template>
        <template #tags>
          <van-tag plain type="danger">{{
            item.productInfo.attrInfo.sku
          }}</van-tag>
        </template>
      </van-card>
      <van-cell title="快递" :value="orderInfo.deliveryName" />
      <van-cell title="订单号" :value="orderInfo.orderId" />
      <van-cell title="下单时间" :value="orderInfo.payTime" />
      <van-cell
        title="运费"
        :value="orderInfo.totalPostage == 0 ? '免运费' : orderInfo.totalPostage"
      />

      <van-cell
        title="优惠"
        :value="orderInfo.couponPrice == 0 ? '无优惠券' : orderInfo.couponPrice"
      />
      <van-cell title="总金额" :value="orderInfo.payPrice" />
      <van-cell title="支付方式" :value="orderInfo.statusDto.payType" />
    </div>
  </div>
</template>

<script>
import { orderInfo } from "@/api/order.js";
export default {
  name: "order",
  data() {
    return {
      orderInfo: {}, //订单详情
    };
  },
  created() {
    if (this.$route.query.key) {
      this.getOrderInfo(this.$route.query.key);
    }
  },
  methods: {
    async getOrderInfo(key) {
      let result = await orderInfo(key);
      console.log(result);
      if (result.status == 200) {
        this.orderInfo = result.data;
      }
    },
  },
};
</script>
<style >
* {
  margin: 0;
  padding: 0;
}
</style>
<style lang="scss" scoped>
.top {
  background-image: url("../../../static/userBg.png");
  .tite {
    line-height: 70px;
    text-align: center;
  }
  .van-cell {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }
}
.cont {
}
</style>