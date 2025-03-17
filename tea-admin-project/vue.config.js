module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  lintOnSave: process.env.NODE_ENV !== 'production',
  transpileDependencies: ['vue-echarts'],
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
  },
  devServer: {
    proxy: {
      // 代理所有以 /api 开头的请求
      '/api': {
        target: 'http://39.108.113.248:8888/', // 后端接口地址
        // target: 'http://192.168.177.70:8888', // 后端接口地址
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '', // 移除请求路径中的 /api 前缀（可选）
        },
      },
    },
  },
};
