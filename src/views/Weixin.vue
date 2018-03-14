<template lang="html">
  <div class="">
  </div>
</template>
<script>
import { querystring } from 'vux'
import { sendWx } from '../api.js'
export default {
  components: {

  },
  data () {
    return {

    }
  },
  methods: {

  },
  created () {
    let para = querystring.parse()
    let cardOpenId = sessionStorage.getItem('cardOpenId')
    let mpAppid = sessionStorage.getItem('mpAppid')
    para.isInitCode = (!cardOpenId || cardOpenId === '') ? null : '1'
    para.openid = (!cardOpenId || cardOpenId === '') ? '' : cardOpenId
    para.mpAppid = (!mpAppid || mpAppid === '') ? '' : mpAppid
    sendWx(para).then(res => {
      sessionStorage.setItem('cardOpenId', res.data.cardOpenId)
      sessionStorage.setItem('mpAppid', res.data.mpAppid)
      if (res) {
        window.location.href = res.data.getCodeUrl
      }
    })
  },
  mounted () {

  }
}
</script>
