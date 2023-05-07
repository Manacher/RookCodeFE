<template>
  <!--  主页视图-->
  <div class="register-main-box">
    <div id="register-box" class="register-box">
      <a-button
        @click="returnToLogin"
        size="small"
        style="position: absolute; left: 0.5rem; top: 0.5rem"
        >返回</a-button
      >
      <h1
        style="
          font-style: italic;
          font-size: 1.5rem;
          font-weight: bold;
          color: #262626;
          padding-top: 1rem;
        "
      >
        RookCode注册
      </h1>
      <a-form
        class="register-form"
        ref="formRef"
        name="form_register"
        :model="formState"
        :rules="rules"
        v-bind="layout"
        :wrapper-col="wrapperCol"
        :label-col="labelCol"
        @finish="handleFinish"
        @validate="handleValidate"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item has-feedback label="邮箱" name="email">
          <a-input v-model:value="formState.email" />
        </a-form-item>

        <a-row>
          <a-col :span="15">
            <a-form-item
              label="验证码"
              name="VerificationCode"
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
                style="border-radius: 0px; font-size: 0.8rem"
                @click="sendCode"
                >{{
                  counter === 0 ? "发送验证码" : counter + "s之后再试"
                }}</a-button
              >
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item has-feedback label="密码" name="pass">
          <a-input-password v-model:value="formState.pass" />
        </a-form-item>

        <a-form-item has-feedback label="确认密码" name="checkPass">
          <a-input-password v-model:value="formState.checkPass" />
        </a-form-item>

        <a-form-item style="margin-left: 5.5rem; margin-top: 2.5rem">
          <div style="display: flex; flex-direction: row">
            <a-button
              block
              @click="() => formRef.resetFields()"
              style="border-radius: 5px; margin-right: 1rem"
              >重置</a-button
            >
            <a-button
              block
              type="primary"
              html-type="submit"
              @click="tryRegister"
              style="border-radius: 5px; margin-left: 1rem"
              >注册</a-button
            >
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import type { Rule } from "ant-design-vue/es/form";
import { defineComponent, reactive, ref, h } from "vue";
import type { FormInstance } from "ant-design-vue";
import { notification } from "ant-design-vue";
import { SmileOutlined } from "@ant-design/icons-vue";
import router from "@/router";

//计时器
const counter = ref(0);

/*注册界面的表单*/
interface FormState {
  email: string;
  pass: string;
  checkPass: string;
  VerificationCode: string;
}

export default defineComponent({
  setup() {
    const formRef = ref<FormInstance>();
    const formState = reactive<FormState>({
      email: "",
      pass: "",
      checkPass: "",
      VerificationCode: "",
    });

    /*邮箱校验函数*/
    let validaEmail = async (_rule: Rule, value: string) => {
      if (!value) {
        return Promise.reject("请输入邮箱！");
      } else {
        let email = new RegExp(
          /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        );
        if (!email.test(value)) {
          return Promise.reject("请合法邮箱！");
        } else {
          return Promise.resolve();
        }
      }
    };

    /*密码校验*/
    let validatePass = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("请输入密码！");
      } else {
        if (formState.checkPass !== "") {
          let pass = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,15}$/);
          if (!pass.test(value)) {
            return Promise.reject(
              "密码长度需为6到15位，且应该为数字加字母的组合！"
            );
          }
          /*formRef.value.validateFields('checkPass');*/
        }
        return Promise.resolve();
      }
    };

    /*密码确认校验*/
    let validatePass2 = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("请再次输入密码");
      } else if (value !== formState.pass) {
        return Promise.reject("两次密码不一致！");
      } else {
        return Promise.resolve();
      }
    };

    /*为对应的框设置自定义验证参数*/
    const rules: Record<string, Rule[]> = {
      email: [{ required: true, validator: validaEmail, trigger: "change" }],
      /*pass: [{ required: true, validator: validatePass, trigger: 'change' }],
      checkPass: [{ required: true,validator: validatePass2, trigger: 'change' }],*/
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
    const sendCode = () => {
      //尝试发送验证码
      if (counter.value == 0) {
        //首先得确保邮箱不为空
        if (formState.email != "") {
          let email = new RegExp(
            /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
          );
          if (!email.test(formState.email)) {
            notification.open({
              message: "提示！",
              description: "请输入正确的邮箱!",
              onClick: () => {
                console.log("Notification Clicked!");
              },
            });
          } else {
            //开始倒计时
            try {
              //计时器的相关操作
              counter.value = 20;
              const timer = setInterval(() => {
                if (counter.value === 0) {
                  //清除定时器
                  clearInterval(timer);
                } else {
                  counter.value--;
                }
              }, 1000);
            } catch (e) {
              notification.open({
                message: "提示！",
                description: "验证码发送失败!",
                onClick: () => {
                  console.log("Notification Clicked!");
                },
              });
            }

            //发送验证码请求
            axios
              .post(
                "http://175.178.221.165:8081/users/registerCode",
                {
                  email: formState.email,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  // withCredentials:true
                }
              )
              .then((res: any) => {
                //提示消息发送成功
                if (res.data.success === true) {
                  notification.open({
                    message: "验证码已发送",
                    description:
                      "验证码已发送到对应的邮箱，验证码五分钟内有效!",
                    icon: () => h(SmileOutlined, { style: "color: #108ee9" }),
                  });
                } else {
                  notification["error"]({
                    message: "验证码已发送",
                    description: "验证码发送失败",
                  });
                }
              });
          }
        } else {
          notification.open({
            message: "提示！",
            description: "请输入邮箱!",
            onClick: () => {
              console.log("Notification Clicked!");
            },
          });
        }
      }
    };

    //注册函数
    const tryRegister = () => {
      //首先得保证内容不为空
      if (
        formState.email != "" &&
        formState.VerificationCode != "" &&
        formState.pass != "" &&
        formState.checkPass != ""
      ) {
        axios
          .post(
            "http://175.178.221.165:8081/users/register",
            {
              account: formState.email,
              password: formState.pass,
              code: formState.VerificationCode,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res: any) => {
            //提示消息发送成功
            console.log(res.data.message);
            if (res.data.success === true) {
              //跳转到登录界面，使得用户进行登录
              notification.open({
                message: "注册状态",
                description: "注册成功，请登录!",
                icon: () => h(SmileOutlined, { style: "color: #108ee9" }),
              });
              router.push({ path: "/login" });
            }
            //否则给出错误的提示信息
            else {
              notification["error"]({
                message: "提示",
                description: res.data.message,
              });
            }
          });
      }
    };

    let returnToLogin = () => {
      router.back();
    };

    return {
      counter,
      formState,
      formRef,
      rules,
      layout,

      //发送验证吗函数
      sendCode,
      //注册函数
      tryRegister,
      handleFinishFailed,
      handleFinish,
      resetForm,
      handleValidate,
      returnToLogin,
      wrapperCol: { span: 16 },
      labelCol: { style: { fontWeight: "bold", width: "5rem" } },
    };
  },
});
</script>

<style scoped>
.register-main-box {
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
}

.register-box {
  position: relative;
  margin-top: 10rem;
  margin-left: auto;
  margin-right: auto;
  width: 30rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 5px 2px rgba(213, 207, 207, 0.73);
}
.register-form {
  padding: 0px 0px 0px 10%; /*上 右 下 左*/
  top: 5%;
}

.aligncenter {
  height: 130px;
  width: 130px;
  clear: both;
  display: block;
  margin: auto;
}
</style>
