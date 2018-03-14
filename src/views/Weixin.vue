<template lang="html">
  <div class="">
  </div>
</template>
<script>
// import { querystring } from 'vux'
// import { sendWx } from '../api.js'
export default {
  components: {

  },
  data () {
    return {

    }
  },
  created () {
    // 显示
    this.$vux.loading.show({
      text: '请稍候'
    })
  },
  mounted () {
    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2cc486f43753d093&redirect_uri=http%3A%2F%2Ftest.weupay.com%2Fpay%2Fcard%2Fmer%2Fldyf%2Fdist%2Findex.html%3FcardOpenId%3DoJ5X0wMPubMHn0QR2fp_Ba_FS5ts%26mid%3D66%26eid%3D66%26sid%3D49%26source%3DMP%26fsid%3D40&response_type=code&scope=snsapi_base&state=123456#wechat_redirect'
  }
}
</script>
