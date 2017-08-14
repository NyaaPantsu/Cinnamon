import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    limit: 20,
    query: '',
    file: '',
    online: false
  },
  actions: {
  },
  mutations: {
    setFile (state, data) {
      state.file = data
    },
    setOnline (state, data) {
      state.online = data
    }
  },
  getters: {
  }
})
