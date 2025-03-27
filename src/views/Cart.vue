<template>
  <div class="cart">
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-checkbox-group style="margin: 15px 0 45px 0" v-model="result">
      <van-checkbox
        style="margin: 5px 0"
        :name="index"
        v-for="(item, index) in cartList"
        :key="item"
        class="cart_item"
        label-disabled
      >
        <van-icon @click="delGoods(item.uuid)" class="del_icon" name="delete-o" />
        <van-card
          :price="item.goods_price"
          :desc="item.goods_description"
          :title="item.goods_name"
          :thumb="'http://' +item.goods_url"
          width="100%"
        >
          <template #footer>
            <van-stepper @change="onChange(item)" v-model="item.goods_num" />
          </template> </van-card
      ></van-checkbox>
    </van-checkbox-group>
    <van-empty description="购物车已清空" v-if="cartList.length === 0" />
    <van-submit-bar
      :price="totalPrice * 100"
      button-text="去结算"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked" @click="checkedAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import Tabbar from '../components/common/Tabbar.vue';
import { getGoodsCart, deleteGoodsCart, updateGoodsCart } from '@/api/home';
import { Dialog } from 'vant';
import { Toast } from 'vant';
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
      cartList: [],
      totalPrice: 0,
    };
  },
  created() {
    this.getGoodsCart();
  },
  methods: {
    delGoods(id) {
      console.log(id, 'res');
      Dialog.confirm({
        message: '您确定要删除该商品吗？',
      })
        .then(() => {
          deleteGoodsCart({ uuid: id })
            .then((res) => {
              this.getGoodsCart();
              Toast.success('删除成功');
            })
            .catch(() => {});
        })
        .catch(() => {
          // on cancel
        });
    },

    onChange(item) {
      this.computedTotalPrice();
      updateGoodsCart({ id: item.id, num: item.goods_num }).then((res) => {
        console.log(res);
      });
    },
    onClickLeft() {
      this.$router.push('/home');
    },
    onClickRight() {},
    onSubmit() {
      const selectedGoods = this.result.map((index) => this.cartList[index]);
      this.$router.push({
        path: '/order',
        query: {
          goods: JSON.stringify(selectedGoods),
          totalPrice: this.totalPrice,
        },
      });
    },
    async getGoodsCart() {
      await getGoodsCart()
        .then((res) => {
          this.cartList = res.data.list;
          console.log(res);
        })
        .catch(() => {});
    },
    checkedAll() {
      if (this.checked) {
        this.result = Array.from(
          { length: this.cartList.length },
          (_, index) => index
        );
      } else {
        this.result = [];
      }
    },
    computedTotalPrice() {
      this.totalPrice = 0;
      for (let i = 0; i < this.result.length; i++) {
        const index = this.result[i];
        this.totalPrice +=
          this.cartList[index].goods_price * this.cartList[index].goods_num;
      }
    },
  },
  watch: {
    result: {
      handler(newVal) {
        if (newVal.length === this.cartList.length) {
          this.checked = true;
          this.computedTotalPrice();
        } else {
          this.checked = false;
          this.computedTotalPrice();
        }
      },
    },
  },
};
</script>
<style lang="less">
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

.cart_item {
  position: relative;
  .del_icon {
    position: absolute;
    top: 20%;
    right: 10px;
    transform: translateY(-50%);
    z-index: 999;
  }
}
</style>
