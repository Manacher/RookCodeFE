import { createStore } from 'vuex'



/*�洢token ��һЩ������ȫ����Ϣ*/
export interface UserInfo {
  token: string
  id:number
}


//����ȫ�ֱ���
const store=createStore<UserInfo>({
  state: {
    //�־û��洢
    token:localStorage.getItem("token")||"",
    id:Number(localStorage.getItem("id"))||0
  },
  //ͬ����
  mutations: {

    //����token
    login(state,userInfo:UserInfo){
      const token=userInfo.token
      const id=userInfo.id
      state.token=token
      state.id=id
      localStorage.setItem('token', token)
      localStorage.setItem('id', id.toLocaleString())

    }
  },
  //�첽����
  actions: {
  },
  modules: {
  }
})


export default store
