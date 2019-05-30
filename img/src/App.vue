<template>
  <div class="wrapper">
    <div class="container">
      <router-view/>
    </div>
  </div>
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
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(249, 249, 250, 1);
  padding: 10px;
}
.container {
  position: relative;
  overflow: hidden;
  width: 430px;
  height: 330px;
  background: #fff url(https://filecdn.jue.sh/box/imgs/bg.svg);
  background-size: 110%;
  background-repeat: no-repeat;
  background-position: top;
  box-shadow: 0 0 32px 0 rgba(12, 12, 13, 0.1),
    0 2px 16px 0 rgba(12, 12, 13, 0.05);
}
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
