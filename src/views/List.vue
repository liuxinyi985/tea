<template>
  <div class="list">
    <van-nav-bar
      title="分类"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tree-select
      height="75%"
      :items="items"
      :main-active-index.sync="active"
    >
      <template #content>
        <div v-if="0 === active">
          <div class="imgList">
            <div class="one" v-for="item in imgList" :key="item.id">
              <img :src="item.src" alt="" />
              <div class="introduce">
                <span class="ellipsis" :title="item.title"
                  >不要九九八，也不要666，就要999</span
                >
                <span class="price">$999</span>
              </div>
            </div>
          </div>
        </div>

        <van-image
          v-if="active === 1"
          src="https://img01.yzcdn.cn/vant/apple-2.jpg"
        />
      </template>
    </van-tree-select>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '../components/common/Tabbar.vue';
import { Dialog } from 'vant';

export default {
  name: 'List',
  data() {
    return {
      active: 0,
      items: [{ text: '绿茶' }, { text: '红茶' }],
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
  components: {
    Tabbar,
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.one {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;

  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  margin: 10px 0;

  img {
    width: 90%;
    height: 70%;
  }
  .introduce {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #646566;
    .ellipsis {
      display: inline-block;
      max-width: 90%; /* 设置最大宽度 */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: top;
      padding: 5px 0;
    }
    .price {
      color: #323233;
    }
  }
}
</style>
