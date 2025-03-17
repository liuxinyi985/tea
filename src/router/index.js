import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List.vue'),
    // meta: { requiresAuth: true }, // 需要认证
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
  },
  {
    path: '/my',
    name: 'My',

    component: () => import('../views/My.vue'),
    meta: { requiresAuth: false }, // 不需要认证
  },
  ,
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    children: [
      {
        path: '/',
        redirect: 'index',
      },
      {
        path: 'index',
        name: 'SearchIndex',
        component: () => import('../views/search/searchIndex.vue'),
      },
      {
        path: 'result',
        name: 'SearchResult',
        component: () => import('../views/search/searchResult.vue'),
      },
    ],
  },
  {
    path: '/shopDetail',
    name: 'ShopDetail',
    component: () => import('../views/detail/shopDetail.vue'),
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/address.vue'),
    children: [
      {
        path: '/',
        redirect: 'list',
      },
      {
        path: 'list',
        name: 'AddressList',
        component: () => import('../views/address/index.vue'),
      },
      {
        path: 'edit',
        name: 'Edit',
        component: () => import('../views/address/component/edit.vue'),
      },
    ],
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/order/index.vue'),
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import('../views/order/orderList.vue'),
  },
  {
    path: '/orderDetail',
    name: 'OrderDetail',
    component: () => import('../views/order/detail.vue'),
  },
  {
    path: '/orderDetail/:id',
    name: 'OrderDetailById',
    component: () => import('../views/order/detail.vue'),
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

function checkUserAuth() {
  const token = localStorage.getItem('token');
  console.log(token, '是否登录');

  return !!token;
}
// 全局前置守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkUserAuth(); // 检查用户是否登录
  try {
    // 如果用户未登录且目标路由不是登录页，则跳转到登录页
    if (!isAuthenticated && to.path !== '/login') {
      return next('/login'); // 跳转到登录页
    }

    // 如果用户已登录且目标路由是登录页，则跳转到首页或其他页面
    if (isAuthenticated && to.path === '/login') {
      return next('/'); // 跳转到首页
    }
  } catch (error) {
    console.error(error);
  }
  // 其他情况，继续导航
  next();
});

export default router;
