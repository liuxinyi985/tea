<template>
  <div class="dashboard-container">
    <!-- 顶部欢迎区域 -->
    <div class="welcome-section">
      <div class="welcome-info">
        <img :src="userAvatar" class="user-avatar" />
        <div class="welcome-text">
          <h2>{{ getGreeting() }}，{{ userName }}</h2>
          <p>今日茶语：{{ dailyTip }}</p>
        </div>
      </div>
      <div class="season-info">
        <i class="el-icon-sunny"></i>
        <span>{{ currentSeason.name }}</span>
        <span>适宜茶品：{{ currentSeason.recommendTea }}</span>
      </div>
    </div>

    <!-- 茶叶知识卡片区 -->
    <el-row :gutter="20" class="knowledge-section">
      <el-col :span="8" v-for="(item, index) in teaKnowledge" :key="index">
        <el-card shadow="hover" class="knowledge-card">
          <div class="card-header">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </div>
          <div class="card-content">
            <p v-for="(point, idx) in item.points" :key="idx">{{ point }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 茶叶品类介绍 -->
    <el-row :gutter="20" class="tea-category-section">
      <el-col :span="12">
        <el-card shadow="hover" class="category-card">
          <div slot="header" class="card-header">
            <span>六大茶类</span>
            <el-tag size="small" type="success">基础知识</el-tag>
          </div>
          <div class="tea-types">
            <div v-for="(tea, index) in teaTypes" :key="index" class="tea-type-item">
              <img :src="tea.image" :alt="tea.name" class="tea-image" />
              <div class="tea-info">
                <h4>{{ tea.name }}</h4>
                <p>{{ tea.description }}</p>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="season-card">
          <div slot="header" class="card-header">
            <span>四季品茶指南</span>
            <el-tag size="small" type="warning">实用知识</el-tag>
          </div>
          <div class="season-guide">
            <div v-for="(season, index) in seasonGuide" :key="index" class="season-item">
              <div class="season-icon" :class="season.className">
                <i :class="season.icon"></i>
              </div>
              <div class="season-content">
                <h4>{{ season.name }}</h4>
                <p>推荐茶品：{{ season.recommendations }}</p>
                <p>饮茶建议：{{ season.tips }}</p>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 茶文化小知识 -->
    <el-card shadow="hover" class="tea-culture-section">
      <div slot="header" class="culture-header">
        <span>茶文化小知识</span>
        <el-button type="text" @click="refreshTip">换一换</el-button>
      </div>
      <div class="culture-content">
        <div class="tip-card" v-for="(tip, index) in teaCultureTips" :key="index">
          <div class="tip-icon">
            <i class="el-icon-info"></i>
          </div>
          <div class="tip-text">
            <h4>{{ tip.title }}</h4>
            <p>{{ tip.content }}</p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      userName: '管理员',
      userAvatar: '',
      dailyTip: '一日之计在于晨，一日之茶在于早',
      currentSeason: {
        name: '春季',
        recommendTea: '龙井、碧螺春、黄山毛峰'
      },
      teaKnowledge: [
        {
          title: '茶叶功效',
          icon: 'el-icon-star-on',
          points: [
            '含有茶多酚，具有抗氧化作用',
            '含有咖啡因，提神醒脑',
            '具有降脂减肥的功效',
            '增强免疫力'
          ]
        },
        {
          title: '冲泡技巧',
          icon: 'el-icon-coffee-cup',
          points: [
            '水温要适中，不同茶类水温不同',
            '投茶量要适量，一般3-5克适宜',
            '冲泡时间要把控好',
            '多次冲泡要注意时间递增'
          ]
        },
        {
          title: '储存方法',
          icon: 'el-icon-box',
          points: [
            '避免阳光直射',
            '防潮防异味',
            '密封保存',
            '常温储存即可'
          ]
        }
      ],
      teaTypes: [
        {
          name: '绿茶',
          image:'https://www.chawo.com/data/upload/shop/store/goods/2/2022/05/2_07068996577066044_1280.jpg',
          description: '不发酵茶，保留了茶叶原有的色泽与清香'
        },
        {
          name: '红茶',
          image:'https://www.chawo.com/data/upload/shop/store/goods/2/2017/12/2_05655533788304302_1280.jpg',
          description: '全发酵茶，具有红汤红叶特征'
        },
        {
          name: '乌龙茶',
          image:'https://www.chawo.com/data/upload/shop/store/goods/2/2017/08/2_05561320139237004_1280.jpg',
          description: '半发酵茶，兼具红茶与绿茶的特点'
        }
      ],
      seasonGuide: [
        {
          name: '春季',
          icon: 'el-icon-sunny',
          className: 'spring',
          recommendations: '绿茶、白茶',
          tips: '春茶新鲜，适合清淡饮用'
        },
        {
          name: '夏季',
          icon: 'el-icon-sunny',
          className: 'summer',
          recommendations: '绿茶、乌龙茶',
          tips: '可以冷泡，更加清爽提神'
        }
      ],
      teaCultureTips: [
        {
          title: '茶之起源',
          content: '相传神农氏尝百草时发现了茶叶，开启了人类饮茶历史'
        },
        {
          title: '茶道精神',
          content: '茶道包含和敬清寂四个要素，体现中国传统文化的精髓'
        }
      ]
    }
  },
  methods: {
    getGreeting() {
      const hour = new Date().getHours()
      if (hour < 6) return '夜深了'
      if (hour < 9) return '早上好'
      if (hour < 12) return '上午好'
      if (hour < 14) return '中午好'
      if (hour < 17) return '下午好'
      if (hour < 19) return '傍晚好'
      return '晚上好'
    },
    refreshTip() {
      // 实现随机更换小知识的逻辑
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100%;
  box-sizing: border-box;
 .el-row {
    width: 100%;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .welcome-section {
    background: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
    padding: 24px;
    border-radius: 12px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .welcome-info {
      display: flex;
      align-items: center;
      gap: 20px;

      .user-avatar {
        width: 64px;
        height: 64px;
        border-radius: 32px;
        border: 3px solid rgba(255, 255, 255, 0.3);
      }

      .welcome-text {
        h2 {
          margin: 0;
          font-size: 24px;
        }

        p {
          margin: 8px 0 0;
          opacity: 0.8;
        }
      }
    }
  }

  .knowledge-section {
    margin-bottom: 24px;

    .knowledge-card {
      height: 100%;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      .card-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
        font-size: 18px;
        font-weight: bold;

        .el-icon {
          font-size: 24px;
        }
      }

      .card-content {
        p {
          margin: 8px 0;
          color: #606266;
          line-height: 1.6;
        }
      }
    }
  }

  .tea-category-section {
    margin-bottom: 24px;

    .category-card, .season-card {
      height: 100%;

      .tea-types, .season-guide {
        display: grid;
        gap: 16px;
      }

      .tea-type-item, .season-item {
        display: flex;
        gap: 16px;
        padding: 12px;
        border-radius: 8px;
        background: #f5f7fa;

        img {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          object-fit: cover;
        }

        .tea-info {
          h4 {
            margin: 0 0 8px;
          }

          p {
            margin: 0;
            color: #606266;
            font-size: 14px;
          }
        }
      }
    }
  }

  .tea-culture-section {
    .culture-content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;

      .tip-card {
        display: flex;
        gap: 16px;
        padding: 16px;
        background: #f5f7fa;
        border-radius: 8px;
        transition: transform 0.3s;

        &:hover {
          transform: translateY(-3px);
        }

        .tip-icon {
          font-size: 24px;
          color: #409EFF;
        }

        .tip-text {
          h4 {
            margin: 0 0 8px;
          }

          p {
            margin: 0;
            color: #606266;
            font-size: 14px;
            line-height: 1.6;
          }
        }
      }
    }
  }
}
</style>