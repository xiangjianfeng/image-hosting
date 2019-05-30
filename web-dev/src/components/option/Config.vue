<template>
  <div class="config-wrapper">
    <div class="warning-wrapper">
      <el-alert :closable="false" type="warning">
        您还不是付费用户，无法自定义云存储 <el-button size="mini" type="text">马上升级</el-button>
      </el-alert>
    </div>

    <el-tabs tab-position="left">
      <el-tab-pane :key="item.value" v-for="item in options">
        <span class="select-item" slot="label">
          <img :src="'/static/imgs/' + item.value + '.svg'" class="host-ico">
          {{item.label}}
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: 'weibo',
          label: '新浪微博',
          disabled: true
        },{
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
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.warning-wrapper {
  margin-bottom: 15px;
  .btn-upgrade {
    display: inline-block;
    margin: 0 20px;
  }
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
</style>

