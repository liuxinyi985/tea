<template>
  <div class="order-detail">
    <!-- 订单状态 -->
    <div class="status-card">
      <div class="status-info">
        <div class="status-text">{{ getStatusText(orderInfo.status) }}</div>
        <div class="status-desc">{{ getStatusDesc(orderInfo.status) }}</div>
      </div>
      <van-steps :active="getStatusStep(orderInfo.status)" active-color="#07c160">
        <van-step>提交订单</van-step>
        <van-step>付款成功</van-step>
        <van-step>商家发货</van-step>
        <van-step>交易完成</van-step>
      </van-steps>
    </div>

    <!-- 收货地址 -->
    <div class="address-card">
      <van-cell-group>
        <van-cell title="收货地址" :border="false">
          <template #value>
            <div class="address-info">
              <div class="user-info">
                <span>{{ orderInfo.receiverName }}</span>
                <span>{{ orderInfo.receiverPhone }}</span>
              </div>
              <div class="address-text">{{ orderInfo.receiverAddress }}</div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 物流信息 -->
    <div class="express-card" v-if="orderInfo.status >= 2">
      <van-cell-group>
        <van-cell 
          title="物流信息" 
          :value="orderInfo.expressCompany"
          is-link 
          @click="showExpress"
        >
          <template #label>
            <span>运单号：{{ orderInfo.expressNo }}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 商品信息 -->
    <div class="goods-card">
      <van-card
        v-for="(item, index) in orderInfo.goodsList"
        :key="index"
        :price="item.price.toFixed(2)"
        :title="item.name"
        :desc="item.spec"
        :thumb="item.image"
        :num="item.quantity"
      />
    </div>

    <!-- 订单信息 -->
    <div class="order-info">
      <van-cell-group>
        <van-cell title="订单编号">
          <template #value>
            <span>{{ orderInfo.orderNo }}</span>
            <van-button size="mini" type="default" @click="copyOrderNo">复制</van-button>
          </template>
        </van-cell>
        <van-cell title="下单时间" :value="orderInfo.createTime" />
        <van-cell title="支付方式" :value="orderInfo.paymentMethod" />
      </van-cell-group>
    </div>

    <!-- 金额明细 -->
    <div class="amount-card">
      <van-cell-group>
        <van-cell title="商品总额">
          <template #value>
            <span class="price">¥{{ orderInfo.goodsAmount.toFixed(2) }}</span>
          </template>
        </van-cell>
        <van-cell title="运费">
          <template #value>
            <span class="price">¥{{ orderInfo.freightAmount.toFixed(2) }}</span>
          </template>
        </van-cell>
        <van-cell title="优惠金额" v-if="orderInfo.discountAmount > 0">
          <template #value>
            <span class="discount">-¥{{ orderInfo.discountAmount.toFixed(2) }}</span>
          </template>
        </van-cell>
        <van-cell title="实付金额" class="total-amount">
          <template #value>
            <span class="total-price">¥{{ orderInfo.totalAmount.toFixed(2) }}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-bar">
      <van-button 
        v-if="orderInfo.status === 0" 
        type="danger" 
        block 
        @click="handlePay"
      >立即付款</van-button>
      <template v-if="orderInfo.status === 2">
        <van-button plain type="default" @click="checkExpress">查看物流</van-button>
        <van-button type="primary" @click="handleConfirm">确认收货</van-button>
      </template>
      <template v-if="orderInfo.status === 3">
        <van-button plain type="default" @click="handleBuyAgain">再次购买</van-button>
        <van-button type="danger" @click="handleDelete">删除订单</van-button>
      </template>
    </div>

    <!-- 物流弹出层 -->
    <van-popup v-model="expressVisible" position="bottom" round>
      <div class="express-popup">
        <div class="popup-title">
          <span>物流追踪</span>
          <van-icon name="cross" @click="expressVisible = false" />
        </div>
        <div class="express-timeline">
          <van-steps direction="vertical" :active="0">
            <van-step 
              v-for="(item, index) in expressInfo" 
              :key="index"
              :title="item.content"
              :desc="item.time"
            />
          </van-steps>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  name: 'OrderDetail',
  data() {
    return {
      orderInfo: {
        orderNo: 'DD20240101001',
        status: 2,
        createTime: '2024-01-01 10:00:00',
        paymentMethod: '微信支付',
        receiverName: '张三',
        receiverPhone: '13800138000',
        receiverAddress: '北京市朝阳区xx街道xx号',
        expressCompany: '顺丰速运',
        expressNo: 'SF1234567890',
        goodsList: [
          {
            image: 'https://example.com/tea1.jpg',
            name: '特级铁观音',
            spec: '250g/盒',
            price: 168.00,
            quantity: 2
          },
          {
            image: 'https://example.com/tea2.jpg',
            name: '大红袍',
            spec: '100g/盒',
            price: 128.00,
            quantity: 1
          }
        ],
        goodsAmount: 464.00,
        freightAmount: 0.00,
        discountAmount: 50.00,
        totalAmount: 414.00
      },
      expressVisible: false,
      expressInfo: [
        {
          time: '2024-01-01 14:00:00',
          content: '【北京市】包裹已由【北京朝阳区分拣中心】发出'
        },
        {
          time: '2024-01-01 13:50:00',
          content: '【北京市】包裹已到达【北京朝阳区分拣中心】'
        }
      ]
    }
  },
  methods: {
    getStatusText(status) {
      const map = {
        0: '待付款',
        1: '待发货',
        2: '待收货',
        3: '已完成',
        4: '已取消'
      }
      return map[status]
    },
    getStatusDesc(status) {
      const map = {
        0: '请尽快完成支付',
        1: '商家正在处理订单',
        2: '商品已发出，请注意查收',
        3: '交易已完成',
        4: '订单已取消'
      }
      return map[status]
    },
    getStatusStep(status) {
      return Math.min(status + 1, 4)
    },
    showExpress() {
      this.expressVisible = true
    },
    copyOrderNo() {
      this.$copyText(this.orderInfo.orderNo).then(() => {
        Toast('复制成功')
      })
    },
    handlePay() {
      // 处理支付逻辑
    },
    handleConfirm() {
      // 处理确认收货逻辑
    },
    handleBuyAgain() {
      // 处理再次购买逻辑
    },
    handleDelete() {
      // 处理删除订单逻辑
    },
    checkExpress() {
      this.expressVisible = true
    }
  },
  created() {
    const orderId = this.$route.params.id
    // 获取订单详情
    // this.getOrderDetail(orderId)
  }
}
</script>

