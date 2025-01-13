<template>
  <div class="cart">
    <van-nav-bar
      title="购物车"
      left-text="返回"
      right-text="编辑"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-checkbox-group style="margin: 15px 0 45px 0" v-model="result">
      <van-checkbox
      style="margin: 5px 0;"
        :name="index"
        v-for="(item, index) in 6"
        :key="item"
        label-disabled
        ><van-card
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
          width="100%"
        >
          <template #footer>
            <van-stepper v-model="shopNum" />
          </template> </van-card
      ></van-checkbox>
    </van-checkbox-group>

    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="checkedAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import Tabbar from '../components/common/Tabbar.vue';
export default {
  name: 'Cart',
  components: {
    Tabbar,
  },
  data() {
    return {
      result: [],
      shopNum: 1,
      checked: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {},
    onSubmit() {},
    checkedAll() {
      
      if (this.checked) {
        this.result = Array.from({ length: 6 }, (_, index) => index);
      } else {
        this.result = [];
      }
    },
  },
  watch: {
    result: {
      handler(newVal) {
        if (newVal.length === 6) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      immediate: true,
    },
  }
};
</script>
<style>

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.van-checkbox__label {
  width: 100%;
}
</style>
