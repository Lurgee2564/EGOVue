import { createStore } from 'vuex'


const state ={
  isLogin:'0',
  ser:null,
  token:localStorage.getItem('token')?localStorage.getItem('token'):'',
};

export default createStore({
  state,
  getters: {
    getStorage(state){
      if(!state.token){
        this.state.token=JSON.parse(localStorage.getItem(key))
      }
      return state.token
    }

  },
  mutations: {
    $_setToken(state,value){
      state.token=value;
      localStorage.setItem('token',value);
    },
    $_removeStorage(state,value){
      localStorage.removeItem('token')
    }
  },
  actions: {
  },
  modules: {
  }
})
