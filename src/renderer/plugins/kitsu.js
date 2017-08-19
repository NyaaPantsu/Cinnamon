import Vue from 'vue'
import Kitsu from 'kitsu'

Vue.prototype.$kitsu = new Kitsu({
  apiUrl: 'https://kitsu.io/api',
  apiVer: 'edge'
})
