<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Helvetica, PingFang SC, Microsoft YaHei, Arial, sans-serif;
}

#app {
  height: 100%;
}

* {
  box-sizing: border-box;
}


::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #909399;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #606266;
}
</style>