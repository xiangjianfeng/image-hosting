import Vue from 'vue'
import App from './App.vue'
import clipboard from 'clipboard'
Vue.prototype.clipboard = clipboard
new Vue({
    el: '#popup',
    render: h => h(App)
})