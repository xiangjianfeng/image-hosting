<template>
  <div class="main" id="upload-box">
    <div :class="status" class="upload-area">
      <div class="svg-box">
        <!-- 等待图标 -->
        <svg
          class="upload-icon"
          v-show="status == 'waitting'"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M422.4 704l-94.72-143.36c-15.36-23.04-46.08-30.72-71.68-15.36l-15.36 15.36-130.56 204.8c-12.8 25.6-7.68 56.32 17.92 71.68 7.68 5.12 17.92 7.68 25.6 7.68h256c28.16 0 51.2-23.04 51.2-51.2 0-7.68-2.56-15.36-5.12-23.04l-33.28-66.56z"
            fill="#A5C8F4"
          ></path>
          <path
            d="M307.2 358.4c-43.52 0-76.8-33.28-76.8-76.8s33.28-76.8 76.8-76.8 76.8 33.28 76.8 76.8-33.28 76.8-76.8 76.8z m327.68-33.28c5.12-7.68 12.8-15.36 20.48-17.92 25.6-12.8 56.32 0 69.12 23.04L944.64 793.6c2.56 7.68 5.12 15.36 5.12 23.04 0 28.16-23.04 51.2-51.2 51.2H378.88c-10.24 0-20.48-2.56-30.72-10.24-23.04-15.36-28.16-48.64-12.8-71.68l56.32-79.36 243.2-381.44z"
            fill="#2589FF"
          ></path>
        </svg>

        <!-- 上传中图标 -->
        <svg
          class="upload-icon"
          v-show="status == 'uploading'"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M554.666667 268.8v601.6h-85.333334V268.8L337.066667 401.066667 277.333333 341.333333 512 106.666667 746.666667 341.333333l-59.733334 59.733334L554.666667 268.8z"
            fill="#0075ff"
          ></path>
        </svg>

        <!-- 上传完成 -->
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
    <div class="text-area">
      <span v-if="imgUrl == ''">点击选择或拖拽图片到这里</span>
      <span v-else>复制下面的图片地址 或者 取消重新上传</span>
    </div>
    <div class="url-box">
      <div class="copy-url" v-show="imgUrl">
        <div class="input-group">
          <input @focus="focus($event)" class="input-sm" readonly type="text" v-model="showText">
          <div
            :data-clipboard-text="showText"
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
    <input
      @change="uploadInputchange"
      accept="image/*"
      class="none"
      id="btn-upload"
      type="file"
      v-if="status == 'waitting'"
    >
    <i @click="showToolbar" class="btn-tool iconfont icon-setting"></i>
    <tool-bar
      :defcloud="defcloud"
      :isMarkdown="isMarkdown"
      @changeMarkdown="setMarkdown"
      ref="toolbar"
    ></tool-bar>
  </div>
</template>

