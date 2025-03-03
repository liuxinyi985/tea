<template>
  <div class="sidebar-container">
    <div class="logo-container">
      <span class="logo-title">茶叶商城管理系统</span>
    </div>
    
    <el-menu
      :default-active="activeMenu"
      class="sidebar-menu"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#409EFF"
      :collapse="isCollapse"
      router
    >
      <el-menu-item index="/dashboard">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span>商品管理</span>
        </template>
        <!-- <el-menu-item index="/goods/list">
          <span>商品列表</span>
        </el-menu-item> -->
      
        <el-menu-item index="/goods/stock">
          <span>库存管理</span>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item index="/order/list">
          <span>订单列表</span>
        </el-menu-item>
        <!-- <el-menu-item index="/order/delivery">
          <span>发货管理</span>
        </el-menu-item> -->

      </el-submenu>

   
   

      <el-menu-item index="/statistics/echarts">
        <i class="el-icon-s-data"></i>
        <span slot="title">数据统计</span>
      </el-menu-item>

     
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    activeMenu() {
      return this.$route.path
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar-container {
  height: 100vh;
  background-color: #001529;
  width: 240px;
  transition: width 0.3s;
  
  &.is-collapse {
    width: 64px;
  }

  .logo-container {
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #002140;
    overflow: hidden;
    
    .logo-title {
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      white-space: nowrap;
    }
  }

  .sidebar-menu {
    border: none;

    /deep/ .el-menu-item {
      height: 50px;
      line-height: 50px;
      
      &:hover, &.is-active {
        background-color: #001f3d !important;
      }
    }

    /deep/ .el-submenu__title {
      &:hover {
        background-color: #001f3d !important;
      }
    }
  }
}
</style>