import request from "@/utils/request";

//用户登录类型
type LoginInf={
    email:string
    pass:string
    VerificationCode:string
};

//用户登录返回数据类型
type LoginResult={
    success:boolean
    state:number
    message:string
    content:string
}


//用户请求登录
export const login= (loginInf:LoginInf) =>{
    return request<LoginResult>({
        method:"POST",
        url:"/login",
        /*要求请求类型为 application/x-www.form-urlencoded*/
        data:`email=${loginInf.email}&password=${loginInf.VerificationCode}&code=${loginInf.VerificationCode}`,
        /*json格式时可以自动的进行调用*/
        /*直接穿兑现*/
    });
}

//获取验证码接口


//用户请求注册