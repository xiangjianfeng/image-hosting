<template>
  <router-view/>
</template>
<style lang="less">
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: all 0.5s linear 0s;
}
::-webkit-scrollbar {
  display: none;
}
html {
  font-size: 16px;
}
body {
  font: 0.9375rem/1.5 -apple-system, BlinkMacSystemFont, SF Pro Text, segoe ui,
    helvetica neue, helvetica, ubuntu, roboto, noto, arial, sans-serif;
}
a {
  text-decoration: none;
}
img {
  max-width: 100%;
  vertical-align: baseline;
}
</style>
