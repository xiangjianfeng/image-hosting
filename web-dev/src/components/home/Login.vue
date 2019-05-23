<template>
  <div class="container">
    <div class="main">
      <img :src="qrcode" class="qr-code">
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
      axios.get('https://api.jue.sh/wechat/login/getqrcode').then(response => {
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
        .get('https://api.jue.sh/wechat/login/getcode?uuid=' + uuid + (last ? '&last=' + last : ''))
        .then(response => {
          // console.log(response)
          if (response.status == 200) {
            switch (response.data.status) {
              case 405:
                _this.errorText = '登陆成功'
                _this.getUnionid(response.data.result.code)
                break;

              case 404:
                _this.errorText = response.data.msg.title + ', ' + response.data.msg.content
                _this.getcode(uuid, response.data.result.wxErrCode)
                break;

              case 403:
                _this.errorText = response.data.msg.title + ', ' + response.data.msg.content
                _this.getcode(uuid, response.data.result.wxErrCode)
                break;

              case 500:
                _this.getQrCode()
                break;
              
              default:
                setTimeout(function () {
                  _this.getcode(uuid)
                }, 2000);
                break;
            }
          }
        })
    },

    //获取用户unionid
    getUnionid(code){
      axios.get('https://api.jue.sh/wechat/login/getunionid?code='+code).then(response => {
        if (response.status == 200) {
          console.log(response)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 430px;
  height: 330px;
  background: #fff url(https://filecdn.jue.sh/box/imgs/bg.svg);
  background-size: 110%;
  background-repeat: no-repeat;
  background-position: top;
  box-shadow: 0 0 32px 0 rgba(12, 12, 13, 0.1),
    0 2px 16px 0 rgba(12, 12, 13, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.main{
  .qr-code{
    width: 150px;
    height: 150px;
    background: #000;
  }
}
.text{
  padding-top: 20px;
}
</style>

