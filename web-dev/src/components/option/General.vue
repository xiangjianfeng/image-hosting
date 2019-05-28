<template>
  <div class="general-wrapper">
    <el-form label-width="80px" ref="form">
      <el-form-item label="用户等级">
        <div v-if="isvip">
          <span>VIP用户</span>
          <div class="tip">
            您的VIP服务最后截止时间为:
            <strong style="margin-right:20px; color:#606266;">{{endtime}}</strong>
            <el-button @click="changeCharge" size="mini" type="text">马上续费</el-button>
          </div>
        </div>

        <div v-else>
          <span>免费用户</span>
          <div class="tip" v-if="endtime != ''">
            您的会员已于 <strong>{{endtime}}</strong> 过期，
            <el-button @click="changeCharge" size="mini" type="text">现在续费</el-button> 使用更多云存储
          </div>
          <div class="tip" v-else>
            升级付费会员可解锁更多云存储
            <el-button @click="changeCharge" size="mini" type="text">马上升级</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="默认存储">
        <el-select @change="setDefcloud" placeholder="请选择" v-model="defcloud">
          <el-option
            :disabled="item.disabled"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            v-for="item in options"
          >
            <div class="select-item">
              <img :src="'/static/imgs/' + item.value + '.svg'" class="host-ico">
              <span>{{item.label}}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Markdown">
        <el-switch @change="setMarkdown" v-model="isMarkdown"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button @click="logout" plain type="primary">退出登陆</el-button>
      </el-form-item>
    </el-form>

    <Charge :chargeVisible="chargeVisible" @changeCharge="changeCharge"></Charge>
  </div>
</template>
<script>
import Charge from '@/components/option/Charge.vue'
import axios from 'axios'
export default {
  components: {
    Charge
  },
  data() {
    return {
      chargeVisible: false,
      options: [
        {
          value: 'weibo',
          label: '新浪微博'
        },
        {
          value: 'smms',
          label: 'SM.MS'
        },
        {
          value: 'qiniu',
          label: '七牛云',
          disabled: true
        },
        {
          value: 'upyun',
          label: '又拍云',
          disabled: true
        },
        {
          value: 'aliyun',
          label: '阿里云 OSS',
          disabled: true
        },
        {
          value: 'tencent',
          label: '腾讯云 COS',
          disabled: true
        }
      ],
      endtime: '',
      isvip: 0, //是否VIP
      defcloud: 'smms', //默认图床
      isMarkdown: 1 //是否输出markdown
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let _this = this
      axios
        .get('/juetool/user/info', {
          headers: {
            Authorization: localStorage.getItem('JUE_TOKEN')
          }
        })
        .then(res => {
          //console.log(res.data)
          if (res.data.status != undefined && res.data.status == false) {
            this.logout()
          } else {
            _this.isvip = parseInt(res.data.isvip)
            _this.endtime = res.data.endtime
            _this.isMarkdown = res.data.markdown == 1 ? true : false
            _this.defcloud = res.data.defcloud
            if(_this.isvip == 0){
              if(res.data.defcloud != 'weibo' && res.data.defcloud != 'smms'){
                _this.defcloud = 'smms'
              }
            }
          }
        })
    },
    changeCharge() {
      this.chargeVisible = !this.chargeVisible
    },

    logout() {
      localStorage.removeItem('JUE_TOKEN')
      this.$router.push({ path: '/login' })
    },

    setGeneral(json) {
      //let defjson = { unionid: localStorage.getItem('JUE_TOKEN') }
      //let obj = Object.assign(defjson, json)
      axios
        .post('/juetool/user/setgeneral', json, {
          headers: {
            Authorization: localStorage.getItem('JUE_TOKEN')
          }
        })
        .then(res => {
          console.log(res.data)
        })
    },
    setDefcloud() {
      this.setGeneral({ defcloud: this.defcloud })
    },

    setMarkdown() {
      let markdown = this.isMarkdown ? 1 : 0
      this.setGeneral({ markdown: markdown })
    }
  }
}
</script>
<style lang="less" scoped>
.general-wrapper {
  width: 80%;
}
.tip {
  font-size: 12px;
  color: #999;
  line-height: 1;
}
.select-item {
  display: flex;
  align-items: center;
  .host-ico {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
}
.is-disabled {
  .host-ico {
    opacity: 0.5;
  }
}
</style>


