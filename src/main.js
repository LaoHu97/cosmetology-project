// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { ToastPlugin, LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.config.productionTip = false

const FastClick = require('fastclick')
FastClick.attach(document.body)

router.beforeEach(function (to, from, next) {
  next()
})

router.afterEach(function (to) {

})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
