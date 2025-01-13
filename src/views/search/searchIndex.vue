<template>
  <div>
    <header></header>
    
    <div class="history">
      <div class="left">
        <span style="margin-right: 5px;color: #b0352f;">
          <van-icon name="underway-o" />
        </span>
        <span>历史搜索</span>
      </div>
      
      <span @click="clearRecord()">清除记录</span>
    </div>
    <div class="record-content" >
      
      <van-tag color="#969799" @click="$router.push({path: 'result', query: { search:item}})" v-for="item in searchArr" :key="item" size="large" plain type="primary"> {{ item }} </van-tag>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import header from '@/components/search/header'
import tabbar from '@/components/common/Tabbar'
import { Dialog } from 'vant';
import { Notify } from 'vant';
export default {
  data() {
    return {
      searchArr: []
    }
  },
  created() {
    this.searchArr = JSON.parse(localStorage.getItem('searchArr')) || []
  },
  methods: {
    clearRecord() {
     Dialog.confirm({
  
  message: '您确认要清除记录吗',
})
  .then(() => {
      this.searchArr = []
      localStorage.removeItem('searchArr')
  })
  .catch(() => {
    // on cancel
  });
     
    },
    
  }
}
</script>

<style lang="sass" scoped>
.history{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 50px;
  
}
.record-content{
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  border-bottom: 1px solid #ccc;
  .van-tag{
    margin: 5px;
  }
}
</style>