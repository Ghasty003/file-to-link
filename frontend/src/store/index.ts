import { createStore } from 'vuex'

export default createStore({
  state: {
    isLinkValid: false
  },
  mutations: {
    setLinkValidity(state, payload) {
      state.isLinkValid = payload
    }
  }
})
