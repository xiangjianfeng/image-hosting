import Vue from 'vue'
import AppComponent from './App.vue'
import clipboard from 'clipboard'
Vue.prototype.clipboard = clipboard

new Vue({
  el: '#app',
  render: createElement => {
    return createElement(AppComponent)
  }
});