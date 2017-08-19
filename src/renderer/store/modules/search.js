const state = {
  limit: 20,
  query: ''
}

const mutations = {
  setLimit (state, limit) {
    state.limit = limit
  },
  setQuery (state, query) {
    state.query = query
  }
}

const getters = {
  limit: state => state.limit,
  query: state => state.query
}

export default {
  state,
  mutations,
  getters
}
