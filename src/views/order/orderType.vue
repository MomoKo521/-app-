<template>
  <div class="warr">
    <van-tabs v-model="active" @click="onchange">
      <van-tab v-for="item in nav" :key="item.status" :title="item.text">
        <template v-if="orderlist.length > 0">
          <!-- 一个订单购买了多个商品 -->
          <div
            v-for="value in orderlist"
            :key="value.id"
            style="margin-top: 10px"
          >
            <div v-for="s in value.cartInfo" :key="s.id">
              <van-cell :title="value.createTime" :value="item.text" />
              <van-card
                :num="s.cartNum"
                :desc="s.productInfo.storeInfo"
                :title="s.productInfo.storeName"
                :thumb="$baseApi + s.productInfo.image"
              >
                <template #tags>
                  <van-tag plain type="danger">{{
                    s.productInfo.attrInfo.sku
                  }}</van-tag>
                </template>
                <template #price>
                  <font color="#ED7162" size="4">
                    {{ s.productInfo.attrInfo.price }}</font
                  >
                </template>
                <template #footer>
                  <!-- 待付款 -->
                  <van-button
                    size="mini"
                    class="btn"
                    v-if="active == 0"
                    @click="onpay(value)"
                    >立即付款</van-button
                  >
                  <van-button
                    size="mini"
                    class="btn"
                    v-if="active == 0"
                    @click="cancel(value)"
                    >取消订单</van-button
                  >
                  <!-- 代发货 -->
                  <van-button
                    size="mini"
                    class="btn"
                    v-if="active == 1"
                    @click="Onfahuo"
                    >提醒发货</van-button
                  >
                  <!-- 待收货 -->
                  <van-button
                    size="mini"
                    class="btn"
                    v-if="active == 2"
                    @click="Ontake(value)"
                    >确认收货</van-button
                  >
                  <!--待评价 -->
                  <!-- <van-button size="mini" class="btn" v-if="active == 3"
                    ></van-button
                  > -->
                  <van-button size="mini" class="btn" @click="goOrder(value)"
                    >立即查看</van-button
                  >
                  <!-- 已完成 -->
                  <van-button
                    size="mini"
                    class="btn"
                    v-if="active == 4"
                    @click="Ondel(value)"
                    >删除订单</van-button
                  >
                </template>
              </van-card>
            </div>
          </div>
        </template>
      </van-tab>
    </van-tabs>
    <!-- 立即付款弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-radio-group v-model="radio">
        <van-cell>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #icon>
            <van-icon
              name="shop-o"
              style="line-height: 46px; margin-right: 5px"
            />
          </template>
          <template #title>
            <span class="custom-title">余额</span>
          </template>
          <template #label>
            <span class="custom-title">￥{{ userinfo.nowMoney }}</span>
          </template>
          <template #right-icon>
            <span class="custom-title" style="margin-top: 10px"
              ><van-radio name="1"></van-radio
            ></span>
          </template>
        </van-cell>
        <!-- 微信 -->
        <van-cell>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #icon>
            <van-icon
              name="shop-o"
              style="line-height: 46px; margin-right: 5px"
            />
          </template>
          <template #title>
            <span class="custom-title">微信</span>
          </template>
          <template #label>
            <span class="custom-title">暂未开通</span>
          </template>
          <template #right-icon>
            <span class="custom-title" style="margin-top: 10px">
              <van-radio name="1" disabled></van-radio
            ></span>
          </template>
        </van-cell>
      </van-radio-group>
      <van-button
        type="danger"
        block
        style="width: calc(100% - 20px); margin: 10px auto"
        @click="payment"
        >确定</van-button
      >
    </van-popup>
    <van-empty description="空空如也" v-if="orderlist.length == 0" />
  </div>
</template>

<script>
import { orderList, pay, take, del, cancelorder } from "@/api/order.js";
import { balance } from "@/api/user.js";
export default {
  name: "orderType",
  data() {
    return {
      active: this.$route.query.type * 1, //tab栏
      nav: [
        {
          text: "待付款",
          status: 0,
        },
        {
          text: "待发货",
          status: 1,
        },
        {
          text: "待收货",
          status: 2,
        },
        {
          text: "待评价",
          status: 3,
        },
        {
          text: "已完成",
          status: 4,
        },
      ],
      limit: 10,
      orderlist: [], //订单列表
      show: false, //弹出层
      radio: "1",
      proinfo: {},
      userinfo: {},
    };
  },
  created() {
    this.getOrderList(this.$route.query.type);
    this.getMoney();
  },
  methods: {
    // 获取订单列表
    async getOrderList(type) {
      let params = {
        type: type,
        limit: this.limit,
      };
      let refult = await orderList(params);
      console.log(refult);
      if (refult.status == 200) {
        this.orderlist = refult.data.content;
      }
    },
    // 获取用户资金
    async getMoney() {
      let refult = await balance();

      if (refult.status == 200) {
        this.userinfo = refult.data;
      }
    },
    //用户点击切换tab栏订单状态
    onchange(name, value) {
      // name 当前tab栏 状态
      this.getOrderList(name);
    },
    // 用户点击立即付款
    onpay(value) {
      this.show = true;
      this.proinfo = value;
    },
    // 用户点击立即付款确定按钮
    async payment() {
      let params = {
        uni: this.proinfo.orderId,
        from: "h5",
        paytype: "yue",
      };
      let result = await pay(params);
      // console.log(result);
      if (result.status == 200) {
        this.$toast.success("支付成功");
        this.getOrderList(0);
        this.show = false;
      }
    },
    //用户点击提醒发货
    Onfahuo() {
      this.$toast.success("已提醒卖家发货！");
    },
    // 用户点击确认收货
    async Ontake(value) {
      let params = {
        uni: value.orderId,
      };
      let result = await take(params);
      console.log(result);
      if ((result.status = 200)) {
        this.$toast.success("收货成功");
        this.active = 3;
        this.getOrderList(this.active);
      }
    },
    // 用户点击删除订单
    async Ondel(value) {
      let params = {
        uni: value.orderId,
      };
      let result = await del(params);
      //console.log(result);
      if ((result.status = 200)) {
        this.$toast.success("删除成功");
        this.active = 4;
        this.getOrderList(this.active);
      }
    },
    // 用户点击取消订单
    async cancel(value) {
      let params = {
        id: value.orderId,
      };
      let result = await cancelorder(params);
      console.log(result);
      if ((result.status = 200)) {
        this.$toast.success("取消订单成功");
        this.active = 0;
        this.getOrderList(this.active);
      }
    },
    //用户点击立即查看跳转订单详情页
    goOrder(value) {
      //console.log(value);
      this.$router.push({ path: "/order", query: { key: value.unique } });
    },
  },
};
</script>

<style lang="scss" scoped>
.warr {
  min-height: 600px;
  .van-card {
    background-color: white;
    margin-top: 0;
    .van-card__footer {
      .btn {
        padding: 12px 15px;
        border-radius: 7px;
      }
    }
  }
  .van-popup {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
}
</style>