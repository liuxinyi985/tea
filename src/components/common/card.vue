<template>
  <div class="card">
    <van-card
      v-for="(item, index) in cardList"
      :key="index"
      @click="goDetail"
      :price="item.price"
      :desc="item.description"
      :title="item.name"
      :thumb="item.url"
    />
  </div>
</template>

<script>
import { getShowGoods } from '@/api/home';
export default {
  data() {
    return {
      cardList: [
        {
          title: '商品标题',
          desc: '描述信息',
          price: '2.00',
          thumb: require('@/assets/images/recommend.jpeg'),
        },
        {
          title: '商品标题',
          desc: '描述信息',
          price: '2.00',
          thumb: require('@/assets/images/recommend.jpeg'),
        },
        {
          title: '商品标题',
          desc: '描述信息',
          price: '2.00',
          thumb: require('@/assets/images/recommend.jpeg'),
        },
      ],
    };
  },
  methods: {
    goDetail() {
      this.$router.push('/shopDetail');
    },
  },
  created() {
    getShowGoods().then((res) => {
      this.cardList = res.data;
      console.log(res.data);
    });
  },
};
</script>

<style scoped lang="scss">
.card {
  ::v-deep .van-card__thumb {
    position: relative;
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    width: 189px;
    height: 88px;
    margin-right: 8px;
  }
}
</style>
