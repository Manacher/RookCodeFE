import {createStore} from 'vuex'

/*�洢token ��һЩ������ȫ����Ϣ*/
export interface UserInfo {
    token: string,
    account: string,
}

//����ȫ�ֱ���
const store = createStore<UserInfo>({
    state: {
        //�־û��洢
        token: localStorage.getItem("token") || "",
        account: localStorage.getItem("account") || "",
    },
    //ͬ����
    mutations: {
        loginSafe(state,userInfo:UserInfo){
            const token = userInfo.token
            state.token = token
            localStorage.setItem('token', token)

            const account = userInfo.account
            state.account = account
            localStorage.setItem('account', account)
        },

        loginNotSafe(state,userInfo:UserInfo){
            const token = userInfo.token
            state.token = token

            const account = userInfo.account
            state.account = account
        }
    },
    //�첽����
    actions: {},
    modules: {}
})


export default store