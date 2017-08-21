import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [createPersistedState({
    key: 'cinnamon',
    paths: ['preferences']
  })],
  strict: process.env.NODE_ENV !== 'production'
})
