<template>

<!--登录主页  -->
  <a-layout class="login-main-box">
    <a-layout id="login-box" class="login-box">
      <h1 style="font-family: 'Times New Roman',serif;font-size: 27px">RookCode</h1>
      <a-form
          class="login-form"
          ref="formRef"
          name="form_login"
          :model="formState_login"
          :rules="rules"
          :wrapper-col="{ span: 18 }"
      >


        <!--  输入邮箱    -->
        <h4
            style="text-align: left ;
          padding-left: 4px;
          font-weight: bold;
      font-family:'宋体',serif;font-size: 17px">邮箱</h4>
        <a-form-item has-feedback  name="email" :wrapper-col="{ offset: 0 ,span:21}">
          <a-input v-model:value="formState_login.email" />
        </a-form-item>



        <!--密码      -->
        <h4
            style="text-align: left ;
            font-weight: bold;
          padding-left: 4px;
      font-family:'宋体',serif;
     font-size: 17px">密码</h4>
        <a-form-item has-feedback  name="email" :wrapper-col="{ offset: 0 ,span:21}"
                     :rules="[{ required: true, message: '请输入密码!' }]">
          <a-input-password v-model:value="formState_login.pass" />
        </a-form-item>


        <!-- 图片验证码     -->
        <h4  style="text-align: left ;
          padding-left: 4px;
          font-weight: bold;
      font-family:'宋体',serif;
      font-size: 17px">验证码</h4>
        <a-row>
          <a-col :span="15">
            <a-form-item
                name="VerificationCode"
                :wrapper-col="{ offset: 0 ,span:24}"
                :rules="[{ required: true, message: '请输入验证码!' }]"
            >
              <a-input v-model:value="formState_login.VerificationCode" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!--    发送验证码，然后设置倒计时    -->
            <a-form-item>
              <img :src="imgUrl" alt="验证码" @click="changeCaptcha">
            </a-form-item>
          </a-col>

        </a-row>



        <!-- 提交按钮     -->
        <a-row>
          <a-col :span="12">
            <a-form-item>
              <a-button
                  block
                  @click="gotoRegister">注册</a-button>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item>
              <a-button
                  block
                  type="primary"
                  @click="try_login"
                  html-type="submit">登录</a-button>
            </a-form-item>
          </a-col>
        </a-row>


      </a-form>
    </a-layout>
  </a-layout>







</template>



<script lang="ts">
import axios from "axios";
import type { Rule } from 'ant-design-vue/es/form';
import {defineComponent, onMounted, reactive, ref} from 'vue';
import type { FormInstance } from 'ant-design-vue';
import router from "@/router";
import { notification } from 'ant-design-vue';
import store from "@/store";

//登录界面的表单
interface FormState_login {
  email:string,
  pass:string
  VerificationCode: string;
}

export default defineComponent({

  setup(){
    //验证码的地址
    let imgUrl = ref('');
    onMounted(()=>{
      changeCaptcha()
    })


    // 更换验证码
    const changeCaptcha = () => {
      //发送一个请求
      axios.get("http://175.178.221.165:8081/users/captcha",{
        responseType:'blob'
      }).then((res) => {
        let blob = new Blob([res.data], { type: 'image/jpeg' })
        console.log(blob)
        const qrUrl = window.URL.createObjectURL(blob)
        imgUrl.value = qrUrl;
      })
    };


    //基本数据类型
    const formRef = ref<FormInstance>();
    //表单实例 返回的是一个对象
    const formState_login = reactive<FormState_login>({
      email:'',
      pass:'',
      VerificationCode: '',
    });


    //尝试登录
    const try_login = () => {


      axios.post("http://175.178.221.165:8081/users/login",{
        "account": formState_login.email,
        "code": formState_login.VerificationCode,
        "password": formState_login.pass
      },{
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log(res.data)
        //判断登录是否成功
        if(res.data.success==true){

          const userInfo={
            token:res.data.data.token,
            id:res.data.data.users.id
          }
          //保存token
          store.commit("login",userInfo);
          //跳转到主页

        }else{
          notification['error']({
            message: '登录失败',
            description:
                '请检查账号密码',
          });
        }
      })
    };




    /*邮箱校验函数*/
    let validaEmail= async (_rule: Rule, value: string) => {
      if (!value) {
        return Promise.reject('请输入邮箱！');
      } else {
        let email = new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
        if (!email.test(value)) {
          return Promise.reject('请合法邮箱！');
        } else {
          return Promise.resolve();
        }
      }
    };

    /*为对应的框设置自定义验证参数*/
    const rules: Record<string, Rule[]> = {
      email:[{ required: true, validator: validaEmail, trigger: 'change' }],
    };


    //跳转到登录页面
    const gotoRegister=()=>{
      console.log("跳转到登录页面")
      router.push({ path: '/register' });
    }


    return{
      formRef,
      formState_login,//表单
      rules,//表单验证规则
      validaEmail,//邮箱验证
      try_login,

      //获取新的验证码图片
      imgUrl,//图片的地质
      changeCaptcha,


      //跳转
      gotoRegister,
    }
  }


});

</script>



<style scoped>

.login-main-box{

  background-image: url("../assets/bg01.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;

  /*display: flex;
  width: 100%;
  height: 100%;
  min-height: 800px;

  background-size: 100% 100%;*/

}

.login-box {
  width: 50%;
  height: 405px;
  /* background-color: #fff; */
  background-color: #d1c2d3;
  border-radius: 5px;

  box-shadow: 0 0 5px 1px #999;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -40%);
}

.login-form {
  /*background: #fff;
  border: 5px solid #fff;
  border-radius: 5px;
  width: 50%;
  position: relative;
  margin: 10 auto;*/
  padding: 20px 0px 0px 10%;/*上 右 下 左*/
  top: 10%;
  /*transform: translateY(150%);*/
}


</style>