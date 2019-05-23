<template>
  <div id="app">
    <Login v-if="!isLogin"></Login>
    <Upload v-if="isLogin"></Upload>
  </div>
</template>

<script>
import Login from '@/components/home/Login.vue'
import Upload from '@/components/home/Upload.vue'
export default {
  name: 'app',
  components:{
    Login,
    Upload
  },
  data() {
    return {
      isLogin: false, //是否登陆
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
</style>
