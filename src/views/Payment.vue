<template lang="html">
  <div class="">
    <group title="支付方式">
      <radio :options="radioOptions" value="微信支付" disabled></radio>
    </group>
    <group title="非必填项">
      <x-input title="邀请码" v-model="invitationCode" placeholder="请输入邀请码" novalidate :show-clear="false" placeholder-align="right" text-align="center"></x-input>
    </group>
    <box gap="35px 10px">
      <x-button type="primary" @click.native="submit">确认支付</x-button>
    </box>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import { prepayInfo, updateInviter } from '../api.js'
import { XButton, Icon, XHeader, XInput, Group, Radio, Box } from 'vux'
export default {
  components: {
    XButton,
    Icon,
    XHeader,
    XInput,
    Group,
    Radio,
    Box
  },
  data () {
    return {
      radioOptions: [ '微信支付' ],
      invitationCode: ''
    }
  },
  created () {
    console.log(this.$route.params.amount)
    console.log(this.$route.params.pkg_name)
    // this.wxConfig()
  },
  methods: {
    wxAddCard (data) {
      let para = {
        mid: String(data.mid),
        purchaseId: String(data.purchaseId),
        ive: data.ive,
        ivr: data.ivr,
        sc: String(data.source),
        url: window.location.href.split('#')[0]
      }
      para.ivr = para.ivr == null ? para.ivr : String(para.ivr)
      para.ive = para.ive == null ? para.ive : String(para.ive)
      updateInviter(para).then((res) => {
        let _this = this
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.configinfo.appId, // 必填，公众号的唯一标识
          timestamp: res.data.configinfo.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.configinfo.noncestr, // 必填，生成签名的随机串
          signature: res.data.configinfo.configSign, // 必填，签名，见附录1
          jsApiList: ['addCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.ready(function () {
          let cardExtdata = {
            signature: res.data.cardMap.signature,
            nonce_str: res.data.cardMap.nonce_str,
            timestamp: res.data.cardMap.timestamp,
            outer_str: res.data.cardMap.outer_str
          }
          wx.addCard({
            cardList: [{
              cardId: res.data.cardMap.card_id,
              cardExt: JSON.stringify(cardExtdata)
            }], // 需要添加的卡券列表
            success: function (res) {
              _this.$router.push({
                path: '/complete'
              })
            }
          })
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        })
        wx.error(function (res) {
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        })
      })
    },
    submit () {
      let payData = JSON.parse(sessionStorage.getItem('payData'))
      let para = {
        amount: String(this.$route.params.amount),
        mid: String(payData.mid),
        eid: String(payData.eId),
        sid: String(payData.storeId),
        oid: String(payData.payOpenId),
        cardCode: '',
        cardId: '',
        cardOpenId: String(payData.cardOpenId),
        pkg_id: String(sessionStorage.getItem('pkg_id')),
        pkg_name: this.$route.params.pkg_name,
        nick_name: '',
        source: String(payData.source),
        desc: '',
        type: '1',
        scene: 'W',
        ivr: payData.ivr,
        ive: payData.ive,
        inviterCode: this.invitationCode,
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
              let payData = {
                mid: data.mid,
                purchaseId: data.purchaseId,
                ivr: data.ivr,
                ive: data.ive,
                sc: data.sc
              }
              _this.wxAddCard(payData)
            }
          })
        }
      })
    }
  },
  mounted () {
    let payData = JSON.parse(sessionStorage.getItem('payData'))
    this.invitationCode = payData.inviterCode
  }
}
</script>

<style lang="css">
.box_view{
  text-align: center;
  margin-top: 50px;
  line-height: 1.5;
  color: #666;
}
.box_view span{
  font-size: 14px;
  margin-top: 25px;
  border-top: 1px #999 dashed;
  display: block;
  padding-top: 15px;
}
.box_view p{
  margin-bottom: 25px;
  border-bottom: 1px #999 dashed;
  padding-bottom: 10px;
  font-weight: bold;
}
.box_view div{
  padding: 50px 15px;
}
</style>
