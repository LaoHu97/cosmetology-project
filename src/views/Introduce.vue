<template lang="html">
  <div class="Introduce">
    <div class="Introduce_top">
      <swiper :list="img_list" dots-position="center" loop auto :show-desc-mask="false"></swiper>
    </div>
    <div class="Introduce_main">
      <h4>商户介绍</h4>
      <flexbox>
        <flexbox-item :span="4"><div class="flex-demo" style="color:#999">商户名称</div></flexbox-item>
        <flexbox-item><div class="flex-demo">{{introduce.mer_name}}</div></flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item :span="4"><div class="flex-demo" style="color:#999">商户介绍</div></flexbox-item>
        <flexbox-item><div class="flex-demo">{{introduce.introduction}}</div></flexbox-item>
      </flexbox>
      <!-- <flexbox>
        <flexbox-item :span="4"><div class="flex-demo" style="color:#999">营业时间</div></flexbox-item>
        <flexbox-item><div class="flex-demo">牌美肤仪器。</div></flexbox-item>
      </flexbox> -->
      <flexbox>
        <flexbox-item :span="4"><div class="flex-demo" style="color:#999">联系电话</div></flexbox-item>
        <flexbox-item><div class="flex-demo">{{introduce.phone}}</div></flexbox-item>
      </flexbox>
      <!-- <flexbox>
        <flexbox-item :span="4"><div class="flex-demo" style="color:#999">门店列表</div></flexbox-item>
        <flexbox-item>
          <div class="flex-demo">XX店（XX市XX街道）</div>
          <div class="flex-demo">XX店（XX市XX街道）</div>
          <div class="flex-demo">XX店（XX市XX街道）</div>
        </flexbox-item>
      </flexbox> -->
    </div>
    <divider style="margin-bottom:55px;">我是有底线的</divider>
  </div>
</template>

<script>
import { getMerIntroductionByMId } from '../api.js'
import { Swiper, Flexbox, FlexboxItem, Divider } from 'vux'
export default {
  components: {
    Swiper,
    Flexbox,
    FlexboxItem,
    Divider
  },
  data () {
    return {
      img_list: [],
      introduce: {}
    }
  },
  created () {
    this.getMerIntroduction()
  },
  methods: {
    getMerIntroduction () {
      let payData = JSON.parse(sessionStorage.getItem('payData'))
      let para = {
        mid: String(payData.mid)
      }
      getMerIntroductionByMId(para).then((res) => {
        this.introduce = res.data
        this.img_list = res.data.urlList
      })
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
