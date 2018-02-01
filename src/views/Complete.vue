<template lang="html">
  <div class="box_view">
    <icon type="success" is-msg></icon>
    <h4>会员卡领取成功</h4>
    <p>请到微信“我-卡包-卡”里查看详情</p>
    <div>
      <x-button type="primary" @click.native="submit">完成</x-button>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import { addCardConfig } from '../api.js'
import { XButton, Icon } from 'vux'
export default {
  components: {
    XButton,
    Icon
  },
  created () {
  },
  methods: {
    submit () {
      wx.closeWindow()
    }
  }
}
</script>

<style lang="css">
.box_view{
  text-align: center;
  margin-top: 50px;
}
.box_view div{
  margin-top: 50px;
  padding: 20px;
}
.box_view p{
  font-size: 14px;
  color: #999;
}
</style>
