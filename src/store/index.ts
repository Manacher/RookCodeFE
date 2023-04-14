import { createStore } from 'vuex'



export interface GlobalDataProps {
  token: string;
}


//创建全局变量
const store=createStore<GlobalDataProps>({
  state: {
    //持久化存储
    token:localStorage.getItem("token")||""
  },
  //同步的
  mutations: {
    //设置token
    login(state,_token){
      const token=_token
      state.token=token
      localStorage.setItem('token', token)

    }
  },
  //异步操作
  actions: {
  },
  modules: {
  }
})


export default store
