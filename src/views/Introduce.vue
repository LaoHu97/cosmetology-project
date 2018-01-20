<template lang="html">
  <div class="Introduce">
    <div class="Introduce_header">
      <x-header>商家介绍</x-header>
    </div>
    <div class="Introduce_top">
      <swiper :list="demo01_list" dots-position="center" loop auto></swiper>
    </div>
    <div class="Introduce_main">
      <h4>商户介绍</h4>
      <flexbox>
        <flexbox-item :span="4"><div class="flex-demo" style="color:#999">商户名称</div></flexbox-item>
        <flexbox-item><div class="flex-demo">理德雅芙</div></flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item :span="4"><div class="flex-demo" style="color:#999">营业时间</div></flexbox-item>
        <flexbox-item><div class="flex-demo">理德雅芙光电科技皮肤管理中心，是一家以现代高科技光电仪器为操作手段的美肤美体机构。中心有电光调Q，超声刀，水光仪，OPT，热力塑，RF射频，slimming纤体等十余台国际一线品牌美肤仪器。</div></flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item :span="4"><div class="flex-demo" style="color:#999">联系电话</div></flexbox-item>
        <flexbox-item><div class="flex-demo">13289387536</div></flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item :span="4"><div class="flex-demo" style="color:#999">门店列表</div></flexbox-item>
        <flexbox-item>
          <div class="flex-demo">XX店（XX市XX街道）</div>
          <div class="flex-demo">XX店（XX市XX街道）</div>
          <div class="flex-demo">XX店（XX市XX街道）</div>
        </flexbox-item>
      </flexbox>
    </div>
    <divider style="margin-bottom:55px;">我是有底线的</divider>
  </div>
</template>

<script>
import { XHeader, Swiper, Flexbox, FlexboxItem, Divider } from 'vux'
export default {
  components: {
    XHeader,
    Swiper,
    Flexbox,
    FlexboxItem,
    Divider
  },
  data () {
    return {
      demo01_list: [{
        url: 'javascript:',
        img: 'https://static.vux.li/demo/1.jpg'
      }, {
        url: 'javascript:',
        img: 'https://static.vux.li/demo/2.jpg'
      }, {
        url: 'javascript:',
        img: 'https://static.vux.li/demo/3.jpg'
      }]
    }
  }
}
</script>

<style lang="css">
.Introduce_main{
  padding-left: 15px;
}
.Introduce_main h4{
  border-bottom: 1px solid #999;
  padding-bottom: 10px;
}
.flex-demo {
  color: #333;
  font-size: 14px;
  border-radius: 4px;
  background-clip: padding-box;
  line-height: 1.8;
}
.Introduce_main .vux-flexbox{
  align-items: baseline;
}
</style>
