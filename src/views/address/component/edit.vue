<template>
  <div>
    <van-nav-bar
      title="编辑地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      :address-info="addressInfo"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import { addAddress, updateAddress } from '@/api/home';
import axios from 'axios';

export default {
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo: {
        name: '',
        tel: '',
        province: '',
        city: '',
        county: '',
        addressDetail: '',
        areaCode: '',
        isDefault: false,
        postalCode: '',
      },
    };
  },
  created() {
    // 如果是编辑模式，获取地址详情
    const id = this.$route.query.id;
    if (id) {
      this.getAddressDetail(id);
    }
  },
  methods: {
    async getAddressDetail(id) {
      try {
        const res = await axios.post('/api/getAddressById', { id });
        if (res.data.data.code === 200) {
          const address = res.data.data.data;
          this.addressInfo = {
            id: address.id,
            name: address.name,
            tel: address.tel,
            province: address.province,
            city: address.city,
            county: address.county,
            addressDetail: address.addressDetail,
            areaCode: address.areaCode,
            isDefault: address.isDefault === '1',
            postalCode: address.postalCode || '',
          };
        }
      } catch (error) {
        Toast('获取地址信息失败');
      }
    },
    onClickLeft() {
      this.$router.push('/address');
    },
    async onSave(content) {
      try {
        content.isDefault = content.isDefault ? 1 : 0;
        const id = this.$route.query.id;

        if (id) {
          // 编辑地址
          content.id = id;
          const res = await updateAddress(content);
          if (res.data.code === 200) {
            Toast.success('修改成功');
            this.$router.push('/address');
          }
        } else {
          // 新增地址
          const res = await addAddress(content);
          if (res.data.code === 200) {
            Toast.success('添加成功');
            this.$router.push('/address');
          }
        }
      } catch (error) {
        Toast.fail('操作失败');
      }
    },
    async onDelete() {
      try {
        const id = this.$route.query.id;
        if (!id) return;

        const res = await axios.post('/api/deleteAddress', { id });
        if (res.data.data.code === 200) {
          Toast.success('删除成功');
          this.$router.push('/address');
        }
      } catch (error) {
        Toast.fail('删除失败');
      }
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style scoped>
.van-address-edit {
  padding: 10px 0;
}
</style>
