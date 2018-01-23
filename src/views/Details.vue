<template lang="html">
  <div>
    <div class="top_img">
      <swiper :list="img_list" dots-position="center" loop auto :show-desc-mask="false"></swiper>
    </div>
    <div class="box_title">
      <div style="padding: 0 15px;">
        <span>{{pkgProduct.pkg_name}}</span>
        <span style="float:right">销量：{{pkgProduct.sale_count}}</span>
        <div class="box_price">现价：{{pkgProduct.price}}元<span>原价：{{pkgProduct.oprice}}元</span></div>
      </div>
    </div>
    <div class="box_center">
      <div style="padding: 0 15px;">
        <span>套餐介绍</span>
        <div>{{pkgProduct.pkg_desc}}</div>
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
import { prepayInfo, updateInviter, queryPckDetail, receiveCardAfter } from '../api.js'
import { XButton, Divider, XHeader, Swiper, Flexbox, FlexboxItem } from 'vux'
export default {
  components: {
    XButton,
    Divider,
    XHeader,
    Swiper,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      pkgProduct: [],
      img_list: []
    }
  },
  created () {
    this.queryDetail()
  },
  methods: {
    queryDetail () {
      let para = {
        pkg_id: sessionStorage.getItem('pkg_id')
      }
      queryPckDetail(para).then((res) => {
        this.pkgProduct = res.data.pkgProduct
        this.img_list = res.data.picUrlList
      })
    },
    wxAddCard (cb) {
      let payData = JSON.parse(sessionStorage.getItem('payData'))
      let para = {
        mid: String(payData.mid),
        purchaseId: String(cb),
        ive: String(payData.ive),
        ivr: String(payData.ivr),
        sc: String(payData.source)
      }
      updateInviter(para).then((res) => {
        var cardExtdata = {
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
              isSuccess: res.cardList[0].isSuccess
            }
            receiveCardAfter(para).then((res) => {
              alert('123')
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
        cardOpenId: '',
        pkg_id: String(sessionStorage.getItem('pkg_id')),
        pkg_name: 'A套餐',
        nick_name: '',
        source: String(payData.source),
        invita_id: String(payData.invita_id),
        desc: '',
        type: '1',
        scene: 'W',
        ivr: String(payData.ivr),
        ive: String(payData.ive),
        url: window.location.href.split('#')[0]
      }
      prepayInfo(para).then((res) => {
        var _this = this
        let { status, data } = res
        if (status === 200) {
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.configSign, // 必填，签名，见附录1
            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          wx.ready(function () {
            wx.chooseWXPay({
              timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
              package: data.packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: data.paySign, // 支付签名
              success: function (res) {
                // 支付成功后的回调函数
                _this.wxAddCard(data.purchaseId)
              },
              fail: function (res) {
                _this.$vux.toast.show({
                  text: '支付失败',
                  type: 'warn',
                  time: 4000,
                  isShowMask: true
                })
              },
              cancel: function (res) {
                _this.$vux.toast.show({
                  text: '取消支付',
                  type: 'warn',
                  time: 4000,
                  isShowMask: true
                })
              }
            })
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
