import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Details from '@/views/Details'
import Payment from '@/views/Payment'
import Order from '@/views/Order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: { navShow: true, cname: '首页' }
    },
    {
      path: '/details',
      name: 'Details',
      component: Details,
      meta: { navShow: false, cname: '详情页' }
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment,
      meta: { navShow: false, cname: '支付页' }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: { navShow: true, cname: '订单' }
    }
  ]
})
