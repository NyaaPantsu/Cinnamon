const state = {
  filePath: '',
  magnetURI: ''
}

const mutations = {
  setFilePath (state, filePath) {
    state.filePath = filePath
  },
  setMagnetURI (state, magnetURI) {
    state.magnetURI = magnetURI
  }
}

const getters = {
  filePath: state => state.filePath,
  magnetURI: state => state.magnetURI
}

export default {
  state,
  mutations,
  getters
}
