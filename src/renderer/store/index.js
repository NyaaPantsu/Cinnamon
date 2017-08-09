import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    limit: 20,
    query: ''
  },
  actions: {},
  mutations: {},
  getters: {}
})
