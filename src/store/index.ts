import { createStore } from 'vuex'



/*存储token 和一些其他的全局信息*/
export interface UserInfo {
  token: string
  id:number
}


//创建全局变量
const store=createStore<UserInfo>({
  state: {
    //持久化存储
    token:localStorage.getItem("token")||"",
    id:Number(localStorage.getItem("id"))||0
  },
  //同步的
  mutations: {

    //设置token
    login(state,userInfo:UserInfo){
      const token=userInfo.token
      const id=userInfo.id
      state.token=token
      state.id=id
      localStorage.setItem('token', token)
      localStorage.setItem('id', id.toLocaleString())

    }
  },
  //异步操作
  actions: {
  },
  modules: {
  }
})


export default store
