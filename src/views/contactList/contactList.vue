<template>
  <div class="warr">
    <div class="addressbox">
      <van-radio-group v-model="radio">
        <van-cell v-for="(item, index) in addressList" :key="index">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title" style="margin-right: 5px">{{
              item.realName
            }}</span>
            <span style="margin-right: 5px">{{ item.phone }}</span>
            <van-tag type="danger" v-if="item.isDefault == 1">默认</van-tag>
          </template>
          <template #icon>
            <van-radio
              style="margin-right: 5px"
              :name="item.id"
              disabled
              checked-color="#ee0a24"
            ></van-radio>
          </template>
          <template #right-icon>
            <van-icon
              name="edit"
              size="20"
              style="margin-top: 15px"
              @click="newContact(item.id)"
            />
          </template>
          <template #label>
            <span>{{
              item.province + item.city + item.district + item.detail
            }}</span>
          </template>
        </van-cell>
      </van-radio-group>
    </div>
    <div class="btn">
      <van-button round type="danger" style="width: 100%" to="/newContact"
        >新增联系人</van-button
      >
    </div>
  </div>
</template>

<script>
import { getaddressList } from "@/api/address.js";
export default {
  name: "contactList",
  data() {
    return {
      addressList: [], //收货地址
      radio: 0, //默认选中地址的小标
    };
  },
  created() {
    this.getaddress();
  },
  methods: {
    // 获取用户收货地址
    async getaddress() {
      let result = await getaddressList();
      //console.log(result);
      if (result.status == 200) {
        this.addressList = result.data;
        // 获取默认地址的id
        let a =
          this.addressList.find((item) => {
            if (item.isDefault == 1) {
              return true;
            }
          }) || {};

        // 如果存在默认收货地址那么保存他的id
        if (a.id) {
          this.radio = a.id;
        }
      }
    },
    // 跳转操作地址信息
    newContact(id) {
      this.$router.push({
        name: "newContact",
        params: {
          id: id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.warr {
  padding: 5px;
  background-color: #f8f8f8;
  .addressbox {
    margin-top: 10px;
    .van-cell {
      padding: 10px 10px;
    }
  }
  .btn {
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    left: 0px;
    bottom: 0px;
    padding: 10px;
    border-top: 1px solid red;
    background-color: white;
  }
}
</style>