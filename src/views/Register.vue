<template>

<!--  主页视图-->
  <a-layout class="register-main-box">
    <a-layout id="register-box" class="register-box">
      <h1 style="font-family: 'Times New Roman',serif;font-size: 27px">RookCode注册</h1>
      <a-form
          class="register-form"
          ref="formRef"
          name="form_register"
          :model="formState"
          :rules="rules"
          v-bind="layout"
          :wrapper-col="{ span: 18 }"
          @finish="handleFinish"
          @validate="handleValidate"
          @finishFailed="handleFinishFailed"
      >


        <!--  输入邮箱    -->
        <h4
            style="text-align: left ;
          padding-left: 4px;
      font-family:'宋体',serif;
      font-weight: bold;font-size: 17px">邮箱</h4>
        <a-form-item has-feedback  name="email" :wrapper-col="{ offset: 0 ,span:21}">
          <a-input v-model:value="formState.email" />
        </a-form-item>

        <h4  style="text-align: left ;
          padding-left: 4px;
      font-family:'宋体',serif;
      font-weight: bold;font-size: 17px">验证码</h4>
        <a-row>
          <a-col :span="15">
            <a-form-item
                name="VerificationCode"
                :wrapper-col="{ offset: 0 ,span:24}"
                :rules="[{ required: true, message: '请输入验证码!' }]"
            >
              <a-input v-model:value="formState.VerificationCode" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!--    发送验证码，然后设置倒计时    -->
            <a-form-item>
              <!--    绑定事件      -->
              <a-button
                  type="primary"
                  block
                  @click="sendCode">{{ counter === 0 ? '发送验证码' : counter+'秒之后再试' }}</a-button>
            </a-form-item>
          </a-col>

        </a-row>

        <!--  有反馈吗  -->
        <h4  style="text-align: left ;
          padding-left: 4px;
      font-family:'宋体',serif;
      font-weight: bold;font-size: 17px">密码</h4>
        <a-form-item has-feedback   name="pass" :wrapper-col="{ offset: 0 ,span:21}">
          <a-input-password v-model:value="formState.pass" />
        </a-form-item>

        <h4  style="text-align: left ;
          padding-left: 4px;
      font-family:'宋体',serif;
      font-weight: bold;font-size: 17px">确认密码</h4>
        <a-form-item has-feedback name="checkPass" :wrapper-col="{ offset: 0 ,span:21}">
          <a-input-password v-model:value="formState.checkPass" />
        </a-form-item>



        <!-- 提交按钮     -->
        <a-row>
          <a-col :span="12">
            <a-form-item>
              <a-button
                  block
                  @click="() => formRef.resetFields()">重置</a-button>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item>
              <a-button
                  block
                  type="primary"
                  html-type="submit">注册</a-button>
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
import { defineComponent, reactive, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { notification } from 'ant-design-vue';


//计时器
const counter = ref(0)

/*注册界面的表单*/
interface FormState {
  email:string,
  pass: string;
  checkPass: string;
  VerificationCode:string;

}


export default defineComponent({
  setup() {


    const formRef = ref<FormInstance>();
    const formState = reactive<FormState>({
      email:'',
      pass: '',
      checkPass: '',
      VerificationCode:'',
    });


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

      /*密码校验*/
    let validatePass = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('请输入密码！');
      } else {
        if (formState.checkPass !== '') {
          /*formRef.value.validateFields('checkPass');*/
        }
        return Promise.resolve();
      }
    };

    /*密码确认校验*/
    let validatePass2 = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('请再次输入密码');
      } else if (value !== formState.pass) {
        return Promise.reject("两次密码不一致！");
      } else {
        return Promise.resolve();
      }
    };

    /*为对应的框设置自定义验证参数*/
    const rules: Record<string, Rule[]> = {
      email:[{ required: true, validator: validaEmail, trigger: 'change' }],
      pass: [{ required: true, validator: validatePass, trigger: 'change' }],
      checkPass: [{ required: true,validator: validatePass2, trigger: 'change' }],
    };
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    const handleFinish = (values: FormState) => {
      console.log(values, formState);
    };
    const handleFinishFailed = (errors: any) => {
      console.log(errors);
    };
    const resetForm = () => {
      /*formRef.value.resetFields();*/
    };
    const handleValidate = (args: any[]) => {
      console.log(args);
    };


    //发送验证码函数
    const sendCode=()=>{
      //尝试发送验证码
      if(counter.value==0){
        try{
          //计时器的相关操作
          counter.value = 20
          const timer = setInterval(() =>{
            if(counter.value === 0){
              //清除定时器
              clearInterval(timer)
            } else {
              counter.value--
            }
          },1000)

        }catch (e) {
          notification.open({
            message: '提示！',
            description:
                '验证码发送失败!',
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
        }

        alert("验证码发送成功!");
      }

    };


    return {
      counter,
      formState,
      formRef,
      rules,
      layout,



      sendCode,
      handleFinishFailed,
      handleFinish,
      resetForm,
      handleValidate,
    };
  },
});
</script>



<style scoped>


.register-main-box{

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

.register-box {
  width: 50%;
  height: 470px;
  /* background-color: #fff; */
  background-color: #d1c2d3;
  border-radius: 5px;
  box-shadow: 0 0 5px 1px #999;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.register-form {
  /*background: #fff;
  border: 5px solid #fff;
  border-radius: 5px;
  width: 50%;
  position: relative;
  margin: 10 auto;*/
  padding: 0px 0px 0px 10%;/*上 右 下 左*/
  top: 5%;
  /*transform: translateY(150%);*/
}

.aligncenter {
  height: 130px;
  width: 130px;
  clear: both;
  display: block;
  margin: auto;
}
</style>