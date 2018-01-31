<template>
<div id="app">
  <div class="header" v-show="$route.meta.headerShow">
    <x-header>{{$route.name}}</x-header>
  </div>
  <!-- <transition name="slide-fade"> -->
    <router-view/>
  <!-- </transition> -->
  <tabbar style="position:fixed" v-show="$route.meta.navShow">
    <tabbar-item link="/" :selected="$route.path == '/'">
      <i slot="icon" class="iconfont">&#xe622;</i>
      <span slot="label">套餐</span>
    </tabbar-item>
    <tabbar-item link="/introduce" :selected="$route.path == '/introduce'">
      <i slot="icon" class="iconfont">&#xe6de;</i>
      <span slot="label">介绍</span>
    </tabbar-item>
  </tabbar>
  <div v-transfer-dom>
    <loading :show="loadingShow" text="请稍后"></loading>
    <alert v-model="alertShow" title="提示" @on-hide="onHide">{{alertText}}</alert>
  </div>
</div>
</template>

<script>
import Bus from './bus.js'
import { Tabbar, TabbarItem, Loading, XHeader, Alert, TransferDomDirective as TransferDom } from 'vux'
export default {
  name: 'App',
  directives: {
    TransferDom
  },
  components: {
    Tabbar,
    TabbarItem,
    Loading,
    XHeader,
    Alert
  },
  data () {
    return {
      loadingShow: false,
      alertShow: false,
      alertText: ''
    }
  },
  created () {
    Bus.$on('loadingState', boolean => {
      this.loadingShow = boolean
    })
    Bus.$on('alertState', alertStateMap => {
      this.alertShow = alertStateMap.boolean
      this.alertText = alertStateMap.message
    })
  },
  methods: {
    onHide () {

    }
  }
}
</script>

<style>
#app {
  color: #2c3e50;
  height: 100%;
}
@font-face {
  font-family: 'iconfont';  /* project id 302321 */
  src: url('//at.alicdn.com/t/font_302321_r8td9l7twwvr6bt9.eot');
  src: url('//at.alicdn.com/t/font_302321_r8td9l7twwvr6bt9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_302321_r8td9l7twwvr6bt9.woff') format('woff'),
  url('//at.alicdn.com/t/font_302321_r8td9l7twwvr6bt9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_302321_r8td9l7twwvr6bt9.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
p{
  margin: 0;
}
img{
  display: block;
}
a{
  text-decoration: none;
}
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
