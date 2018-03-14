import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/views/Index'
// import Details from '@/views/Details'
// import Payment from '@/views/Payment'
// import Order from '@/views/Order'
// import Introduce from '@/views/Introduce'

const Index = () => import('@/views/Index')
const Details = () => import('@/views/Details')
const Payment = () => import('@/views/Payment')
const Order = () => import('@/views/Order')
const Introduce = () => import('@/views/Introduce')
const Complete = () => import('@/views/Complete')
const Weixin = () => import('@/views/Weixin')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '套餐首页',
      component: Index,
      meta: { navShow: true, headerShow: false }
    },
    {
      path: '/details',
      name: '套餐详情',
      component: Details,
      meta: { navShow: false, headerShow: true }
    },
    {
      path: '/payment/:amount/:pkg_name',
      name: '支付',
      component: Payment,
      meta: { navShow: false, headerShow: true }
    },
    {
      path: '/order',
      name: '订单',
      component: Order,
      meta: { navShow: true, headerShow: true }
    },
    {
      path: '/introduce',
      name: '商户介绍',
      component: Introduce,
      meta: { navShow: true, headerShow: true }
    },
    {
      path: '/complete',
      name: '完成',
      component: Complete,
      meta: { navShow: false, headerShow: false }
    },
    {
      path: '/weixin',
      name: '正在登录',
      component: Weixin,
      meta: { navShow: false, headerShow: false }
    }
  ]
})
