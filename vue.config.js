const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('@vant/auto-import-resolver');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
module.exports = defineConfig({
  transpileDependencies: true
})
let path = require("path");
module.exports = {
  //代理

  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.108.113.248:8888/', // 后端接口地址
        // target:'http://192.168.177.70:8888',
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      //当 unplugin-vue-components 版本大于等于 0.26.0 时，使用以下写法
      AutoImport.default({
        resolvers: [VantResolver()],
      }),
      Components.default({ resolvers: [VantResolver()] }),
    ],
  },
};



