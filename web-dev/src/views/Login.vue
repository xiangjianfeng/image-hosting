<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <div class="img-wrapper">
          <img :src="qrcode" v-show="qrcode" class="qr-code">
        </div>
        
      </div>
      <div class="text">{{errorText}}</div>
    </div>
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
        .get(
          'https://api.jue.sh/wechat/login/getcode?uuid=' +
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
        .get('https://api.jue.sh/wechat/login/getunionid?code=' + code)
        .then(response => {
          if (response.status === 200) {
            //读取微信用户信息
            //如果数据库中有了就直接返回数据，无则添加用户信息
            // console.log(response.data)
            axios
              .post('https://api.jue.sh/juetool/user/info', {
                openid: response.data.openid,
                unionid: response.data.unionid,
                nickname: response.data.nickname,
                headimgurl: response.data.headimgurl
              })
              .then(res => {
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
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: none;
}
.none {
  display: none;
}
::-webkit-scrollbar {
  display: none;
}
html {
  font-weight: 200;
  scroll-behavior: smooth;
}
body {
  color: #101010;
  font: 13px/1.5 -apple-system, BlinkMacSystemFont, SF Pro Text, segoe ui,
    helvetica neue, helvetica, ubuntu, roboto, noto, arial, sans-serif;
}
[data-tooltip] {
  position: relative;
  &:before,
  &:after {
    text-transform: none;
    font-size: 12px;
    line-height: 1;
    user-select: none;
    pointer-events: none;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 3px);
  }
  &:before {
    content: ' ';
    border: 1rem solid transparent;
    top: 100%;
    border-top-width: 0;
    border-bottom-color: #333;
  }
  &:after {
    content: attr(data-tooltip);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 7px 10px;
    border-radius: 0.3rem;
    box-shadow: 0 1em 2em -0.5em rgba(0, 0, 0, 0.35);
    background: #333;
    color: #fff;
    z-index: 1000; /* absurdity 2 */
    top: calc(100% + 5px);
  }
}
img {
  max-width: 100%;
  vertical-align: middle;
}
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(249, 249, 250, 1);
}
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

.main {
  .img-wrapper{
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

