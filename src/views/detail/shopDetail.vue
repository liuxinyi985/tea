<template>
  <div class="shopDetail">
<van-swipe :autoplay="3000" @change="onChange">
 
    
    
 
  <van-swipe-item v-for="(image, index) in images" :key="index"  >
    <div class="header">
<!-- <van-icon class="left" @click="$router.go(-1)" name="arrow-left" />
<van-icon class="right" name="chat-o" /> -->
    </div>
    <img v-lazy="image" />
  </van-swipe-item>
  
</van-swipe>
  <div class="title">
    <h1>2024-乌龙茶 珍稀乌龙茶100g</h1>
    <p>性价比首选，喝了不窜，扇耳光都不放手</p>
  </div>
  <div class="price">
    <h1 >￥99.00</h1>
  
  </div>
  <div class="detail">
   <van-divider>商品详情</van-divider>
    <p>乌龙茶是半发酵茶，介于绿茶与红茶之间，属于全发酵茶。乌龙茶是福建、台湾、广东、广西、四川、湖南、江西等地的重要特产，是中国十大名茶之一。</p>
  </div>
 
  <div class="goodsAction">
    <van-goods-action>
  <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
  <van-goods-action-icon icon="cart-o" text="购物车" @click="goCard" />
  <van-goods-action-icon icon="shop-o" text="店铺" @click="goHome" />
  <van-goods-action-button
    type="danger"
    text="立即购买"
    @click="onClickButton"
  />
</van-goods-action>
  </div>
  </div>
</template>

<script>
import card from '@/components/common/card'
export default {
data() {
    return {
      current: 0,
       images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
      ],
    };
  },
  created() {
    this.getGoodId()
  },
  methods: {
    //  获取商品详情
    getGoodId() {
      console.log(this.$route.query.id)
    },
    
    onChange(index) {
      this.current = index;
    },
    goHome(){
      this.$router.push('/home')
    },
    goCard() {
      this.$router.push('/cart')
    },
    onClickButton() {
      Toast('点击按钮');
    }
  },
}
</script>

<style lang="less" scoped>

  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
  .header{
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    width: 95%;
    .left{
      width: 20px;
      
      background: rgba(0, 0, 0, 0.1);
      border-radius: 45%;
    }
    .right{
      display: flex;
      justify-content:center;
      align-items: center;
      
      width: 20px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 45%;
    }
  }
  .title{
    margin-top: 10px;
    h1{
      font-size: 20px;
      font-weight: 600;
      margin-left: 5px;
    }
    p{
      font-size: 12px;
       margin: 5px 0;
       margin-left: 5px;
       color:  #999;
    }
    
  }
  .price{
    margin-top: 10px;
    color: orangered;
    h1{
      font-size: 20px;
      font-weight: 600;
      margin-left: 5px;
    }
    p{
      font-size: 12px;
       margin: 5px 0;
       margin-left: 5px;
       color:  #999;
    }
    
  }
  
  .detail{
    margin-top: 10px;
    text-align: center;
    
    p{
      font-size: 12px;
       margin: 5px 0;
       margin-left: 5px;
       color:  #999;}
  }
    h1{
      font-size: 20px;
      font-weight: 600;
  }
  img{
    width: 100%;
    height: 200px;
  }
</style>