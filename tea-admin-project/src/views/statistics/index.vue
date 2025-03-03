<template>
  <div class="statistics-container">
    <!-- 数据概览卡片 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in statisticsData" :key="index">
        <el-card shadow="hover" class="data-card">
          <div class="card-header">
            <span>{{ item.title }}</span>
            <el-tag size="mini" :type="item.trend > 0 ? 'success' : 'danger'">
              {{ item.trend > 0 ? '+' : '' }}{{ item.trend }}%
            </el-tag>
          </div>
          <div class="card-number">{{ item.prefix }}{{ item.number }}</div>
          <div class="card-footer">
            <span>{{ item.footerTitle }}</span>
            <span>{{ item.footerValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="16">
        <el-card shadow="hover">
          <div slot="header" class="chart-header">
            <span>销售趋势</span>
            <el-radio-group v-model="timeRange" size="small">
              <el-radio-button label="week">本周</el-radio-button>
              <el-radio-button label="month">本月</el-radio-button>
              <el-radio-button label="year">全年</el-radio-button>
            </el-radio-group>
          </div>
          <div class="chart-container" ref="salesChart"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header">
            <span>商品分类占比</span>
          </div>
          <div class="chart-container" ref="categoryChart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'Statistics',
  data() {
    return {
      timeRange: 'week',
      statisticsData: [
        {
          title: '今日销售额',
          number: '12,589',
          prefix: '¥',
          trend: 12.5,
          footerTitle: '总销售额',
          footerValue: '¥236,589'
        },
        {
          title: '今日订单数',
          number: '128',
          prefix: '',
          trend: 8.2,
          footerTitle: '总订单数',
          footerValue: '1,859'
        },
        {
          title: '新增用户',
          number: '25',
          prefix: '',
          trend: -2.8,
          footerTitle: '总用户数',
          footerValue: '3,568'
        },
        {
          title: '退款金额',
          number: '1,258',
          prefix: '¥',
          trend: 5.2,
          footerTitle: '退款率',
          footerValue: '5.2%'
        }
      ],
      salesChart: null,
      categoryChart: null
    }
  },
  methods: {
    initSalesChart() {
      this.salesChart = echarts.init(this.$refs.salesChart)
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
          areaStyle: {}
        }]
      }
      this.salesChart.setOption(option)
    },
    initCategoryChart() {
      this.categoryChart = echarts.init(this.$refs.categoryChart)
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center'
        },
        series: [{
          name: '销售占比',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false
          },
          data: [
            { value: 1048, name: '红茶' },
            { value: 735, name: '绿茶' },
            { value: 580, name: '乌龙茶' },
            { value: 484, name: '普洱茶' },
            { value: 300, name: '花茶' }
          ]
        }]
      }
      this.categoryChart.setOption(option)
    },
    handleResize() {
      this.salesChart && this.salesChart.resize()
      this.categoryChart && this.categoryChart.resize()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initSalesChart()
      this.initCategoryChart()
      window.addEventListener('resize', this.handleResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    this.salesChart && this.salesChart.dispose()
    this.categoryChart && this.categoryChart.dispose()
  },
  watch: {
    timeRange() {
      // 这里可以根据时间范围重新获取数据
      // this.fetchSalesData()
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics-container {
  padding: 20px;

  .data-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .card-number {
      font-size: 24px;
      font-weight: bold;
      color: #303133;
      margin: 10px 0;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      color: #909399;
      font-size: 14px;
    }
  }

  .chart-row {
    margin-top: 20px;
  }

  .chart-container {
    height: 300px;
  }

  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>