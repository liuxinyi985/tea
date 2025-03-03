<template>
  <div class="order-list">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="我的订单" left-arrow @click-left="goBack" />

    <!-- 订单状态切换 -->
    <!-- <van-sticky :offset-top="54">
      <van-tabs 
        v-model="activeTab" 
        sticky 
        swipeable
        color="#2c3e50"
        title-active-color="#2c3e50"
        title-inactive-color="#969799"
        @change="handleTabChange"
      >
        <van-tab v-for="tab in tabList" :key="tab.name" :name="tab.name">
          <template #title>
            <div class="custom-tab">
              <span>{{ tab.title }}</span>
              <van-badge v-if="orderCounts[tab.name]" :content="orderCounts[tab.name]" />
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </van-sticky> -->

    <!-- 订单列表 -->
    <van-pull-refresh 
      v-model="refreshing" 
      @refresh="onRefresh"
      success-text="刷新成功"
      success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多订单了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div class="order-item" v-for="order in orderList" :key="order.id">
          <div class="order-header">
            <div class="shop-info">
              <van-icon name="shop-o" size="18" />
              <span class="shop-name">茶叶商城</span>
              <van-icon name="arrow" />
            </div>
            <van-tag 
              :type="getStatusType(order.status)"
              round
            >{{ getStatusText(order.status) }}</van-tag>
          </div>

          <div class="goods-list" @click="goToDetail(order.id)">
            <div class="goods-item" v-for="(goods, index) in order.goodsList" :key="index">
              <van-image
                class="goods-img"
                :src="goods.image"
                fit="cover"
                radius="8"
                lazy-load
              >
                <template #loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
              <div class="goods-info">
                <div class="goods-name text-ellipsis">{{ goods.name }}</div>
                <div class="goods-spec">{{ goods.spec }}</div>
                <div class="goods-price">
                  <span class="price">¥{{ goods.price.toFixed(2) }}</span>
                  <span class="quantity">x{{ goods.quantity }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="order-info">
            <div class="order-no">
              订单号：{{ order.orderNo }}
              <van-icon name="copy" @click="copyOrderNo(order.orderNo)" />
            </div>
            <div class="order-time">{{ order.createTime }}</div>
          </div>

          <div class="order-footer">
            <div class="total-info">
              <span class="total-quantity">共{{ getTotalQuantity(order.goodsList) }}件商品</span>
              <div class="total-amount">
                <span>合计：</span>
                <span class="price">¥{{ order.totalAmount.toFixed(2) }}</span>
              </div>
            </div>
            <div class="order-actions">
              <template v-if="order.status === 0">
                <van-button 
                  size="small" 
                  type="danger" 
                  round
                  @click="handlePay(order)"
                >立即付款</van-button>
                <van-button 
                  size="small" 
                  plain 
                  round
                  @click="handleCancel(order)"
                >取消订单</van-button>
              </template>
              <template v-if="order.status === 2">
                <van-button 
                  size="small" 
                  type="primary" 
                  round
                  @click="handleConfirm(order)"
                >确认收货</van-button>
                <van-button 
                  size="small" 
                  plain 
                  round
                  @click="checkExpress(order)"
                >查看物流</van-button>
              </template>
              <template v-if="order.status === 3">
                <van-button 
                  size="small" 
                  type="primary" 
                  plain 
                  round
                  @click="handleBuyAgain(order)"
                >再次购买</van-button>
                <van-button 
                  size="small" 
                  round
                  @click="handleDelete(order)"
                >删除订单</van-button>
              </template>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>

    <!-- 物流弹窗 -->
    <van-popup 
      v-model="expressVisible" 
      position="bottom" 
      round 
      closeable
      close-icon="close"
      :style="{ height: '70%' }"
    >
      <div class="express-popup">
        <div class="popup-title">物流追踪</div>
        <div class="express-info">
          <div class="express-company">
            <van-icon name="logistics" size="20" />
            <span>{{ currentExpress.company }}</span>
          </div>
          <div class="express-no">
            运单号：{{ currentExpress.no }}
            <van-button size="mini" type="primary" plain round @click="copyExpressNo">
              复制单号
            </van-button>
          </div>
        </div>
        <div class="express-content">
          <van-steps direction="vertical" :active="0">
            <van-step 
              v-for="(item, index) in expressInfo" 
              :key="index"
            >
              <h4>{{ item.content }}</h4>
              <p>{{ item.time }}</p>
            </van-step>
          </van-steps>
        </div>
      </div>
    </van-popup>

    <!-- 筛选弹窗 -->
    <van-popup 
      v-model="filterVisible" 
      position="right"
      :style="{ width: '80%', height: '100%' }"
    >
      <!-- 添加筛选内容 -->
    </van-popup>
  </div>
</template>

<script>
// script 部分基本保持不变，添加一些新的数据和方法
export default {
  data() {
    return {
      // ... 原有的数据
       activeTab: 'all',
      loading: false,
      finished: false,
      refreshing: false,
      orderCounts: {
        all: 0,
        unpaid: 2,
        unshipped: 1,
        shipped: 3,
        completed: 5
      },
      orderList: [],
      page: 1,
      expressVisible: false,
      expressInfo: [],
      searchValue: '',
      filterVisible: false,
      error: false,
      tabList: [
        { name: 'all', title: '全部' },
        { name: 'unpaid', title: '待付款' },
        { name: 'unshipped', title: '待发货' },
        { name: 'shipped', title: '待收货' },
        { name: 'completed', title: '已完成' }
      ],
      currentExpress: {
        company: '顺丰速运',
        no: 'SF1234567890'
      }
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    // 获取状态类型
    getStatusType(status) {
      const map = {
        0: 'warning',
        1: 'primary',
        2: 'success',
        3: 'default',
        4: 'danger'
      }
      return map[status]
    },
    
    // 获取状态文本
    getStatusText(status) {
      const map = {
        0: '待付款',
        1: '待发货',
        2: '已收货',
        3: '已完成',
        4: '已取消'
      }
      return map[status]
    },

    // 计算商品总数
    getTotalQuantity(goodsList) {
      return goodsList.reduce((total, goods) => total + goods.quantity, 0)
    },

    // 加载数据
    async onLoad() {
      try {
        // 模拟接口请求
        setTimeout(() => {
          const newOrders = this.getMockOrders()
          if (this.refreshing) {
            this.orderList = newOrders
            this.refreshing = false
          } else {
            this.orderList = [...this.orderList, ...newOrders]
          }
          this.loading = false
          this.page++
          if (this.page > 3) {
            this.finished = true
          }
        }, 1000)
      } catch (error) {
        this.loading = false
        Toast.fail('加载失败')
      }
    },

    // 下拉刷新
    onRefresh() {
      this.finished = false
      this.loading = true
      this.page = 1
      this.onLoad()
    },

    // 切换标签
    handleTabChange(name) {
      this.finished = false
      this.page = 1
      this.orderList = []
      this.onLoad()
    },

    // 跳转详情
    goToDetail(orderId) {
      this.$router.push(`/order/detail/${orderId}`)
    },

    // 支付订单
    handlePay(order) {
      // 处理支付逻辑
    },

    // 取消订单
    handleCancel(order) {
      // 处理取消逻辑
    },

    // 确认收货
    handleConfirm(order) {
      // 处理确认收货逻辑
    },

    // 查看物流
    checkExpress(order) {
      this.expressVisible = true
      // 获取物流信息
    },

    // 再次购买
    handleBuyAgain(order) {
      // 处理再次购买逻辑
    },

    // 删除订单
    handleDelete(order) {
      // 处理删除逻辑
    },

    // 模拟订单数据
    getMockOrders() {
      return [
        {
          id: 1,
          orderNo: 'DD20240101001',
          status: 2,
          createTime: '2024-01-01 10:00:00',
          goodsList: [
            {
              image: 'https://example.com/tea1.jpg',
              name: '特级铁观音',
              spec: '250g/盒',
              price: 168.00,
              quantity: 2
            }
          ],
          totalAmount: 336.00
        },
        // 更多订单数据...
      ]
    },
    copyOrderNo(orderNo) {
      // 实现复制订单号
    },
    copyExpressNo() {
      // 实现复制快递单号
    },
    showFilter() {
      this.filterVisible = true
    },
    onSearch() {
      // 实现搜索功能
    }
  }
}
</script>

<style lang="scss" scoped>
.order-list {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 50px;

  .search-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }

 

  .order-item {
    margin: 12px;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);

    .order-header {
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;

      .shop-info {
        display: flex;
        align-items: center;
        gap: 4px;
        
        .shop-name {
          font-size: 14px;
          font-weight: 500;
          margin: 0 4px;
        }
      }
    }

    .goods-list {
      padding: 16px;

      .goods-item {
        display: flex;
        padding: 8px 0;

        .goods-img {
          width: 90px;
          height: 90px;
          margin-right: 12px;
          border-radius: 8px;
          overflow: hidden;
        }

        .goods-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .goods-name {
            font-size: 14px;
            color: #323233;
            line-height: 1.4;
          }

          .goods-spec {
            font-size: 12px;
            color: #969799;
            margin: 4px 0;
          }

          .goods-price {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .price {
              color: #ee0a24;
              font-size: 16px;
              font-weight: 500;
            }

            .quantity {
              color: #969799;
              font-size: 12px;
            }
          }
        }
      }
    }

    .order-info {
      padding: 0 16px;
      font-size: 12px;
      color: #969799;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .order-no {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }

    .order-footer {
      padding: 12px 16px;
      border-top: 1px solid #f5f5f5;
      margin-top: 12px;

      .total-info {
        text-align: right;
        margin-bottom: 12px;

        .total-quantity {
          font-size: 12px;
          color: #969799;
          margin-right: 8px;
        }

        .total-amount {
          font-size: 14px;
          
          .price {
            color: #ee0a24;
            font-size: 16px;
            font-weight: 500;
          }
        }
      }

      .order-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
    }
  }

  .express-popup {
    .popup-title {
      text-align: center;
      font-size: 16px;
      font-weight: 500;
      padding: 16px;
      border-bottom: 1px solid #f5f5f5;
    }

    .express-info {
      padding: 16px;
      background: #f7f8fa;

      .express-company {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 15px;
        margin-bottom: 8px;
      }

      .express-no {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #969799;
        font-size: 13px;
      }
    }

    .express-content {
      padding: 16px;
      height: calc(100% - 140px);
      overflow-y: auto;
    }
  }
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>