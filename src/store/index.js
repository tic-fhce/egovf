import { createStore } from 'vuex'

export default createStore({
  state: {
    usuario:{
      cif:0,
      correo:'',
      celular:'',
      pass:''
    }
  },
  getters: {
    usuario(state){
      return state.usuario
    }
  },
  mutations: {
    setUsuario(state,user){
      state.usuario=user;
    }
  },
  actions: {
  },
  modules: {
  }
})
