<template>
  <div class="creationOrderBox">
    <template>
      <!-- 没有地址 -->
      <van-cell is-link v-if="!addressInfo" @click="showaddress = true">
        <template #title>
          <span class="custom-title">请选择地址</span>
        </template>
      </van-cell>
      <!-- 存在地址 -->
      <van-cell is-link v-if="addressInfo" @click="showaddress = true">
        <template #title>
          <span class="custom-title">{{ addressInfo.realName }}</span>
          <span class="custom-title" style="margin-left: 8px">{{
            addressInfo.phone
          }}</span>
        </template>
        <template #label>
          <span class="custom-title">{{
            addressInfo.province +
            " " +
            addressInfo.district +
            " " +
            addressInfo.city
          }}</span>
        </template>
      </van-cell>
      <!-- Popup 弹出层  地址列表  -->
      <van-popup
        v-model="showaddress"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <!-- @click="onAdd" 跳转编辑用户地址页面 -->
        <van-contact-card type="add" />
        <!-- 用户地址列表 -->
        <van-contact-card
          v-for="item in addressList"
          :key="item.id"
          type="edit"
          :name="item.realName"
          :tel="item.phone"
          @click="onEdit(item)"
        />
      </van-popup>
      <!-- 商品信息 -->
      <van-card
        v-for="item in cartInfo.cartInfo"
        :key="item.id"
        :num="item.cartNum"
        :desc="item.productInfo.storeInfo"
        :title="item.productInfo.storeName"
        :thumb="$baseApi + item.productInfo.image"
      >
        <template #tags>
          <van-tag plain type="danger">{{
            item.productInfo.attrInfo.sku
          }}</van-tag>
        </template>

        <template #price>
          <span style="font-size: 18px; color: rgb(237, 106, 12)"
            >￥{{ item.productInfo.attrInfo.price }}</span
          >
        </template>
      </van-card>
      <!--  -->
      <van-cell title="优惠券" is-link @click="showDiscount = true" />
      <!--  Popup 弹出层  地址列表 优惠券 -->
      <van-popup
        v-model="showDiscount"
        position="bottom"
        :style="{ height: '30%' }"
      />
      <van-cell-group v-if="addressInfo">
        <van-cell title="商品价格" :value="ordersum.totalPrice" />
        <van-cell title="优惠" :value="ordersum.couponPrice" />
        <van-cell
          title="运费"
          :value="ordersum.payPostage > 0 ? ordersum.payPostage : '免运费'"
        />
        <van-field v-model="mark" label="备注" placeholder="请输入备注" />
      </van-cell-group>

      <div class="pay">
        <!-- 支付方式 -->
        <van-cell title="余额" icon="shop-o">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-checkbox v-model="checked"></van-checkbox>
          </template>
          <template #label>
            <span>{{ userInfo.nowMoney }}</span>
          </template>
        </van-cell>
        <van-cell title="微信" icon="shop-o">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-checkbox v-model="checked" disabled></van-checkbox>
          </template>
          <template #label>
            <span>暂未开通</span>
          </template>
        </van-cell>
        <!-- 提交订单 -->

        <van-submit-bar
          v-if="addressInfo"
          :price="ordersum.totalPrice * 100"
          button-text="提交订单"
          @submit="onSubmit"
        />
      </div>
    </template>
  </div>
</template>

<script>
// 导入订单模块的接口
import { getconfirm, orderSum, createOrder } from "@/api/order.js";
// 导入地址模块的接口
import { getaddressList } from "@/api/address.js";
export default {
  name: "creationOrder",
  data() {
    return {
      cartInfo: {}, //存储确认订单信息
      addressList: [], //存储用户收货地址信息
      addressInfo: null, //当前用户默认收货地址
      userInfo: {}, //用户信息
      showaddress: false, //是否展示地址面板
      showDiscount: false, //是否展示优惠券面板
      ordersum: {}, //订单金额
      mark: null, //备注
      checked: true,
    };
  },
  created() {
    this.getconfirm();
    this.getaddressList();
  },
  methods: {
    // 获取用户地址列表
    getaddressList() {
      getaddressList().then((res) => {
        this.addressList = res.data;
      });
    },
    // 确认订单
    getconfirm() {
      let params = {
        cartId: this.$route.query.ids,
      };
      getconfirm(params).then((res) => {
        if (res.status == 200) {
          this.cartInfo = res.data;
          // 获取默认收货地址
          this.addressInfo = res.data.addressInfo;
          this.userInfo = res.data.userInfo;
          //  存在收货地址才发生计算订单金额 请求
          if (this.addressInfo) {
            this.getorderSum();
          }
        }
      });
    },
    // 获取订单金额
    async getorderSum() {
      let params = {
        key: this.cartInfo.orderKey,
        addressId: this.addressInfo.id,
        couponId: null,
        payType: "yue",
        shipping_type: 1,
      };
      let refult = await orderSum(params);
      if (refult.status == 200) {
        this.ordersum = refult.data.result;
      }
    },
    //切换收货地址
    onEdit(item) {
      this.addressInfo = item;
      this.showaddress = false;
      // 切换地址重新计算价格
      this.getorderSum();
    },
    // 用户点击提交订单
    async onSubmit() {
      // 判断用户是否选择了收货地址
      if (!this.addressInfo) {
        this.$toast.fail("请选择收货地址");
      }
      // 判断用户金额是否足够支付
      if (this.userInfo.nowMoney > this.ordersum.totalPrice * 100) {
        //金额足够
        // 创建订单
        let params = {
          key: this.cartInfo.orderKey,
          addressId: this.addressInfo.id,
          couponId: 0,
          from: "h5",
          mark: this.mark,
          useIntegral: 0,
          payType: "yue",
          shippingType: 1,
          pinkId: 0,
        };
        let refult = await createOrder(params);
        console.log(refult);
        if (refult.status == 200) {
          this.$router.push("/paySuccess");
        }
      } else {
        this.$toast.fail("金额不足");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.creationOrderBox {
  padding: 10px;
  background-color: #f8f8f8;
  .van-popup {
    border-radius: 15px 15px 0 0;
  }
  .van-card {
    background-color: white;
  }
  .pay {
    margin-top: 10px;
    .van-cell__left-icon {
      margin-top: 10px;
    }
  }
}
</style>