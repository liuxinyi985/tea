<template>
  <div class="card">
    <van-card
      v-for="(item, index) in cardList"
      :key="index"
      @click="goDetail(item.id)"
      :price="item.price"
      :desc="item.description"
      :title="item.goods_name"
      :thumb="'http://' + item.goods_imgUrl"
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
    goDetail(id) {
      this.$router.push({
        name: 'ShopDetail',
        query: {
          id,
        },
      });
    },
  },
  created() {
    getShowGoods({
      page: 1,
      page_size: 100,
      status: 1,
    }).then((res) => {
      this.cardList = res.data.list.slice(4, 8);
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
  margin-bottom: 50px;
}
</style>
