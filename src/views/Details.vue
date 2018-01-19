<template lang="html">
  <div>
    <div class="hacker-header">
      <x-header>套餐详情</x-header>
    </div>
    <div class="top_img">
      <img v-if="imgUrl" :src="imgUrl" alt="" width="100%">
    </div>
    <div class="box_title">
      <div style="padding: 0 15px;">
        <span>商品名称巴拉巴拉</span>
        <span style="float:right">销量：88</span>
        <div class="box_price">现价：88.00元<span>原价：100.00元</span></div>
      </div>
    </div>
    <div class="box_center">
      <div style="padding: 0 15px;">
        <span>商品介绍</span>
        <div>vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。

const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
当你使用 history 模式时，URL 就像正常的 url，例如 http://yoursite.com/user/id，也好看！

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

后端配置例子</div>
      </div>
    </div>
    <div class="box_btn">
      <span>888.00元</span>
      <x-button class="btns" type="primary" @click.native="submit">立即支付</x-button>
    </div>
    <divider style="margin-bottom:55px;">我是有底线的</divider>
  </div>
</template>

<script>
import { XButton, Divider, XHeader } from 'vux'
export default {
  components: {
    XButton,
    Divider,
    XHeader
  },
  data () {
    return {
      imgUrl: 'http://fakeimg.pl/300x200/'
    }
  },
  methods: {
    submit () {
      this.$router.push({
        path: '/payment'
      })
    }
  }
}
</script>

<style lang="css">
.top_img{
  width: 100%;
  display: inline-block;
  height: auto;
}
.box_title{
  width: 100%;
  height: 75px;
  background-color: #fff;
}
.box_title{
  font-size: 14px;
  line-height: 36px;
}
.box_title .box_price span{
  font-size: 12px;
  margin-left: 10px;
  color: #999;
  text-decoration: line-through;
}
.box_price{
  color: #f00;
}
.box_center{
  width: 100%;
  background-color: #fff;
  margin-top: 10px;
  line-height: 25px;
}
.box_btn{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 48px;
  background-color: #fff;
  border-top: 1px solid #999;
}
.btns{
  width: 33%!important;
  height: 48px;
  float: right;
  border-radius: 0!important;
  border: none
}
.btns:after{
  border: none;
}
.box_btn span{
  line-height: 48px;
  padding-left: 15px;
  font-size: 18px;
  color: #f00;
}
</style>
