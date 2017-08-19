const state = {
  preferredPlayer: 'mpv'
}

const mutations = {
  setPreferredPlayer (state, player) {
    state.preferredPlayer = player
  }
}

const getters = {
  preferredPlayer: state => state.preferredPlayer
}

export default {
  state,
  mutations,
  getters
}
