import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/common.css'
import 'vant/lib/index.css'
import { Toast } from 'vant';
import { Lazyload } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import store from "./store";

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);


Vue.use(Toast);
Vue.config.productionTip = false
Vue.config.productionTip = false;
Vue.config.devtools = true; // 手动启用 Vue Devtools
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
