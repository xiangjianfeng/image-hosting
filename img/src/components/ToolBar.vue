<template>
  <div :class="{'close':isSetting}" class="toolbar-wrapper">
    <div class="toolbar">
      <div @click="toggleClass(false)" class="btn">
        <i class="iconfont icon-close"></i>
      </div>
      <div class="btn">
        <i class="iconfont icon-weibo"></i>
      </div>
      <div class="btn" @click="changeMarkdown">
        <i class="iconfont icon-markdown" :class="{'active':isMarkdown}"></i>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props:['isMarkdown','defcloud'],
  data() {
    return {
      isSetting: false
    }
  },
  methods: {
    toggleClass() {
      this.isSetting = false
    },
    changeMarkdown(){
      this.$emit('changeMarkdown')
    }
  }
}
</script>

<style lang="less" scoped>
.toolbar-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: -100%;
  &.close {
    right: 0;
  }
}
.toolbar {
  background-color: rgba(235, 235, 239, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 5px;
  right: 0;
  height: 50px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  .btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    .iconfont {
      font-size: 16px;
      color: #555;
      &.icon-markdown.active{
        color: #0075ff;
      }
    }
  }
}
</style>

