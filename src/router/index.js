import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Details from '@/views/Details'
import Payment from '@/views/Payment'
import Order from '@/views/Order'
import Introduce from '@/views/Introduce'

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
      path: '/payment',
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
    }
  ]
})
