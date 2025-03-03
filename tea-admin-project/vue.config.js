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
};
