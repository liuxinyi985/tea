<template>
  <div class="icon-container">
  
    <ul>
      <li v-for="item in iconList" :key="item.name" >
        <img :src="item.url" alt="">
        <span> {{ item.name }} </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconList: [
        {
          url: require("@/assets/images/icons1.png"),
          name:'自饮茶'
        },
        {
          url: require("@/assets/images/icons2.png"),
          name:'茶具'
        },
        {
          url: require("@/assets/images/icons3.png"),
          name:'茶礼'
        },
        {
          url: require("@/assets/images/icons4.png"),
          name:'茶文化'
        },
        {
          url: require("@/assets/images/icons5.png"),
          name:'茶具'
        },
       
      ]
    }
  }
}
</script>

<style lang="scss" scoped>


.icon-container {
  ul {
    display: flex;
    justify-content: space-around;
    li{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px 0;
      
      span{
        font-size: 16px;
      }
    }
  }
  
  img{ width: 50px; height: 50px;}
}
</style>