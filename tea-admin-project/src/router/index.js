import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/components/layout/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'el-icon-s-home' },
      },
    ],
  },
  {
    path: '/goods',
    component: Layout,
    name: 'Goods',
    meta: { title: '商品管理', icon: 'el-icon-s-goods' },
    children: [
      {
        path: 'list',
        name: 'GoodsList',
        component: () => import('@/views/goods/index.vue'),
        meta: { title: '商品列表' },
      },

      {
        path: 'stock',
        name: 'GoodsStock',
        component: () => import('@/views/goods/list'),
        meta: { title: '库存管理' },
      },
    ],
  },
  {
    path: '/statistics',
    component: Layout,
    name: 'Statistics',
    children: [
      {
        path: 'echarts',
        name: 'Echarts',
        component: () => import('@/views/statistics/index.vue'),
        meta: { title: '统计', icon: 'el-icon-s-home' },
      },
    ],
  },
  {
    path: '/order',
    component: Layout,
    name: 'Order',
    meta: { title: '订单管理', icon: 'el-icon-s-order' },
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/order/index'),
        meta: { title: '订单列表' },
      },
    ],
  },
  // ... 其他路由配置
];

const router = new VueRouter({
  routes,
});

// 路由守卫
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token');
//   if (to.path !== '/login' && to.path !== '/register' && !token) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;
