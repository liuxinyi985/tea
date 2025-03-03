<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" :is-collapse="isCollapse" />
    <div class="main-container">
      <div class="header">
        <div class="header-left">
          <breadcrumb class="breadcrumb" />
        </div>
        <div class="header-right">
          <el-dropdown trigger="click">
            <span class="avatar-wrapper">
              <img src="http" class="user-avatar" />
              <i class="el-icon-caret-bottom" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span style="display: block">个人信息</span>
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">
                <span style="display: block">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <tags-view />
      <div class="app-main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar';
import Breadcrumb from '@/components/Breadcrumb';
import TagsView from '@/components/TagsView';

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Breadcrumb,
    TagsView,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapse = !this.isCollapse;
    },
    async logout() {
      try {
        localStorage.removeItem('token');
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
}

.sidebar-container {
  width: 210px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  background-color: #304156;
  transition: width 0.28s;
  z-index: 1001;
}

.main-container {
  min-height: 100%;
  margin-left: 210px;
  position: relative;
  width: calc(100% - 210px);
  
  .header {
    height: 50px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    position: fixed;
    top: 0;
    right: 0;
    width: inherit;
    z-index: 9;
    .header-right{
      position: absolute;
    top: 14px;
    right: 26px;
    z-index: 9;
    }

  }
  
  .app-main {
    padding-top: 50px;
    height: calc(100vh - 50px);
    overflow-y: auto;
    box-sizing: border-box;
  }
}
</style>
