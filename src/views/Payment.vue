<template lang="html">
  <div class="">
    <div class="hacker-header">
      <x-header>支付完成</x-header>
    </div>
    <div class="box_view">
      <icon type="success" is-msg></icon>
      <h4>支付成功</h4>
      <span>支付金额</span>
      <p>88.00元</p>
      <div><x-button type="primary" @click.native="submit">完成</x-button></div>
    </div>
  </div>
</template>

<script>
import { XButton, Icon, XHeader } from 'vux'
export default {
  components: {
    XButton,
    Icon,
    XHeader
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
