import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading:false,
  },
  mutations: {
    // 改变loading状态
    changeIsLoading(state,payload){
      state.isLoading = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
