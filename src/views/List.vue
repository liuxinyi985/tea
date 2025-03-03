<template>
  <div class="category">
    <!-- 搜索栏 -->
    <van-search
      v-model="searchValue"
      placeholder="搜索喜欢的茶品"
      shape="round"
      background="#f7f8fa"
      @search="onSearch"
    >
      <template #right-icon>
        <van-icon name="scan" size="20" @click="onScan" />
      </template>
    </van-search>

    <!-- 分类导航 -->
    <div class="category-container">
      <!-- 左侧导航 -->
      <van-sidebar v-model="activeCategory" class="sidebar">
        <van-sidebar-item
          v-for="category in categories"
          :key="category.id"
          :title="category.name"
        >
          <template #title>
            <div class="sidebar-item">
              <img :src="category.icon" class="category-icon" />
              <span>{{ category.name }}</span>
            </div>
          </template>
        </van-sidebar-item>
      </van-sidebar>

      <!-- 右侧内容 -->
      <div class="content">
        <!-- 当前分类banner -->
        <div class="category-banner" v-if="currentCategory.banner">
          <van-image :src="currentCategory.banner" fit="cover" radius="8px" />
          <div class="banner-text">
            <h3>{{ currentCategory.name }}</h3>
            <p>{{ currentCategory.description }}</p>
          </div>
        </div>

        <!-- 子分类列表 -->
        <div class="sub-categories">
          <div
            class="sub-category"
            v-for="sub in currentCategory.children"
            :key="sub.id"
            @click="goToList(sub.id)"
          >
            <div class="sub-category-content">
              <van-image :src="sub.image" fit="cover" radius="8px" />
              <span class="sub-name">{{ sub.name }}</span>
              <span class="sub-desc">{{ sub.description }}</span>
            </div>
          </div>
        </div>

        <!-- 推荐商品 -->
        <!-- <div class="recommend" v-if="currentCategory.recommend">
          <div class="section-title">
            <span>热门推荐</span>
            <van-icon name="fire" color="#ee0a24" />
          </div>
          <div class="recommend-list">
            <div 
              class="recommend-item" 
              v-for="item in currentCategory.recommend" 
              :key="item.id"
              @click="goToDetail(item.id)"
            >
              <van-image
                :src="item.image"
                fit="cover"
                radius="8px"
              />
              <div class="item-info">
                <span class="item-name text-ellipsis">{{ item.name }}</span>
                <span class="item-price">¥{{ item.price }}</span>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from '../components/common/Tabbar.vue';
export default {
  name: 'List',
  components: {
    Tabbar,
  },
  data() {
    return {
      searchValue: '',
      activeCategory: 0,
      categories: [
        {
          id: 1,
          name: '绿茶',
          icon: 'https://www.chawo.com/data/upload/shop/store/goods/2/2020/04/2_06402751896961087_1280.jpg',
          banner:
            'https://www.chawo.com/data/upload/shop/store/goods/2/2020/04/2_06402751896961087_1280.jpg',
          description: '清香怡人，回甘悠长',
          children: [
            {
              id: 11,
              name: '龙井',
              image: '',
              description: '色绿香郁，味醇甘爽',
            },
            {
              id: 12,
              name: '碧螺春',
              image: '',
              description: '香气馥郁，滋味鲜醇',
            },
          ],
        },
        {
          id: 2,
          name: '红茶',
          icon: '	https://www.chawo.com/data/upload/shop/store/goods/2/2017/12/2_05655533932521583_1280.jpg',
          banner:
            'https://www.chawo.com/data/upload/shop/store/goods/2/2017/12/2_05655533932521583_1280.jpg',
          description: '醇厚甘甜，回味悠长',
          children: [
            {
              id: 21,
              name: '祁门红茶',
              image: '',
              description: '醇厚甘甜，回味悠长',
            },
          ],
        },
        {
          id: 3,
          name: '乌龙茶',
          icon: '',
          // ... 其他乌龙茶数据
        },
        {
          id: 4,
          name: '普洱茶',
          icon: '',
          // ... 其他普洱茶数据
        },
        { id: 5, name: '哈哈茶' ,
          icon: '',
          // ... 其他普洱茶数据
        },
        {
          id: 6,
          name: '白茶',
          icon: '',
        },
        {},
      ],
    };
  },
  computed: {
    currentCategory() {
      return this.categories[this.activeCategory] || {};
    },
  },
  methods: {
    onSearch() {
      // 搜索实现
    },
    onScan() {
      // 扫码实现
    },
    goToList(categoryId) {
      this.$router.push(`/list?category=${categoryId}`);
    },
    goToDetail(productId) {
      this.$router.push(`/detail/${productId}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  min-height: 100vh;
  background: #f7f8fa;

  .category-container {
    display: flex;
    height: calc(100vh - 54px);

    .sidebar {
      width: 85px;
      background: #fff;
      overflow-y: auto;

      .sidebar-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px 0;

        .category-icon {
          width: 36px;
          height: 36px;
          margin-bottom: 4px;
        }

        span {
          font-size: 12px;
        }
      }
    }

    .content {
      flex: 1;
      padding: 12px;
      overflow-y: auto;

      .category-banner {
        position: relative;
        margin-bottom: 16px;

        .van-image {
          width: 100%;
          height: 120px;
        }

        .banner-text {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
          color: #fff;

          h3 {
            margin: 0;
            font-size: 18px;
            margin-bottom: 4px;
          }

          p {
            margin: 0;
            font-size: 12px;
            opacity: 0.8;
          }
        }
      }

      .sub-categories {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-bottom: 20px;

        .sub-category {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

          .sub-category-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 12px;

            .van-image {
              width: 100%;
              height: 80px;
              margin-bottom: 8px;
            }

            .sub-name {
              font-size: 14px;
              color: #323233;
              margin-bottom: 4px;
            }

            .sub-desc {
              font-size: 12px;
              color: #969799;
              text-align: center;
            }
          }
        }
      }

      .recommend {
        .section-title {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 12px;
          font-size: 16px;
          font-weight: 500;
        }

        .recommend-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;

          .recommend-item {
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

            .van-image {
              width: 100%;
              height: 120px;
            }

            .item-info {
              padding: 8px;

              .item-name {
                display: block;
                font-size: 14px;
                color: #323233;
                margin-bottom: 4px;
              }

              .item-price {
                color: #ee0a24;
                font-size: 16px;
                font-weight: 500;
              }
            }
          }
        }
      }
    }
  }
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
