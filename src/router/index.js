import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home/HomeView.vue')
  },
  {
    path: '/cart',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "Cart" */ '../views/Cart/CartListView.vue')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "OrderList" */ '../views/orderList/OrderList.vue')
  },
  {
    path: '/order/:id',
    name: 'Order',
    component: () => import(/* webpackChunkName: "Order" */ '../views/order/OrderView.vue')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "Shop" */ '../views/shop/ShopView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/register/RegisterView.vue'),
    beforeEnter (to, from, next) {
      const isLogin = localStorage.isLogin
      if (isLogin) {
        next({ next: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/login/LoginView.vue'),
    beforeEnter (to, from, next) {
      const isLogin = localStorage.isLogin
      if (isLogin) {
        next({ next: 'Home' })
      } else {
        next()
      }
    }
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin
  console.log(isLogin)
  if (isLogin || (to.name === 'Login' || to.name === 'Register')) {
    next()
  } else {
    next({ name: 'Login' })
  }
})
export default router