<script>
import axios from 'axios'
import b64toBlob from '@/assets/js/b64toBlob.js'
import ToolBar from '@/components/ToolBar.vue'
export default {
  components: {
    ToolBar
  },
  data() {
    return {
      isSetting: false, //设置工具隐藏
      status: 'waitting', //waitting:上传前 uploading:上传中 done:上传成功后
      imgUrl: '', //图片地址
      defcloud: 'weibo',
      isMarkdown: 0,
      token: '' //上传所需要的token
    }
  },
  computed: {
    markdown() {
      return `![](${this.imgUrl})`
    },

    showText() {
      return this.isMarkdown ? this.markdown : this.imgUrl
    }
  },
  mounted() {
    axios
      .get('https://api.jue.sh/img/user/info', {
        headers: {
          Authorization: localStorage.getItem('JUE_TOKEN')
        }
      })
      .then(res => {
        //console.log(res.data)
        if (res.data.status != undefined && res.data.status == false) {
          this.logout()
        } else {
          this.token = res.data.token
          this.isMarkdown = res.data.markdown == 1 ? true : false
          this.defcloud = res.data.defcloud
          if (parseInt(res.data.isvip) == 0 && res.data.defcloud != 'weibo') {
            this.defcloud = 'weibo'
          }
        }
      })

    this.copyBtn = new this.clipboard(this.$refs.copy)
    this.pasteUpload()
    this.dragUpload()
  },
  methods: {
    showToolbar() {
      this.$refs.toolbar.isSetting = true
    },
    focus(event) {
      event.currentTarget.select()
    },
    copySuccess() {
      this.copyBtn.on('success', e => {
        e.trigger.setAttribute('data-tooltip', '已复制')
        setTimeout(() => {
          e.trigger.removeAttribute('data-tooltip')
        }, 800)
      })
    },

    setDefault() {
      this.status = 'waitting'
      this.imgUrl = ''
    },
    //更改markdown
    setMarkdown() {
      this.isMarkdown = !this.isMarkdown
      let markdown = this.isMarkdown ? 1 : 0
      this.setGeneral({ markdown: markdown })
    },
    setGeneral(json) {
      axios
        .post('https://api.jue.sh/img/user/setgeneral', json, {
          headers: {
            Authorization: localStorage.getItem('JUE_TOKEN')
          }
        })
        .then(res => {
          console.log(res.data)
        })
    },
    //粘贴上传
    pasteUpload() {
      let _this = this
      document.addEventListener('paste', e => {
        this.status = 'uploading'
        if (e.clipboardData.items[0].type.indexOf('image') > -1) {
          let reader = new FileReader(),
            file = e.clipboardData.items[0].getAsFile()
          reader.onload = function(e) {
            let file = this.result
            let b64Data = file.replace('data:image/png;base64,', '')
            //_this.upload(b64toBlob(b64Data))
            _this.upload(b64Data)
          }
          reader.readAsDataURL(file)
        }
      })
    },
    //选择文件上传
    uploadInputchange() {
      let _this = this
      this.status = 'uploading'
      let upfile = document.getElementById('btn-upload').files[0]
      var reader = new FileReader()
      reader.readAsDataURL(upfile) // 读出 base64
      reader.onloadend = function() {
        // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
        let file = reader.result.replace(/^.*?,/, '')
        // 下面逻辑处理
        _this.upload(file)
      }
    },
    //拖拽上传
    dragUpload() {
      let _this = this
      let dropZone = document.getElementById('upload-box')
      dropZone.addEventListener(
        'dragover',
        evt => {
          _this.setDefault()
          evt.stopPropagation()
          evt.preventDefault()
          evt.dataTransfer.dropEffect = 'copy'
        },
        false
      )
      dropZone.addEventListener(
        'drop',
        evt => {
          evt.stopPropagation()
          evt.preventDefault()

          let files = evt.dataTransfer.files
          if (files.length > 1) {
            console.log('只支持一个文件上传')
            return false
          }

          // 只选择图片文件
          if (!files[0].type.match('image.*')) {
            console.log('只能上传图片文件')
            return false
          }

          this.status = 'uploading'
          var reader = new FileReader()
          reader.readAsDataURL(files[0]) // 读出 base64
          reader.onloadend = function() {
            // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
            let file = reader.result.replace(/^.*?,/, '')
            // 下面逻辑处理
            _this.upload(file)
          }
        },
        false
      )
    },

    //上传分类
    upload(file) {
      let _this = this
      axios
        .post(
          'https://api.jue.sh/img/user/upload',
          {
            base64: file
          },
          {
            headers: {
              Authorization: localStorage.getItem('JUE_TOKEN')
            }
          }
        )
        .then(res => {
          if (res.status == 200 && res.data.status) {
            _this.status = 'done'
            _this.imgUrl = res.data.url
          }
        })
    },
    //上传到SM.MS
    upToSmms(file) {
      let _this = this
      const axiosInstance = axios.create({ withCredentials: false })
      let data = new FormData()
      data.append('smfile', file)
      axios.post('https://sm.ms/api/upload', data).then(res => {
        if (res.status == 200 && res.data.code == 'success') {
          _this.status = 'done'
          _this.imgUrl = res.data.data.url
        }
      })
    }
  }
}
</script>
<style lang="less">
.upload-area {
  margin-top: 75px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px #c7cfd7 solid;
  &.done {
    border-color: #0075ff;
  }
  &.waitting:before,
  &.uploading:before {
    content: ' ';
    position: absolute;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    top: -1px;
    left: -1px;
    border-radius: 50%;
    animation: bo 1.5s infinite linear;
  }

  .svg-box {
    position: absolute;
    width: 60px;
    height: 60px;
    padding: 10px;
    overflow: hidden;
    border-radius: 50%;
    svg {
      &.upload-icon {
        width: 100%;
        height: 100%;
      }
    }
  }

  &.uploading {
    svg.upload-icon {
      animation: up 1s infinite linear;
    }
  }
}

.text-area {
  color: #5e6878;
  margin-top: 30px;
  font-size: 14px;
  span {
    user-select: none;
    -webkit-user-select: none;
  }
}

.url-box {
  height: 43px;
  width: 80%;
  margin-top: 15px;
}

.copy-url {
  padding-left: 36px;
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
      outline: none;
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

#upload-box {
  cursor: pointer;
  &:hover {
    .waitting {
      border-color: #0075ff;
    }
  }
}
@keyframes up {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}

@keyframes bo {
  0% {
    transform: scale(1);
    border: 1px solid rgba(199, 207, 215, 1);
  }

  100% {
    transform: scale(1.5);
    border: 1px solid rgba(199, 207, 215, 0.1);
  }
}

#btn-upload {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  outline: none;
  cursor: pointer;
  opacity: 0;
}
.btn-tool {
  position: absolute;
  bottom: 5px;
  right: 5px;
  display: inline-block;
  width: 24px;
  text-align: center;
  color: #5e6878;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
}
</style>
