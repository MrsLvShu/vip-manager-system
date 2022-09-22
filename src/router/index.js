import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    // name: 'layout',
    redirect:'/home',
    component: () => import('../layout'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'member',
        name: 'member',
        meta: {
          title:'会员管理'
        },
        component: () => import('../views/Member.vue')
      },
      {
        path: 'supplier',
        name: 'supplier',
        meta: {
          title: '供应商管理'
        },
        component: () => import('../views/Supplier.vue')
      },
      {
        path: 'staff',
        name: 'staff',
        meta: {
          title: '员工管理'
        },
        component: () => import('../views/Staff.vue')
      },
      {
        path: 'goods',
        name: 'goods',
        meta: {
          title: '商品管理'
        },
        component: () => import('../views/Goods.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
