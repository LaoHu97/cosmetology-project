<template lang="html">
  <div>
    <!-- <div class="top_img">
      <swiper :list="img_list" :aspect-ratio="650/1000" dots-position="center" loop auto :show-desc-mask="false"></swiper>
    </div>
    <div class="box_title">
      <div style="padding: 0 15px;">
        <span>{{pkgProduct.pkg_name}}</span>
        <span style="float:right">销量：{{pkgProduct.sale_count}}</span>
        <div class="box_price">现价：{{pkgProduct.price}}元<span>原价：{{pkgProduct.oprice}}元</span></div>
      </div>
    </div> -->
    <div class="box_center">
      <div>
        <div v-for="src in list" :key='src.img' style="background-color: #eee;text-align:center; position: relative;">
          <div class="box_load_more">
            <load-more :show-loading="true" tip="正在加载" background-color="#fbf9fe"></load-more>
          </div>
          <x-img :src="src.img" @on-error="imgError" @on-success="imgSuccess" class="box_center_img" error-class="ximg-error" :offset="-100"></x-img>
        </div>
      </div>
    </div>
    <divider style="margin-bottom:55px;">我是有底线的</divider>
    <flexbox class="box_btn">
      <flexbox-item><span>{{pkgProduct.price}}元</span></flexbox-item>
      <flexbox-item  :span="4"><x-button class="btns" type="primary" @click.native="submit">立即支付</x-button></flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { queryPckDetail } from '../api.js'
import { XButton, Divider, XHeader, Swiper, Flexbox, FlexboxItem, XImg, LoadMore } from 'vux'
export default {
  components: {
    XButton,
    Divider,
    XHeader,
    Swiper,
    Flexbox,
    FlexboxItem,
    XImg,
    LoadMore
  },
  data () {
    return {
      pkgProduct: [],
      img_list: [],
      list: []
    }
  },
  created () {
    this.queryDetail()
  },
  methods: {
    imgSuccess (src, ele) {
      const div = ele.parentNode.querySelector('div')
      ele.parentNode.removeChild(div)
    },
    imgError (src, ele) {
      console.log('图片加载失败', src)
      const span = ele.parentNode.querySelector('div span')
      span.innerText = '图片加载失败'
      const i = ele.parentNode.querySelector('div i')
      const romve = ele.parentNode.querySelector('div .vux-loadmore')
      romve.removeChild(i)
      romve.className = 'vux-loadmore weui-loadmore weui-loadmore_line'
    },
    queryDetail () {
      let para = {
        pkg_id: sessionStorage.getItem('pkg_id')
      }
      queryPckDetail(para).then((res) => {
        this.pkgProduct = res.data.pkgProduct
        this.img_list = res.data.picUrlList
        this.list = res.data.imgDetailList
      })
    },
    submit () {
      this.$router.push({
        name: '支付',
        params: {
          amount: this.pkgProduct.price,
          pkg_name: this.pkgProduct.pkg_name
        }
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="css">
.box_center_img {
  width: 100%;
  height: auto;
}
.ximg-error {
  background-color: yellow;
  background-color: transparent;
}
.ximg-error:after {
  content: '加载失败';
  color: red;
}
.box_load_more{
  width: 100%;
  position: absolute;
}
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
  height: 48px;
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
