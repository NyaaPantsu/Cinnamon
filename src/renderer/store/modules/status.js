const state = {
  online: false
}

const mutations = {
  setOnline (state, onlineness) {
    state.online = onlineness
  }
}

const getters = {
  online (state) {
    return state.online
  }
}

export default {
  state,
  mutations,
  getters
}
