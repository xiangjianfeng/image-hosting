<template>
  <div class="main">
    <div class="main-box">
      <div class="img-wrapper">
        <img :src="qrcode" class="qr-code" v-show="qrcode">
      </div>
    </div>
    <div class="text">{{errorText}}</div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      qrcode: '',
      errorText: '请使用微信扫描二维码登录'
    }
  },
  mounted() {
    this.getQrCode()
  },
  methods: {
    //获取登陆二维码
    getQrCode() {
      axios.get('/wechat/login/getqrcode').then(response => {
        if (response.status == 200) {
          this.qrcode = response.data.result.imgData
          let uuid = response.data.result.wxUUID
          this.getcode(uuid)
        }
      })
    },

    //获取code
    getcode(uuid, last) {
      let _this = this
      axios
        .get(
          '/wechat/login/getcode?uuid=' +
            uuid +
            (last ? '&last=' + last : '')
        )
        .then(response => {
          // console.log(response)
          if (response.status == 200) {
            switch (response.data.status) {
              case 405:
                _this.errorText = '登陆成功'
                _this.getUnionid(response.data.result.code)
                break

              case 404:
                _this.errorText =
                  response.data.msg.title + ', ' + response.data.msg.content
                _this.getcode(uuid, response.data.result.wxErrCode)
                break

              case 403:
                _this.errorText =
                  response.data.msg.title + ', ' + response.data.msg.content
                _this.getcode(uuid, response.data.result.wxErrCode)
                break

              case 500:
                _this.getQrCode()
                break

              default:
                setTimeout(function() {
                  _this.getcode(uuid)
                }, 2000)
                break
            }
          }
        })
    },

    //获取用户unionid
    getUnionid(code) {
      let _this = this
      axios
        .get('/wechat/login/getunionid?code=' + code)
        .then(response => {
          if (response.status === 200) {
            //读取微信用户信息
            //如果数据库中有了就直接返回数据，无则添加用户信息
            //console.log(response.data)
            axios
              .post('/img/user/info', {
                openid: response.data.openid,
                unionid: response.data.unionid,
                nickname: response.data.nickname,
                headimgurl: response.data.headimgurl
              })
              .then(res => {
                //console.log(res)
                localStorage.setItem('JUE_TOKEN', res.data.token)
                let redirect = _this.$route.query.redirect
                  ? _this.$route.query.redirect
                  : '/'
                _this.$router.push({ path: redirect })
              })
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.main-box {
  .img-wrapper {
    width: 150px;
    height: 150px;
    background: url('https://sm.ms/img/loading.gif') no-repeat center center;
  }
  .qr-code {
    width: 100%;
  }
}
.text {
  padding-top: 20px;
}
</style>

