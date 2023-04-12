<template>
  <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      class="login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >



    <h3 class="login-title">欢迎登录</h3>
<!--   需要加入邮箱校验规则 -->
    <a-form-item
        label="邮箱："
        name="username"
        :rules="[{ required: true, message: '请输入邮箱！' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
        label="密码："
        name="password"
        :rules="[{ required: true, message: '请输入密码！' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>


    <a-row>
      <a-col :span="12">
        <a-form-item name="remember" :wrapper-col="{ offset: 15 }">
          <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <router-link to="/register">注册账号</router-link>
      </a-col>
    </a-row>


    <a-form-item :wrapper-col="{ span: 24, offset: 8 }">
      <a-space :size="size">
        <a-button type="primary" html-type="submit">登录</a-button>
        <a-button style="margin-left: 10px" @click="() => formRef.resetFields()">重置</a-button>
      </a-space>

    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive,ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
export default defineComponent({
  setup() {
    const formRef = ref<FormInstance>();
    const formState = reactive<FormState>({
      username: '',
      password: '',
      remember: true,
    });

    const onFinish = (values: any) => {
      console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    return {
      formState,
      formRef,
      onFinish,
      onFinishFailed,
      size:100,
    };
  },
});
</script>


<style scoped>
.layout {
 /* background: url("assets/login-background-1.jpg");*/
  background-size: 100% 100%;
}

.login-form {
  background: #fff;
  border: 5px solid #fff;
  border-radius: 5px;
  width: 50%;
  position: relative;
  margin: 0 auto;
  padding: 0px 0px 0px 0px;/*上 右 下 左*/
  top: 50%;
  transform: translateY(150%);
}


.login-title {
  text-align: center;
 /* margin: 0 auto 40px auto;*/
  padding: 0px 0px 0px 200px;
  color: #303133;
}


</style>