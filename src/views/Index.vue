<template>
<div class="index">
  <div class="box" @click="buyClick">
    <div class="box_top">
      <img class="box_logo" src="../assets/images/logo.jpg" alt="logo">
      <span class="box_title">光电项目全年任性做</span>
      <div class="box_top_r">
        <h1>VIP</h1><span>套餐</span>
      </div>
    </div>
    <div class="box_main">
      <p><span>7</span>大科技美肤全年不限次数</p>
    </div>
    <div class="box_bottom">
      <div class="box_text">
        <p style="font-size:12px;color:#999;text-decoration:line-through;">原价：1213.00元</p>
        <p style="font-weight:bold;color:#F7BA2A;">现价：1231.00元</p>
      </div>
      <x-button mini type="primary" style="float: right;">购买</x-button>
    </div>
  </div>
  <divider>我是有底线的</divider>
</div>
</template>

<script>
// import { logo } from '../api.js'
// import { querystring } from 'vux'
import { Divider, XButton } from 'vux'
export default {
  components: {
    Divider,
    XButton
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    buyClick () {
      this.$router.push({
        path: '/details'
      })
    }
  },
  mounted () {
    // logo().then((res) => {
    //
    // })
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
  height: 165px;
  border: 1px solid #999;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 0 15px #999;
}
.box_top{
  padding: 5px;
  line-height: 30px;
}
.box_title{
  padding-left: 5px;
}
.box_logo{
  width: 30px;
  height: 30px;
  float: left;
}
.box_top_r{
  display: inline;
  float: right;
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
    padding: 0 5px;
}
.box_text{
  display: inline-block;
  vertical-align:top;
}
</style>
