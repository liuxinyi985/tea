<template>
  <div class="home">
    <search></search>
    <!-- //菜单栏 -->
    <van-tabs v-model:active="active" @click="onClick">
      <van-tab v-for="item in tabList" :title="item.label">
        <div v-if="item.label !== '推荐'">
          <billBrand :brandId="brandId"></billBrand>
          <like></like>
          <Tabbar></Tabbar>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 轮播图 -->
    <div v-show="flag">
      <van-swipe :autoplay="3000" lazy-render width="400" height="200">
        <van-swipe-item v-for="image in images" :key="image">
          <img :src="image" class="home-img" />
        </van-swipe-item>
      </van-swipe>

      <icons></icons>

      <like></like>
      <cardTitle></cardTitle>
      <card></card>

      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
import Tabbar from '../components/common/Tabbar.vue';
import search from '../components/common/search.vue';
import icons from '../components/common/icons.vue';
import cardTitle from '@/components/common/cardTitle.vue';
import card from '../components/common/card.vue';
import like from '@/components/common/like.vue';
import billBrand from '@/components/common/billBrand.vue';
import axios from 'axios';
import { getHomeTab } from '@/api/home';
export default {
  name: 'Home',
  components: {
    Tabbar,
    search,
    icons,
    cardTitle,
    like,
  },

  data() {
    const images = [
      require('@/assets/images/swiper1.jpeg'),

      require('@/assets/images/swiper2.jpeg'),
      require('@/assets/images/swiper3.jpeg'),
    ];

    return {
      active: 0,
      images,
      tabList: [],
      flag: true,
      brandId: 0,
    };
  },
  created() {
    this.getHomeTab();
  },
  methods: {
    // getData() {
    //   axios.get("/api/index_list/0/data/1").then((res) => {
    //     console.log(res.data);
    //     this.tabList = res.data.data.topBar;
    //     console.log(this.tabList);

    //   });
    // },
    async getHomeTab() {
      await getHomeTab().then((res) => {
        console.log(res, 'res');
        this.tabList = res.data.topBar;
      });
    },
    // 导航栏点击事件
    onClick(id) {
      if (id === 0) {
        this.flag = true;
      } else {
        this.flag = false;
      }
      this.brandId = id;
      console.log(id, 'id');
      console.log(this.flag, 'flag');
    },
  },
};
</script>
<style>
.home-img {
  width: 100%;
  height: 100%;
}
</style>
