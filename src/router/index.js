import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    redirect:'/home'
  },
  {
    path: "/list",
    name: "List",
    component: () =>
      import("../views/List.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import("../views/Cart.vue"),
  },
  {
    path: "/my",
    name: "My",
    component: () =>
      import("../views/My.vue"),
  },
  ,
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import("../views/login/login.vue"),
  },
  {
    path:'/search',
    name:'Search',
    component: () =>
      import("../views/Search.vue"),
    children: [
      {
        path:"/",
        redirect:"index"
      },
      {
        path: "index",
        name: "SearchIndex",
        component: () =>
          import("../views/search/searchIndex.vue"),
      },
      {
        path: "result",
        name: "SearchResult",
        component: () =>
          import("../views/search/searchResult.vue"),
      }
    ]
  },
  {
    path: '/shopDetail',
    name: 'ShopDetail',
    component: () =>
      import("../views/detail/shopDetail.vue"),
  }
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
