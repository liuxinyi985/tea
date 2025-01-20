<template>
  <div class="content">
    <header :searchContent="searchInput"></header>
    <div class="topTab">
      <ul class="topTabList">
        <li
          class="price"
          v-for="(item, index) in tabList"
          @click="changeTab(index, item)"
          :key="item.name"
        >
          <span :class="{ active: index === active }">
            {{ item.name }}
          </span>
          <span v-if="index !== 0" class="price-icon">
            <van-icon
              :class="{ active: item.arrowActive && index === active }"
              name="arrow-up"
            />
            <van-icon
              :class="{ active: !item.arrowActive && index === active }"
              name="arrow-down"
            />
          </span>
        </li>
      </ul>
    </div>
    <van-card
      v-for="item in goodsList"
      :key="item.id"
      :price="item.price"
      :desc="item.description"
      :title="item.name"
      :thumb="item.url"
      :lazy-load="true"
    >
     
      <template #footer>
        <van-button @click="onClickButton(item.id)" size="normal">加入购物车</van-button>
      </template>
    </van-card>
    <van-empty description="商品已售罄" v-if="goodsList.length === 0" />
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import header from '@/components/search/header';
import Tabbar from '@/components/common/Tabbar.vue';
import { getHomeTab, getShowGoods } from '@/api/home';
import { getGoodsSearch } from '@/api/home';
import { getGoodsDetail, addGoodsCart } from '@/api/home';
import { Lazyload } from 'vant';
import { Dialog,Toast } from 'vant';
export default {
  data() {
    return {
      searchInput: '',
      sortFlag: '',
      active: 0,
      tabList: [
        {
          name: '综合',
        },
        {
          name: '价格',
          arrowActive: false,
        },
        {
          name: '销量',
          arrowActive: false,
        },
      ],

      goodsList: [],
    };
  },
  components: {
    header,
    Tabbar,
  },
  created() {
    this.searchInput = this.$route.query.search;
    console.log(this.searchInput, '我是搜索内容');
    // this.getShowGoods();
    this.getGoodsSearch();

  },
  methods: {
    onClickButton(id) {
      Dialog.confirm({
        message: '您确定要加入购物车吗？',
      })
        .then(() => {
          addGoodsCart({
            goodsId: id,
          }).then((res) => {
            Toast.success('添加成功');
          });
        }).catch(() => {
          
        })
        .catch(() => {
          // on cancel
        });
    },
    //获取搜索列表
    async getGoodsSearch() {
      await getGoodsSearch({keyword: this.searchInput}).then((res) => {
        this.goodsList = res.data;
        console.log(this.goodsList, '我是商品列表');
      });
    },
    changeTab(index, item) {
      this.active = index;
      if (index !== 0) {
        item.arrowActive = !item.arrowActive;

        this.sortFlag = item.arrowActive;
        this.goodsList.sort((a, b) => {
          return this.sortFlag ? b.price - a.price : a.price - b.price;
        });
      } else {
        this.getGoodsSearch();
      }
    },
    // async getShowGoods() {
    //   await getShowGoods().then((res) => {
    //     this.goodsList = res.data;
    //     console.log(this.goodsList, '我是商品列表');
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.topTab {
  width: 100%;
  height: 40px;
  background-color: #fff;
  .topTabList {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;

    .price {
      display: flex;
      align-items: center;

      .price-icon {
        display: flex;
        margin-left: 5px;
        flex-direction: column;
        align-items: center;
        .van-icon {
          font-size: 10px;
        }
      }
    }
    .num {
      display: flex;
      align-items: center;
      .num-icon {
        display: flex;
        margin-left: 5px;
        flex-direction: column;
        align-items: center;
        .van-icon {
          font-size: 10px;
        }
      }
    }
  }
}
.active {
  color: red;
}
</style>
