<template>
  <div class="order-page">
    <!-- 顶部导航 -->
    <div class="nav-bar">
      <van-nav-bar title="提交订单" left-arrow @click-left="onClickLeft" />
    </div>

    <!-- 收货信息 -->
    <div class="address-info" @click="goToAddress">
      <h3>收货信息</h3>
      <div v-if="defaultAddress" class="address-detail">
        <p>{{ defaultAddress.name }} {{ defaultAddress.tel }}</p>
        <p>
          {{ defaultAddress.province }} {{ defaultAddress.city }}
          {{ defaultAddress.county }} {{ defaultAddress.addressDetail }}
        </p>
      </div>
      <div v-else class="address-empty">
        <van-icon name="add" />
        <span>添加收货地址</span>
      </div>
      <van-icon name="arrow" class="arrow-icon" />
    </div>

    <!-- 支付方式 -->
    <div class="payment-method">
      <h3>支付方式:</h3>
      <van-radio-group v-model="paymentType">
        <van-radio name="weixin">微信支付</van-radio>
        <van-radio name="alipay">支付宝支付</van-radio>
      </van-radio-group>
    </div>

    <!-- 商品列表 -->
    <div class="product-list">
      <div class="product-item" v-for="item in orderGoods" :key="item.id">
        <div class="product-info">
          <img :src="'http://' + item.goods_url" :alt="item.goods_name" />
          <div class="product-detail">
            <p class="product-name">{{ item.goods_name }}</p>
            <p class="product-price">¥{{ item.goods_price }}</p>
            <p class="product-quantity">x{{ item.goods_num }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 订单总结 -->
    <div class="order-summary">
      <p>
        共 {{ totalNum }} 件，总金额：<span class="total-price"
          >¥{{ totalPrice }}</span
        >
      </p>
    </div>

    <!-- 底部提交按钮 -->
    <div class="submit-bar">
      <van-submit-bar
        :price="totalPrice * 100"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script>
import { selectAddress, addOrder,updateOrderStatus } from '@/api/home';
import { Dialog, Toast } from 'vant';
export default {
  name: 'OrderConfirm',
  data() {
    return {
      paymentType: 'weixin',
      orderGoods: [],
      totalPrice: 0,
      defaultAddress: null,
      order_uuid:null
    };
  },
  computed: {
    totalNum() {
      return this.orderGoods.reduce((total, item) => total + item.goods_num, 0);
    },
  },
  watch: {
    // 监听路由参数变化，重新获取地址信息
    '$route.query.addressId': {
      handler(newId) {
        if (newId) {
          this.getAddressById(newId);
        }
      },
      immediate: true,
    },
  },
  created() {
    const goods = this.$route.query.goods;
    if (goods) {
      this.orderGoods = JSON.parse(goods);
      this.totalPrice = Number(this.$route.query.totalPrice);
    }
    console.log(this.orderGoods, 'goods');
    console.log(111);

    // 获取默认地址
    this.getDefaultAddress();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onSubmit() {
      console.log(123);

      if (!this.defaultAddress) {
        this.$toast('请选择收货地址');
        return;
      }
      addOrder({
        address_uuid: this.defaultAddress.id,
        cart_uuid: this.orderGoods.map((item) => item.uuid),
      })
        .then((res) => {
          console.log(res, 'res');
          this.order_uuid = res.data.id;

        })
        .catch((err) => {});
      Dialog.confirm({
        title: '订单提交',
        message: '您确认要提交订单吗？提交后无法修改，请确认地址和商品信息无误',
      })
        .then(() => {
          updateOrderStatus({ order_uuid: this.order_uuid, status: 1 }).then((res) => {});
          Toast('订单提交成功');
          // 确认回调
        })
        .catch(() => {
          // 取消回调
        });
      // 处理订单提交逻辑
    },
    async getDefaultAddress() {
      const res = await selectAddress();
      console.log(res, 'res');
      const addresses = res.data.list;
      // 找到默认地址
      const defaultAddr = addresses.find((addr) => addr.isDefault === '1');
      this.defaultAddress = defaultAddr || null;
      console.log(this.defaultAddress, 'defaultAddr');
    },
    async getAddressById(id) {
      try {
        const res = await selectAddress();
        if (res.data.data.code === 200) {
          const addresses = res.data.data.data;
          // 找到选中的地址
          const selectedAddr = addresses.find((addr) => addr.id === Number(id));
          if (selectedAddr) {
            this.defaultAddress = selectedAddr;
          }
        }
      } catch (error) {
        console.error('获取地址失败:', error);
      }
    },
    goToAddress() {
      this.$router.push({
        path: '/address',
        query: {
          from: 'order', // 标记来源为订单页
        },
      });
    },
  },
};
</script>

<style scoped>
.order-page {
  background-color: #f7f7f7;
  min-height: 100vh;
  padding-bottom: 50px;
}

.nav-bar {
  position: sticky;
  top: 0;
  z-index: 999;
}

.address-info {
  background: white;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
}

.address-empty {
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
}

.arrow-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.address-info h3 {
  color: #333;
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 600;
}

.address-detail p {
  color: #666;
  line-height: 1.6;
  margin: 5px 0;
  padding-right: 20px;
}

.payment-method {
  background: white;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.payment-method h3 {
  color: #333;
  font-size: 16px;
  margin-bottom: 15px;
  font-weight: 600;
}

.van-radio {
  margin: 10px 0;
}

.product-list {
  background: white;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.product-item {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f5f5f5;
}

.product-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.product-info {
  display: flex;
  align-items: center;
}

.product-info img {
  width: 90px;
  height: 90px;
  margin-right: 15px;
  border-radius: 4px;
  object-fit: cover;
}

.product-detail {
  flex: 1;
  position: relative;
}

.product-name {
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.product-price {
  color: #ee0a24;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}

.product-quantity {
  color: #999;
  font-size: 14px;
  position: absolute;
  right: 0;
  bottom: 0;
}

.order-summary {
  background: white;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.order-summary p {
  font-size: 15px;
  color: #666;
}

.total-price {
  color: #ee0a24;
  font-size: 20px;
  font-weight: bold;
  margin-left: 5px;
}

.submit-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

:deep(.van-submit-bar) {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

:deep(.van-submit-bar__button) {
  background: linear-gradient(to right, #ff6034, #ee0a24);
}

:deep(.van-radio__label) {
  color: #666;
}

:deep(.van-radio__icon--checked .van-icon) {
  background-color: #ee0a24;
  border-color: #ee0a24;
}
</style>