<style lang="scss" scoped>
.order-detail {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 50px;

  .status-card {
    background: #fff;
    padding: 20px 16px;
    margin-bottom: 12px;

    .status-info {
      margin-bottom: 20px;
      
      .status-text {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 8px;
      }

      .status-desc {
        color: #969799;
        font-size: 14px;
      }
    }
  }

  .address-card,
  .express-card,
  .goods-card,
  .order-info,
  .amount-card {
    margin-bottom: 12px;
    background: #fff;

    .address-info {
      text-align: right;

      .user-info {
        margin-bottom: 4px;

        span {
          margin-left: 12px;
        }
      }

      .address-text {
        color: #323233;
        font-size: 14px;
      }
    }
  }

  .goods-card {
    padding: 12px 0;

    .van-card {
      background: #fff;
      margin-bottom: 0;
      border-bottom: 1px solid #f7f8fa;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .amount-card {
    .price {
      color: #323233;
    }

    .discount {
      color: #ee0a24;
    }

    .total-amount {
      .total-price {
        color: #ee0a24;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }

  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px 16px;
    background: #fff;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);

    .van-button {
      min-width: 100px;
    }
  }

  .express-popup {
    max-height: 80vh;
    overflow-y: auto;

    .popup-title {
      padding: 16px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      position: relative;
      border-bottom: 1px solid #f7f8fa;

      .van-icon {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .express-timeline {
      padding: 20px 16px;
    }
  }
}
</style>