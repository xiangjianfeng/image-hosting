<template>
  <div class="charge-wrapper">
    <el-dialog :visible.sync="chargeVisible" title="VIP充值" width="600px" :before-close="hideCharge">
      <div class="from-wrapper">
        <el-form label-width="auto">
          <el-form-item label="付费码: ">
            <el-input v-model="code"></el-input>
          </el-form-item>
          <el-form-item>
            您输入的是月付费码，激活后有效为:
            <strong class="red">2019年4月30日</strong>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交</el-button>
            <el-button @click="resetCode">重置</el-button>
          </el-form-item>
          <el-form-item>
            <div class="rule">
              <ol>
                <li>
                  <a href="#">如何购买VIP付费码?</a>
                </li>
                <li>
                  <a href="#">付费码价格说明?</a>
                </li>
              </ol>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['chargeVisible'],
  data() {
    return {
      code: ''
    }
  },
  methods: {
    hideCharge() {
      this.$emit('changeCharge')
    },
    resetCode(){
      this.code = ''
    }
  }
}
</script>
<style lang="less" scoped>
.from-wrapper {
  width: 80%;
  margin: 0 auto;
}
.rule {
  ol {
    margin: 0;
    padding: 0;
    list-style-position:inside;
    line-height: 1.6;
    counter-reset: li;
    color: #409EFF;
    a{
      color: #409EFF;
    }
  }
}
</style>


