<template>
  <div class="warr">
    <van-form @submit="onSubmit">
      <van-field
        v-model="list.realName"
        label="用户名"
        placeholder="请输入"
        required
      />
      <van-field
        v-model="list.phone"
        label="手机号"
        placeholder="请输入"
        required
      />
      <!-- 省市区选择 -->
      <van-field
        readonly
        clickable
        name="area"
        :value="value"
        label="选择地址"
        placeholder="请选择"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="gionList"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>
      <!-- 详细地址 -->
      <van-field
        v-model="list.detail"
        label="详细地址"
        placeholder="请输入"
        required
      />
      <van-field
        v-model="list.postCode"
        label="收货邮政编码"
        placeholder="请输入"
      />
      <van-cell style="margin-top: 10px">
        <template #title>
          <van-icon name="shop-o" /> <span>设为默认</span>
        </template>
        <template #default>
          <van-switch v-model="isDefault" size="24px" />
        </template>
      </van-cell>
      <div style="margin: 20px">
        <van-button round block type="danger" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <div style="margin: 10px 20px" v-if="$route.params.id">
      <van-button round block type="warning" @click="Ondel">删除</van-button>
    </div>
  </div>
</template>

<script>
import {
  getaddressInfo,
  getregion,
  operationaddress,
  deladdress,
} from "@/api/address.js";
export default {
  name: "newContact",
  data() {
    return {
      list: {}, //收集地址信息
      isDefault: false, //是否为默认地址
      gionList: {}, //省市区地址数据
      value: "",
      showArea: false, //是否展示省市区选择框
    };
  },
  created() {
    if (this.$route.params.id) {
      this.getAddressInfo(this.$route.params.id);
    }
    this.getregionList();
  },
  methods: {
    //根据id获取要修改的联系人
    async getAddressInfo(id) {
      let result = await getaddressInfo(id);
      // console.log(result);
      if (result.status == 200) {
        this.list = result.data;
        this.isDefault = result.data.isDefault == 1;
        this.value =
          this.list.province + "," + this.list.city + "," + this.list.district;
      }
    },
    // 获取省市区地址数据
    async getregionList() {
      const result = await getregion();
      //console.log(result);
      if (result.status == 200) {
        this.gionList = result.data;
      }
    },
    //用户点击确定省市区选择
    onConfirm(list) {
      //  console.log(list);
      this.value = list
        .filter((item) => !!item)
        .map((item) => item.name)
        .join(",");
      ///console.log(this.value);
      this.showArea = false;
    },
    // 用户点击提交
    onSubmit() {
      // 效验表单
      if (!this.list.realName) {
        this.$toast("联系人不能为空");
        return;
      }
      let reg = /^1(3|4|5|7|8)[0-9]{9}$/;
      if (!this.list.phone) {
        this.$toast("手机号不能为空");
        return;
      } else if (!reg.test(this.list.phone)) {
        this.$toast("手机号格式错误");
        return;
      }
      if (!this.value) {
        this.$toast("请选择地址");
        return;
      }
      if (!this.list.detail) {
        this.$toast("请输入详细地址");
        return;
      }
      if (!this.list.postCode) {
        this.$toast("请输入邮政编码");
        return;
      } else if (!/^[0-9]*$/.test(this.list.postCode)) {
        this.$toast("邮政编码只能是数字");
        return;
      }

      // 发送添加或者修改收货地址请求
      let ssq = this.value.split(",");
      //console.log(ssq);
      let params = {
        real_name: this.list.realName,
        phone: this.list.phone,
        detail: this.list.detail,
        post_code: this.list.postCode,
        is_default: this.isDefault,
        address: {
          city: ssq[1],
          district: ssq[2],
          province: ssq[0],
        },
      };
      if (this.$route.params.id) {
        // 存在id执行修改操作
        params.id = this.$route.params.id;
        // 调用api
        this.czaddress(params);
      } else {
        // 否则添加
        // 调用api
        this.czaddress(params);
      }
      //console.log(params);
    },
    // 添加或者修改联系人
    async czaddress(data) {
      let result = await operationaddress(data);
      //console.log(result);
      if (result.status == 200) {
        this.$toast("操作成功");
        this.$router.push("/contactList");
      }
    },
    // 删除联系人
    async Ondel() {
      let result = await deladdress(this.$route.params.id);
      //console.log(result);
      if (result.status == 200) {
        this.$toast("删除成功");
        this.$router.push("/contactList");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.warr {
  padding: 5px;
}
</style>