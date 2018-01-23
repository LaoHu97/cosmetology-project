<template lang="html">
  <div>
    <div class="hacker-news-list">
      <div class="hacker-news-item">
        <flexbox>
          <flexbox-item>
            <div class="flex-demo flex-demo1">订单金额：<span>123</span>￥</div>
            <div class="flex-demo flex-demo2">
              <i slot="icon" class="iconfont">&#xe6df;</i>
              <span>123</span>
            </div>
            <!-- <div class="flex-demo flex-demo2">赠送金额：<span>123</span>￥</div> -->
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo flex-demo3">订单状态：<span>已完成</span></div>
          </flexbox-item>
        </flexbox>
      </div>
      <!-- <infinite-loading @infinite="onInfinite" ref="infiniteLoading" spinner="spiral">
        <span slot="no-results">
          暂无充值记录 :(
        </span>
        <span slot="no-more">
          没有记录了 :(
        </span>
      </infinite-loading> -->
    </div>
  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
import { Divider, Flexbox, FlexboxItem, XHeader } from 'vux'

export default {
  components: {
    Divider,
    Flexbox,
    FlexboxItem,
    XHeader,
    InfiniteLoading
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    onInfinite () {
      // this.$http.post(COURSES+'/person/queryTransRecord', {
      //   pagNum: String(this.list.length / 10 + 1),
      //   mid: JSON.parse(sessionStorage.getItem('mid')),
      //   card_id: JSON.parse(sessionStorage.getItem('card_id')),
      //   openId: JSON.parse(sessionStorage.getItem('openId')),
      //   numPerPage: '10',
      //   type: 'D'
      // }).then((res) => {
      //   setTimeout(() => {
      //     if (res.data.data.accTransList.length) {
      //       this.list = this.list.concat(res.data.data.accTransList)
      //       this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      //       if (this.list.length === res.data.data.total) {
      //         this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      //       }
      //     } else {
      //       this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      //     }
      //   }, 300)
      // })
    }
  },
  mounted () {

  }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.flex-demo {
  text-align: left;
  color: #000;
  background-clip: padding-box;
  line-height: 30px;
}
.hacker-news-item{
  height: 80px;
  border-bottom: 1px solid #eee;
  padding: 0 0 0 15px;
  background-color: #F9FAFC;
}
.flex-demo1 span{
  color: #F7BA2A;
  font-weight: bolder;
}

.flex-demo2{
  font-size: 14px;
  color: #999;
}
.flex-demo2 span{

}
.flex-demo3{
  text-align: right;
  line-height: 80px;
  font-size: 16px;
  margin-right: 15px;
}
.flex-demo3 span{
  color: #F7BA2A;
}
</style>
