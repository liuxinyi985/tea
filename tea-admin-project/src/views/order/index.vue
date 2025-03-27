<template>
  <div class="order-container">
    <!-- 搜索栏 -->
    <div class="search-section">
      <el-card shadow="never">
        <el-form :inline="true" :model="searchForm" class="search-form">
          <el-form-item label="订单编号">
            <el-input
              v-model="searchForm.orderNo"
              placeholder="请输入订单编号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select
              v-model="searchForm.status"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in orderStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="下单时间">
            <el-date-picker
              v-model="searchForm.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- 订单列表 -->
    <el-card class="order-list" shadow="never">
      <div slot="header" class="card-header">
        <span>订单列表</span>
        <div class="header-operations">
          <el-button type="primary" size="small" @click="exportOrders"
            >导出订单</el-button
          >
          <el-button type="success" size="small" @click="batchShip"
            >批量发货</el-button
          >
        </div>
      </div>

      <el-table
        v-loading="loading"
        :data="orderList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="订单信息" min-width="300">
          <template slot-scope="{ row }">
            <div class="order-info">
              <div class="order-no">订单编号：{{ row.orderNo }}</div>
              <div class="order-time">下单时间：{{ row.createTime }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品信息" min-width="400">
          <template slot-scope="{ row }">
            <div class="goods-list">
              <div
                v-for="(goods, index) in row.goodsList"
                :key="index"
                class="goods-item"
              >
                <el-image
                  :src="'http://' + goods.image"
                  :preview-src-list="[goods.image]"
                  class="goods-image"
                >
                </el-image>
                <div class="goods-info">
                  <div class="goods-name">{{ goods.name }}</div>
                  <div class="goods-spec">规格：{{ goods.spec }}</div>
                  <div class="goods-price">
                    <span>￥{{ goods.price }}</span>
                    <span class="goods-quantity">x{{ goods.quantity }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="收货人信息" min-width="200">
          <template slot-scope="{ row }">
            <div class="receiver-info">
              <div>{{ row.receiverName }} {{ row.receiverPhone }}</div>
              <div class="address">{{ row.receiverAddress }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="订单金额" width="150" align="center">
          <template slot-scope="{ row }">
            <div class="amount-info">
              <div class="total-amount">￥{{ row.totalAmount }}</div>
              <div class="payment-method">{{ row.paymentMethod }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" width="120" align="center">
          <template slot-scope="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="{ row }">
            <el-button type="text" size="small" @click="handleDetail(row)">
              查看详情
            </el-button>
            <el-button
              v-if="row.status === 1"
              type="text"
              size="small"
              @click="handleShip(row)"
            >
              发货
            </el-button>
            <el-button
              v-if="row.status === 0"
              type="text"
              size="small"
              @click="handleCancel(row)"
            >
              取消订单
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.current"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </div>
    </el-card>

    <!-- 发货弹窗 -->
    <el-dialog title="订单发货" :visible.sync="shipDialogVisible" width="500px">
      <el-form
        :model="shipForm"
        :rules="shipRules"
        ref="shipForm"
        label-width="100px"
      >
        <el-form-item label="物流公司" prop="company">
          <el-select v-model="shipForm.company" placeholder="请选择物流公司">
            <el-option
              v-for="item in logisticsCompanies"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物流单号" prop="trackingNo">
          <el-input
            v-model="shipForm.trackingNo"
            placeholder="请输入物流单号"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shipDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmShip">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderList, updateOrderStatus, shipOrder } from '@/api/goods';
export default {
  name: 'OrderManagement',
  data() {
    return {
      loading: false,
      searchForm: {
        orderNo: '',
        status: '',
        dateRange: [],
      },
      orderStatus: [
        { label: '待付款', value: 0 },
        { label: '待发货', value: 1 },
        { label: '已发货', value: 2 },
        { label: '已完成', value: 3 },
        { label: '已取消', value: 4 },
      ],
      orderList: [
        {
          orderNo: '1234567890',
          createTime: '2024-01-01 12:00:00',
          goodsList: [
            {
              image: 'https://img.yzcdn.cn/vant/ipad.png',
              name: '商品名称',
              spec: '规格',
              price: 100,
              quantity: 1,
            },
          ],
          receiverName: '张三',
          receiverPhone: '12345678901',
          receiverAddress: '北京市海淀区',
          totalAmount: 100,
          paymentMethod: '微信支付',
          status: 0,
        },
      ],
      selectedOrders: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
      },
      shipDialogVisible: false,
      shipForm: {
        company: '',
        trackingNo: '',
      },
      shipRules: {
        company: [
          { required: true, message: '请选择物流公司', trigger: 'change' },
        ],
        trackingNo: [
          { required: true, message: '请输入物流单号', trigger: 'blur' },
        ],
      },
      logisticsCompanies: [
        { label: '顺丰速运', value: 'SF' },
        { label: '中通快递', value: 'ZTO' },
        { label: '圆通速递', value: 'YTO' },
      ],
    };
  },
  methods: {
    // 查询订单列表
    async fetchOrders() {
      this.loading = true;
      try {
        // 调用API获取订单列表
        const res = await getOrderList({
          page: this.page.current,
          page_size: this.page.size,
          status: this.searchForm.status||-1,
          orderNo:this.searchForm.orderNo,
        });
        this.orderList = res.data.list;
        this.page.total = res.data.total;
      } catch (error) {
        this.$message.error('获取订单列表失败');
      }
      this.loading = false;
    },

    // 搜索
    handleSearch() {
      this.page.current = 1;
      
      this.fetchOrders();
    },

    // 重置搜索
    resetSearch() {
      this.searchForm = {
        orderNo: '',
        status: '',
        dateRange: [],
      };
      this.handleSearch();
    },

    // 获取状态样式
    getStatusType(status) {
      const map = {
        0: 'warning',
        1: 'primary',
        2: 'success',
        3: 'info',
        4: 'danger',
      };
      return map[status];
    },

    // 获取状态文本
    getStatusText(status) {
      const map = {
        0: '待付款',
        1: '待发货',
        2: '已发货',
        3: '已完成',
        4: '已取消',
      };
      return map[status];
    },

    // 处理发货
    handleShip(row) {
      this.currentOrder = row;
      console.log(this.currentOrder, 'currentOrder');
      this.shipDialogVisible = true;
    },

    // 确认发货
    async confirmShip() {
      this.$refs.shipForm.validate(async (valid) => {
        if (valid) {
          try {
            await updateOrderStatus({
              order_uuid: this.currentOrder.id,
              status: 2,
            });
            this.$message.success('发货成功');
            this.shipDialogVisible = false;
            this.fetchOrders();
          } catch (error) {
            this.$message.error('发货失败');
          }
        }
      });
    },
    //取消订单
    handleCancel(row) {
      this.$confirm('确定要取消该订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          try {
            await updateOrderStatus({
              order_uuid: row.id,
              status: 4, // 已取消
            });
            this.$message.success('订单取消成功');
            this.fetchOrders();
          } catch (error) {
            this.$message.error('订单取消失败');
          }
        })
        .catch(() => {
          this.$message.info('已取消操作');
        });
    },
    // 分页相关方法
    handleSizeChange(val) {
      this.page.size = val;
      this.fetchOrders();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.fetchOrders();
    },

    // 表格选择
    handleSelectionChange(val) {
      this.selectedOrders = val;
    },
  },
  created() {
    this.fetchOrders();
  },
};
</script>

<style lang="scss" scoped>
.order-container {
  padding: 20px;

  .search-section {
    margin-bottom: 20px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .order-list {
    .goods-list {
      .goods-item {
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid #f0f0f0;

        &:last-child {
          border-bottom: none;
        }

        .goods-image {
          width: 60px;
          height: 60px;
          margin-right: 10px;
        }

        .goods-info {
          flex: 1;

          .goods-name {
            font-size: 14px;
            color: #303133;
            margin-bottom: 5px;
          }

          .goods-spec {
            font-size: 12px;
            color: #909399;
            margin-bottom: 5px;
          }

          .goods-price {
            color: #f56c6c;
            font-size: 14px;

            .goods-quantity {
              margin-left: 10px;
              color: #909399;
            }
          }
        }
      }
    }

    .receiver-info {
      .address {
        color: #909399;
        font-size: 12px;
        margin-top: 5px;
      }
    }

    .amount-info {
      .total-amount {
        color: #f56c6c;
        font-weight: bold;
      }

      .payment-method {
        font-size: 12px;
        color: #909399;
        margin-top: 5px;
      }
    }
  }

  .pagination-container {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
