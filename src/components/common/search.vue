<template>
  <van-search   @focus="onSearch"  placeholder="请输入搜索关键词" />

</template>

<script>
export default {
name: "SearchBar",
methods:{
  onSearch(){
   
    
    this.$router.push('/search/index')
  }
},

}
</script>

<style>

</style>