<template>
  <div class="wrapper border-wrapper">
    <el-tabs type="card" v-model="activeName">
      <el-tab-pane label="常规" name="general">
        <General @changeCharge="changeCharge"></General>
      </el-tab-pane>
      <el-tab-pane label="图床配置" name="config">
        <Config></Config>
      </el-tab-pane>
    </el-tabs>
    <Charge :chargeVisible="chargeVisible"></Charge>
  </div>
</template>
<script>
import General from '@/components/option/General.vue'
import Config from '@/components/option/Config.vue'
import Charge from '@/components/option/Charge.vue'
export default {
  components: {
    General,
    Config,
    Charge
  },
  data() {
    return {
      chargeVisible: false,
      activeName: 'config'
    }
  },
  methods: {
    changeCharge() {
      this.chargeVisible = !this.chargeVisible
    }
  }
}
</script>
<style lang="less">
.border-wrapper > .el-tabs > .el-tabs__header {
  margin: 0;
}
.border-wrapper > .el-tabs > .el-tabs__content {
  border-right: 1px solid #e4e7ed;
  border-bottom: 1px solid #e4e7ed;
  border-left: 1px solid #e4e7ed;
  padding: 10px;
  border-radius: 0 0 4px 4px;
}
</style>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.header {
}
</style>


