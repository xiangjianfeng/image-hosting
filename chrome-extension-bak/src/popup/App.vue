<template>
  <div id="app">
    <div class="container">
      <div class="upload-wrapper">
        <div :class="status" class="upload-area">
          <svg
            class="upload-progress"
            height="100%"
            style="transform: rotate(-90deg);"
            width="100%"
          >
            <circle cx="50%" cy="50%" fill="none" r="36" stroke="#c7cfd7" stroke-width="4"></circle>
            <circle
              :stroke-dasharray="value1 + ' ' + value2"
              cx="50%"
              cy="50%"
              fill="none"
              id="progress"
              r="36"
              stroke="#0075ff"
              stroke-dashoffset="0%"
              stroke-width="4"
            ></circle>
          </svg>

          <svg
            class="upload-icon"
            v-if="status == 'wait'"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M554.666667 268.8v601.6h-85.333334V268.8L337.066667 401.066667 277.333333 341.333333 512 106.666667 746.666667 341.333333l-59.733334 59.733334L554.666667 268.8z"
              fill="#0075ff"
            ></path>
          </svg>

          <svg
            class="upload-icon"
            v-if="status == 'uploading'"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M422.4 704l-94.72-143.36c-15.36-23.04-46.08-30.72-71.68-15.36l-15.36 15.36-130.56 204.8c-12.8 25.6-7.68 56.32 17.92 71.68 7.68 5.12 17.92 7.68 25.6 7.68h256c28.16 0 51.2-23.04 51.2-51.2 0-7.68-2.56-15.36-5.12-23.04l-33.28-66.56z"
              fill="#A5C8F4"
              p-id="2783"
            ></path>
            <path
              d="M307.2 358.4c-43.52 0-76.8-33.28-76.8-76.8s33.28-76.8 76.8-76.8 76.8 33.28 76.8 76.8-33.28 76.8-76.8 76.8z m327.68-33.28c5.12-7.68 12.8-15.36 20.48-17.92 25.6-12.8 56.32 0 69.12 23.04L944.64 793.6c2.56 7.68 5.12 15.36 5.12 23.04 0 28.16-23.04 51.2-51.2 51.2H378.88c-10.24 0-20.48-2.56-30.72-10.24-23.04-15.36-28.16-48.64-12.8-71.68l56.32-79.36 243.2-381.44z"
              fill="#2589FF"
              p-id="2784"
            ></path>
          </svg>

          <svg
            class="upload-icon"
            v-if="status == 'done'"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M392.533333 806.4L85.333333 503.466667l59.733334-59.733334 247.466666 247.466667L866.133333 213.333333l59.733334 59.733334L392.533333 806.4z"
              fill="#0075ff"
            ></path>
          </svg>
        </div>
      </div>
      <div class="main" v-show="imgUrl == ''">
        <div class="text">选择上传或直接粘贴图片文件</div>
        <div class="upload-btn">
          <input
            @change="uploadInputchange"
            accept="image/*"
            class="none"
            id="file-upload"
            type="file"
          >
          <label for="file-upload">选择文件</label>
        </div>
      </div>
      <div class="main" v-show="imgUrl">
        <div class="text">复制下面的图片地址 或者 取消重新上传</div>
        <div class="copy-url">
          <div class="input-group">
            <input @focus="focus($event)" class="input-sm" readonly type="text" v-model="imgUrl">
            <div
              :data-clipboard-text="imgUrl"
              @click="copySuccess"
              class="input-group-button"
              ref="copy"
            >
              <svg
                aria-hidden="true"
                class="octicon octicon-clippy"
                height="16"
                version="1.1"
                viewBox="0 0 14 16"
                width="14"
              >
                <path
                  d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div @click="setDefault" class="re-upload">
            <svg height="26" viewBox="0 0 1024 1024" width="26" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M396.8 200.533333l64 64L384 341.333333h298.666667c119.466667 0 213.333333 93.866667 213.333333 213.333334s-93.866667 213.333333-213.333333 213.333333H298.666667v-85.333333h384c72.533333 0 128-55.466667 128-128s-55.466667-128-128-128H170.666667l226.133333-226.133334z"
                fill="#d73a49"
                p-id="7650"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { setTimeout } from 'timers'
