<template>
<div class="index">
  <!-- <div class="box" @click="buyClick(item.id)" v-for="item in productList" :key='item.id' v-bind:style="{ background: 'url('+item.small_url+')' + ' 0% 0% / 100% 100% no-repeat' }"> -->
  <div class="box" @click="buyClick(item.id)" v-for="item in productList" :key='item.id'>
    <img :src="item.small_url" alt="套餐图" width="100%">
    <!-- <div class="box_top">
      <img class="box_logo" src="../assets/images/logo.jpg" alt="logo">
      <span class="box_title">{{item.pkg_name}}</span>
      <div class="box_top_r">
        <h1>VIP</h1><span>套餐</span>
      </div>
    </div>
    <div class="box_main">
      <p><span>7</span>大科技美肤全年不限次数</p>
    </div>
    <div class="box_bottom">
      <div class="box_text">
        <p style="font-size:12px;color:#999;text-decoration:line-through;">原价：{{item.oprice}}元</p>
        <p style="font-weight:bold;color:#F7BA2A;">现价：{{item.price}}元</p>
      </div>
      <x-button mini type="primary" style="position:absolute;bottom:38px;left:48px;">购买</x-button>
    </div> -->
    <div class="box_bottom">
      <div class="box_text">
        <p style="font-size:12px;color:#999;text-decoration:line-through;">原价：{{item.oprice}}元</p>
        <p style="font-weight:bold;color:#531C79;">现价：{{item.price}}元</p>
      </div>
      <x-button mini type="primary" style="float:right;margin-top:8px;">购买</x-button>
    </div>
  </div>
  <divider style="margin-bottom:55px;">万鼎科技 技术支持</divider>
</div>
</template>

<script>
import { initMemProduct } from '../api.js'
import { querystring, Divider, XButton } from 'vux'
export default {
  components: {
    Divider,
    XButton
  },
  data () {
    return {
      productList: []
    }
  },
  created () {
    this.Initialization()
    window.addEventListener('popstate', function (e) {
      self.location.reload()
    }, false)
  },
  methods: {
    buyClick (data) {
      sessionStorage.setItem('pkg_id', data)
      this.$router.push({
        path: '/details'
      })
    },
    Initialization () {
      let para = querystring.parse()
      console.log(para)
      let payOpenId = sessionStorage.getItem('payOpenId')
      para.isInitCode = (!payOpenId || payOpenId === '') ? null : '1'
      para.openCode = para.code
      if (para.model === 'FT') {
        para.payOpenId = para.openid
      } else {
        para.payOpenId = payOpenId
      }
      initMemProduct(para).then((res) => {
        if (res.status === 200) {
          this.productList = res.data.productList
          window.document.title = res.data.malias
          sessionStorage.setItem('payData', JSON.stringify(res.data))
          sessionStorage.setItem('payOpenId', res.data.payOpenId)
        }
      })
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.index{
  padding: 15px;
}
.box {
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
}
.box img{
  border-radius: 12px;
}
.box_top{
  padding: 5px 0 5px 45px;
  line-height: 30px;
}
.box_title{
  padding-left: 5px;
  background: none;
}
.box_logo{
  width: 30px;
  height: 30px;
  float: left;
}
.box_top_r{
  display: inline;
}
.box_top_r h1{
  display: inline;
  font-weight: bold;
  color: #F7BA2A;
  margin-right: 5px;
}
.box_top_r span{
  font-size: 12px;
  border: 1px solid #F7BA2A;
  color: #F7BA2A;
  border-radius: 3px;
  padding: 1px;
  position: relative;
  top: -10px;
}
.box_main{
  padding: 10px;

}
.box_main p{
  line-height: 50px;
  text-align: center;
}
.box_main p span{
  font-size: 45px;
  font-weight: bold;
  background-color: #F7BA2A;
  color: #fff;
  width: 50px;
  height: 50px;
  display: inline-block;
  text-align: center;
  border-radius: 1000px;
  vertical-align:top;
}
.box_bottom{
  width: 100%;
}
.box_text{
  display: inline-block;
  vertical-align:top;
}
</style>
