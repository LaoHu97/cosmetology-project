<template lang="html">
  <div>
    <div class="top_img">
      <swiper :list="img_list" dots-position="center" loop auto :show-desc-mask="false"></swiper>
    </div>
    <div class="box_title">
      <div style="padding: 0 15px;">
        <span>{{pkgProduct.pkg_name}}</span>
        <!-- <span style="float:right">销量：{{pkgProduct.sale_count}}</span> -->
        <div class="box_price">现价：{{pkgProduct.price}}元<span>原价：{{pkgProduct.oprice}}元</span></div>
      </div>
    </div>
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
import wx from 'weixin-js-sdk'
import { prepayInfo, updateInviter, queryPckDetail, receiveCardAfter, addCardConfig } from '../api.js'
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
    this.wxConfig()
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
    wxConfig () {
      let payData = JSON.parse(sessionStorage.getItem('payData'))
      let para = {
        mid: String(payData.mid),
        url: window.location.href.split('#')[0]
      }
      addCardConfig(para).then((res) => {
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.configinfo.appId, // 必填，公众号的唯一标识
          timestamp: res.data.configinfo.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.configinfo.noncestr, // 必填，生成签名的随机串
          signature: res.data.configinfo.configSign, // 必填，签名，见附录1
          jsApiList: ['addCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.ready(function () {
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        })
        wx.error(function (res) {
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        })
      })
    },
    wxAddCard (cb) {
      let payData = JSON.parse(sessionStorage.getItem('payData'))
      let para = {
        mid: String(payData.mid),
        purchaseId: String(cb),
        ive: payData.ive,
        ivr: payData.ivr,
        sc: String(payData.source)
      }
      para.ivr = para.ivr == null ? para.ivr : String(para.ivr)
      para.ive = para.ive == null ? para.ive : String(para.ive)
      updateInviter(para).then((res) => {
        let cardExtdata = {
          signature: res.data.signature,
          nonce_str: res.data.nonce_str,
          timestamp: res.data.timestamp,
          outer_str: res.data.outer_str
        }
        let purchaseId = res.data.purchaseId
        wx.addCard({
          cardList: [{
            cardId: res.data.card_id,
            cardExt: JSON.stringify(cardExtdata)
          }], // 需要添加的卡券列表
          success: function (res) {
            let payData = JSON.parse(sessionStorage.getItem('payData'))
            let para = {
              mid: String(payData.mid),
              ive: String(payData.ive),
              purchaseId: purchaseId,
              cardCode: res.cardList[0].code,
              cardid: res.cardList[0].cardId,
              isSuccess: res.cardList[0].isSuccess,
              res: res
            }
            receiveCardAfter(para).then((res) => {
              alert('通知领卡成功')
            })
          }
        })
      })
    },
    submit () {
      let payData = JSON.parse(sessionStorage.getItem('payData'))
      let para = {
        amount: String(this.pkgProduct.price),
        mid: String(payData.mid),
        eid: String(payData.eId),
        sid: String(payData.storeId),
        oid: String(payData.payOpenId),
        cardCode: '',
        cardId: '',
        cardOpenId: String(payData.cardOpenId),
        pkg_id: String(sessionStorage.getItem('pkg_id')),
        pkg_name: this.pkgProduct.pkg_name,
        nick_name: '',
        source: String(payData.source),
        desc: '',
        type: '1',
        scene: 'W',
        ivr: payData.ivr,
        ive: payData.ive,
        url: window.location.href.split('#')[0]
      }
      para.ivr = para.ivr == null ? para.ivr : String(para.ivr)
      para.ive = para.ive == null ? para.ive : String(para.ive)
      prepayInfo(para).then((res) => {
        var _this = this
        let { status, data } = res
        if (status === 200) {
          /* eslint-disable */
          WeixinJSBridge.invoke('getBrandWCPayRequest', {
            "appId": data.appId,//公众号名称，由商户传入
            "timeStamp": data.timeStamp,//时间戳，自1970年以来的秒数
            "nonceStr": data.nonceStr,//随机串
            "package": data.packages,
            "signType": data.signType,//微信签名方式：
            "paySign": data.paySign//微信签名
          },function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok" ){
              _this.wxAddCard(data.purchaseId)
            }
          })
        } else {
          _this.$vux.toast.show({
            text: '下单失败',
            type: 'warn',
            time: 4000,
            isShowMask: true
          })
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