export default {
  name: 'app',
  data() {
    return {
      percent: 0,
      value1: 0,
      value2: 1,
      imgUrl: '',
      uptoken: null,
      status: 'wait',
      copyBtn: null
    }
  },
  computed: {
    perimeter: function() {
      return 36 * 2 * Math.PI
    }
  },
  mounted() {
    this.getUpToken()
    this.pasteUpload()
    this.copyBtn = new this.clipboard(this.$refs.copy)
  },
  methods: {
    setDefault() {
      this.percent = 0
      this.value1 = 0
      this.value2 = 0
      this.imgUrl = ''
      this.status = 'wait'
    },
    getUpToken() {
      axios.get('https://api.jue.sh/qiniu/qiniu/token').then(response => {
        if (response.status == 200) {
          this.uptoken = response.data.upload_token
        }
      })
    },
    copySuccess() {
      this.copyBtn.on('success', e => {
        e.trigger.setAttribute('data-tooltip', '已复制')
        setTimeout(() => {
          e.trigger.removeAttribute('data-tooltip')
        }, 800)
      })
    },
    focus(event) {
      event.currentTarget.select()
    },
    pasteUpload() {
      //粘贴上传
      document.addEventListener('paste', e => {
        this.setDefault()
        for (let i = 0; i < e.clipboardData.items.length; i++) {
          if (
            e.clipboardData.items[i].kind == 'file' &&
            /image\//.test(e.clipboardData.items[i].type)
          ) {
            let file = e.clipboardData.items[i].getAsFile()
            this.uploadImgToQiniu(file)
            e.preventDefault()
            break
          }
        }
      })
    },

    getFileExt(fileName) {
      return fileName.substring(fileName.lastIndexOf('.') + 1)
    },
    uploadInputchange() {
      let file = document.getElementById('file-upload').files[0]
      this.uploadImgToQiniu(file)
    },
    uploadImgToQiniu(file) {
      const axiosInstance = axios.create({ withCredentials: false }) //withCredentials 禁止携带cookie，带cookie在七牛上有可能出现跨域问题
      let data = new FormData()
      data.append('token', this.uptoken) //七牛需要的token，叫后台给，是七牛账号密码等组成的hash
      data.append('file', file)
      data.append(
        'key',
        new Date().getTime() + '.' + this.getFileExt(file.name)
      )
      axiosInstance({
        method: 'POST',
        url: 'https://upload.qbox.me', //上传地址
        data: data,
        onUploadProgress: progressEvent => {
          this.status = 'uploading'
          this.percent =
            ((progressEvent.loaded * 100) / progressEvent.total) * 0.01
        }
      }).then(data => {
        this.status = 'done'
        if (data.status == 200) {
          this.imgUrl = 'https://filecdn.jue.sh/' + data.data.key
        }
      })
    }
  },
  watch: {
    percent() {
      this.value1 = this.perimeter * this.percent
      this.value2 = this.perimeter * (1 - this.percent)
    }
  }
}
</script>
<style lang="less">
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
  .upload-wrapper {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    height: 160px;
    .upload-area {
      width: 80px;
      height: 80px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      &.wait:before {
        content: ' ';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border: solid 1px #c7cfd7;
        border-radius: 50%;
      }
      &.wait:before {
        -webkit-animation: bo 1.5s infinite linear;
        animation: bo 1.5s infinite linear;
      }
      svg {
        position: absolute;
        &.upload-progress {
          width: 100%;
          height: 100%;
        }
        &.upload-icon {
          width: 50%;
          height: 50%;
        }
      }
    }
  }

  .main {
    padding: 30px 0 20px;
    text-align: center;
    width: 70%;
    .text {
      color: #5e6878;
    }
    .upload-btn {
      padding-top: 20px;
      label {
        color: #fff;
        background: #0075ff;
        border: none;
        padding: 10px 20px;
        font-size: 14px;
        border-radius: 40px;
        &:active {
          background: lighten(#0075ff, 20%);
        }
      }
    }
    .copy-url {
      padding-top: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      .input-group {
        display: flex;
        flex: 1;
        background-repeat: no-repeat;
        border: 1px solid #d1d5da;
        border-radius: 3px;
        box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
        .input-sm {
          flex: 1;
          font-size: 12px;
          line-height: 20px;
          padding: 3px 5px;
          border: none;
          box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
        }
        .input-group-button {
          padding: 0 8px;
          background-color: #eff3f6;
          background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);
          color: #24292e;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-left: 1px solid #d1d5da;
          &:hover {
            background-color: #e6ebf1;
            background-image: linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%);
            background-position: -0.5em;
            border-color: rgba(27, 31, 35, 0.35);
          }
          &:active {
            background-color: #e9ecef;
            background-image: none;
            border-color: rgba(27, 31, 35, 0.35);
            box-shadow: inset 0 0.15em 0.3em rgba(27, 31, 35, 0.15);
          }
        }
      }
      .re-upload {
        cursor: pointer;
        padding: 0 5px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

@-webkit-keyframes bo {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    border: 1px solid rgba(199, 207, 215, 1);
  }

  100% {
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
    border: 1px solid rgba(199, 207, 215, 0.1);
  }
}

@keyframes bo {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    border: 1px solid rgba(199, 207, 215, 1);
  }

  100% {
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
    border: 1px solid rgba(199, 207, 215, 0.1);
  }
}
</style>
