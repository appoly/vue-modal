import Vue from 'vue'
import Index from './Index.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { Index },
  template: '<App/>'
})