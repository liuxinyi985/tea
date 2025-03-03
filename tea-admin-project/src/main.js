import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';





Vue.use(ElementUI);

// 注册必须的组件

Vue.config.productionTip = false;
new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
});



