<template>
  <div class="shopDetail">
    <div class="swipe-wrapper">
      <!-- 顶部导航栏 -->
      <van-nav-bar
        class="nav-bar"
        title="商品详情"
        left-arrow
        fixed
        @click-left="$router.push('/home')"
      />

      <!-- 商品图片轮播 -->
      <van-swipe
        class="swipe-container"
        :autoplay="3000"
        @change="onChange"
        :show-indicators="false"
      >
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <van-image class="goods-image" :src="'http://' + image" fit="cover">
            <template v-slot:loading>
              <van-loading type="spinner" size="24" color="#fff" />
            </template>
            <template v-slot:error>
              <div class="error-hint">图片加载失败</div>
            </template>
          </van-image>
        </van-swipe-item>

        <!-- 自定义页码指示器 -->
        <div class="custom-indicator">
          <span class="current">{{ current + 1 }}</span>
          <span class="separator">/</span>
          <span class="total">{{ images.length }}</span>
        </div>
      </van-swipe>
    </div>

    <div class="main-content">
      <!-- 商品信息快速导航 -->
  

      <div class="content-container">
        <div class="title">
          <h1>{{ shopInfo.goods_name }} 珍稀{{ shopInfo.goods_name }}100g</h1>
          <p>{{ shopInfo.description }}</p>
        </div>

        <div class="price-stock">
          <div class="price">
            <span class="symbol">￥</span>
            <h1>{{ shopInfo.price }}.00</h1>
          </div>
          <div class="stock">
            <van-tag type="warning" round
              >库存: {{ shopInfo.stock || 0 }}件</van-tag
            >
          </div>
        </div>

        <div class="detail">
          <van-divider
            :style="{
              color: '#1989fa',
              borderColor: '#1989fa',
              padding: '0 16px',
            }"
          >
            商品详情
          </van-divider>
          <div class="detail-content">
            <p>
              乌龙茶是半发酵茶，介于绿茶与红茶之间，属于全发酵茶。乌龙茶是福建、台湾、广东、广西、四川、湖南、江西等地的重要特产，是中国十大名茶之一。
            </p>
          </div>
        </div>
      </div>

      <div class="goodsAction">
        <van-goods-action>
          <van-goods-action-icon
            icon="chat-o"
            text="客服"
            @click="onClickIcon"
          />
          <van-goods-action-icon icon="cart-o" text="购物车" @click="goCard" />
          <van-goods-action-icon icon="shop-o" text="店铺" @click="goHome" />
          <van-goods-action-button
            type="danger"
            text="加入购物车"
            @click="onClickButton"
          />
        </van-goods-action>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/common/card';
import { getGoodsDetail, addGoodsCart, } from '@/api/home';
import { Dialog } from 'vant';
import { Toast } from 'vant';
export default {
  data() {
    return {
      current: 0,
      shopInfo: {},
      images: [],
      tabs: ['商品详情', '评价', '推荐'],
      activeTab: 0,
    };
  },
  created() {
    this.getGoodId();
  },
  methods: {
    //  获取商品详情
    getGoodId() {
      getGoodsDetail(this.$route.query.id)
        .then((res) => {
          this.shopInfo = res.data;
          this.images[0] = res.data.goods_imgUrl;
          console.log(this.shopInfo);
        })
        .catch((err) => {});
    },

    onChange(index) {
      this.current = index;
    },
    goHome() {
      this.$router.push('/home');
    },
    goCard() {
      this.$router.push('/cart');
    },
    onClickButton() {
      Dialog.confirm({
        message: '您确定要加入购物车吗？',
      })
        .then(() => {
          addGoodsCart({
            goods_uuid: this.$route.query.id,
          }).then((res) => {
            Toast.success('添加成功');
          });
        })
        .catch(() => {})
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
.shopDetail {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.swipe-wrapper {
  position: relative;
  width: 100%;
  background-color: #fff;
}

.nav-bar {
  :deep(.van-nav-bar__content) {
    background-color: transparent;
  }

  :deep(.van-nav-bar__title) {
    color: #333;
  }

  :deep(.van-icon) {
    color: #333 !important;
  }
}

.swipe-container {
  height: 375px;
  padding-top: 46px; // 为顶部导航栏留出空间
  background-color: #fff;

  .goods-image {
    width: 100%;
    height: 100%;
    display: block;

    :deep(.van-image__img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .error-hint {
      font-size: 14px;
      color: #999;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: #f8f8f8;
    }
  }

  .custom-indicator {
    position: absolute;
    right: 12px;
    bottom: 12px;
    padding: 4px 10px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    backdrop-filter: blur(4px);

    .current {
      font-weight: bold;
      font-size: 14px;
    }

    .separator {
      margin: 0 3px;
      opacity: 0.8;
    }

    .total {
      opacity: 0.8;
    }
  }
}

.main-content {
  margin: 0 auto;
  max-width: 100%;
  background-color: #f8f8f8;
}

.info-tabs {
  background: #fff;
  padding: 12px 15px;
  display: flex;
  margin-bottom: 10px;

  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #666;
    position: relative;

    span {
      position: relative;
      padding: 4px 0;

      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background-color: #ff6b6b;
        transition: width 0.3s;
      }
    }

    &.active {
      color: #ff6b6b;
      font-weight: 500;

      span::after {
        width: 20px;
      }
    }
  }
}

.content-container {
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 60px;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
}

.title {
  h1 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
    line-height: 1.4;
  }

  p {
    font-size: 14px;
    margin: 8px 0;
    color: #666;
    line-height: 1.6;
  }
}

.price-stock {
  margin: 15px 0;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;

  .price {
    display: flex;
    align-items: baseline;
    color: #ff6b6b;

    .symbol {
      font-size: 16px;
      margin-right: 2px;
    }

    h1 {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
    }
  }

  .stock {
    .van-tag {
      padding: 5px 10px;
    }
  }
}

.detail {
  margin-top: 15px;

  .detail-content {
    padding: 10px 0;

    p {
      font-size: 14px;
      line-height: 1.6;
      color: #666;
      margin: 0;
      text-align: left;
    }
  }
}

.goodsAction {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding-bottom: env(safe-area-inset-bottom);
}

h1 {
  font-size: 20px;
  font-weight: 600;
}
img {
  width: 100%;
  height: 200px;
}
</style>
