<template>
  <div class="like-container">
    <cardTitle>
      <span>猜你喜欢</span>
    </cardTitle>
    <div v-if="LoadingFlag" class="imgList">
      <div class="one" v-for="item in imgList" :key="item.id" @click="goDetail(item.id)">
        <van-image width="185" height="150" :src="item.url" alt="">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" /> </template
        ></van-image>
        <div class="introduce">
          <span class="ellipsis" :title="item.title">{{ item.name }}</span>
          <span class="price">{{ item.price }}元</span>
        </div>
      </div>
    </div>
    <van-loading v-else />
  </div>
</template>

<script>
import { Loading } from 'vant';
import cardTitle from './cardTitle.vue';
import { getShowGoods } from '@/api/home';
export default {
  components: {
    cardTitle,
  },
  data() {
    return {
      LoadingFlag: true,
      imgList: [
        {
          src: require('@/assets/images/like.jpeg'),
          title: '不要九九八，也不要666，就要999',
          price: '$999',
        },
        {
          src: require('@/assets/images/like.jpeg'),
          title: '不要九九八，也不要666，就要999',
          price: '$999',
        },
        {
          src: require('@/assets/images/like.jpeg'),
          title: '不要九九八，也不要666，就要999',
          price: '$999',
        },
        {
          src: require('@/assets/images/like.jpeg'),
          title: '不要九九八，也不要666，就要999',
          price: '$999',
        },
      ],
    };
  },
  methods: {
    goDetail(id) {
      console.log(id);
      
      this.$router.push({
        name:'ShopDetail',
        query: {
          id,
        },
      });
    },
  },
  created() {
    this.LoadingFlag = false;
    getShowGoods().then((res) => {
      this.imgList = res.data.slice(0, 4);
    });
    this.LoadingFlag = true;
  },
};
</script>

<style lang="scss" scoped>
.like-container {
  img {
    width: 185px;
    height: 150px;
  }
  .imgList {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 0 auto; /* 水平居中容器 */
    gap: 10px; /* 网格项之间的间距 */
    padding: 10px; /* 容器内边距，可选 */
    box-sizing: border-box; /* 包括内边距和边框在内计算元素总宽度 */
    .one {
      display: flex;
      flex-direction: column;
      .introduce {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        color: #646566;
        .ellipsis {
          display: inline-block;
          max-width: 185px; /* 设置最大宽度 */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: top;
          padding: 5px 0;
        }
        .price {
          color: #f60;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
