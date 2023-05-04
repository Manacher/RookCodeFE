<template>
  <div class="login-main-box" style="align-items: center">
    <div id="login-box" class="login-box">
      <h1
        style="
          font-style: italic;
          font-size: 1.5rem;
          font-weight: bold;
          color: #262626;
          padding-top: 1rem;
        "
      >
        RookCode
      </h1>

      <a-form
        class="login-form"
        ref="formRef"
        name="form_login"
        :model="formState_login"
        :rules="rules"
        :wrapper-col="wrapperCol"
        :label-col="labelCol"
      >
        <a-form-item has-feedback name="email" label="邮箱">
          <a-input v-model:value="formState_login.email" />
        </a-form-item>

        <a-form-item
          has-feedback
          label="密码"
          name="email"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState_login.pass" />
        </a-form-item>

        <a-form-item
          label="验证码"
          name="VerificationCode"
          style="padding-top: 0.3rem"
          :rules="[{ required: true, message: '请输入验证码!' }]"
        >
          <a-space direction="horizontal">
            <a-input v-model:value="formState_login.VerificationCode" />
            <img
              :src="imgUrl"
              alt="验证码"
              @click="changeCaptcha"
              style="width: 5rem; height: 1.95rem"
            />
          </a-space>
        </a-form-item>

        <a-form-item style="margin-left: 5.5rem; margin-top: 2.5rem">
          <div style="display: flex; flex-direction: row">
            <a-button
              block
              @click="gotoRegister"
              style="border-radius: 5px; margin-right: 1rem"
              >注册</a-button
            >
            <a-button
              block
              type="primary"
              @click="try_login"
              html-type="submit"
              style="border-radius: 5px; margin-left: 1rem"
              >登录</a-button
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
import { createVNode, defineComponent, onMounted, reactive, ref } from "vue";
import type { FormInstance } from "ant-design-vue";
import router from "@/router";
import { Modal, notification } from "ant-design-vue";
import store from "@/store";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

//登录界面的表单
interface FormState_login {
  email: string;
  pass: string;
  VerificationCode: string;
}

export default defineComponent({
  setup() {
    //验证码的地址
    let imgUrl = ref("");
    onMounted(() => {
      changeCaptcha();
    });

    // 更换验证码
    const changeCaptcha = () => {
      //发送一个请求
      axios
        .get("http://175.178.221.165:8081/users/captcha", {
          responseType: "blob",
        })
        .then((res) => {
          let blob = new Blob([res.data], { type: "image/jpeg" });
          console.log(blob);
          const qrUrl = window.URL.createObjectURL(blob);
          imgUrl.value = qrUrl;
        });
    };

    //基本数据类型
    const formRef = ref<FormInstance>();
    //表单实例 返回的是一个对象
    const formState_login = reactive<FormState_login>({
      email: "",
      pass: "",
      VerificationCode: "",
    });

    //尝试登录
    const try_login = () => {
      if (
        formState_login.email != "" &&
        formState_login.pass != "" &&
        formState_login.VerificationCode != ""
      ) {
        axios
          .post(
            "http://175.178.221.165:8081/users/login",
            {
              account: formState_login.email,
              code: formState_login.VerificationCode,
              password: formState_login.pass,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            //判断登录是否成功
            if (res.data.success === true) {
              if (res.data.data.admin === false) {
                //保存用户信息
                //跳转到主页
                Modal.confirm({
                  title: "你是否选择信任此浏览器?",
                  icon: createVNode(ExclamationCircleOutlined),
                  content:
                    "选择信任，将会保存您的登录信息下次直接登录。选择不信任，将会抹除您的登录状态。",
                  okText: "信任",
                  cancelText: "不信任",
                  onOk() {
                    const userInfo = {
                      token: res.data.data.token,
                      account: formState_login.email,
                    };
                    //保存token
                    store.commit("loginSafe", userInfo);
                    console.log("---------------");
                    router.push({ path: "/" });
                  },
                  onCancel() {
                    console.log("Cancel");
                    const userInfo = {
                      token: res.data.data.token,
                      account: formState_login.email,
                    };
                    //保存token
                    store.commit("loginNotSafe", userInfo);
                    router.push({ path: "/" });
                  },
                });
              } else {
                notification["error"]({
                  message: "登录失败",
                  description: "不得使用管理员账户进行登录",
                });
              }
            } else {
              notification["error"]({
                message: "登录失败",
                description: res.data.message,
              });
            }
          });
      }
    };

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

    /*为对应的框设置自定义验证参数*/
    const rules: Record<string, Rule[]> = {
      email: [{ required: true, validator: validaEmail, trigger: "change" }],
    };

    //跳转到登录页面
    const gotoRegister = () => {
      console.log("跳转到注册页面");
      router.push({ path: "/register" });
    };

    return {
      formRef,
      formState_login, //表单
      rules, //表单验证规则
      validaEmail, //邮箱验证
      try_login,

      //获取新的验证码图片
      imgUrl, //图片的地质
      changeCaptcha,
      //跳转
      gotoRegister,
      wrapperCol: { span: 16 },
      labelCol: { style: { fontWeight: "bold", width: "5rem" } },
    };
  },
});
</script>

<style scoped>
.login-main-box {
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
}

.login-box {
  margin-top: 10rem;
  margin-left: auto;
  margin-right: auto;
  width: 30rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 5px 2px rgba(213, 207, 207, 0.73);
}

.login-form {
  padding: 20px 0px 0px 10%; /*上 右 下 左*/
  top: 10%;
}
</style>
