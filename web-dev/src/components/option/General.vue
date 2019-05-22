<template>
  <div class="general-wrapper">
    <el-form label-width="80px" ref="form">
      <el-form-item label="用户等级">
        免费用户
        <div class="tip">
          升级付费会员可解锁更多云存储
          <a href="https://img.jue.sh">
            <el-button size="mini" type="text">马上升级</el-button>
          </a>
        </div>
      </el-form-item>
      <el-form-item label="默认存储">
        <el-select placeholder="请选择" v-model="value" size=small>
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
      <el-form-item>
        <el-button type="primary" plain size="mini">退出登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      value: 'weibo'
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


