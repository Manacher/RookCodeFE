import {createStore} from 'vuex'

/*存储token 和一些其他的全局信息*/
export interface UserInfo {
    token: string,
    account: string,
}

//创建全局变量
const store = createStore<UserInfo>({
    state: {
        //持久化存储
        token: localStorage.getItem("token") || "",
        account: localStorage.getItem("account") || "",
    },
    //同步的
    mutations: {
        //设置token
        login(state, userInfo: UserInfo) {
            const token = userInfo.token
            state.token = token
            localStorage.setItem('token', token)

            const account = userInfo.account
            state.account = account
            localStorage.setItem('account', account)
        }
    },
    //异步操作
    actions: {},
    modules: {}
})


export default store
