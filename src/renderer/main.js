import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import vuetify from './vuetify'
import clipboard from './util/clipboard'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  vuetify,
  clipboard,
  template: '<App/>'
}).$mount('#app')
