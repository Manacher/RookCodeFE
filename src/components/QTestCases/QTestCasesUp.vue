<template>
  <a-layout  class="qtestcasesup-main-box">
    <a-form
        style="padding-top: 1rem;padding-left: 0rem"
        ref="formRef"
        name="dynamic_form_item"
        :model="dynamicValidateForm"
    >
      <div v-for="(domain) in dynamicValidateForm.domains"
           :key="domain.key"
            style="padding-bottom: 0.1rem">
        <!--输入，输出    -->
        <a-row>
          <a-col :span="2">
            <h4
                style="text-align: left ;
            padding-left: 4px;
            font-weight: bold;
            font-family:'宋体',serif;
            font-size: 17px;
            float: left">输入：
            </h4>
          </a-col>
          <a-col :span="8">
            <a-form-item name="input">
              <a-input
                  v-model:value="domain.input"
                  style="width: 100%;float: left;"
                  placeholder="测试输入"
              />
            </a-form-item>

          </a-col>
          <a-col :span="2">
            <h4
                style="text-align: left ;
            padding-left: 4px;
            font-weight: bold;
            font-family:'宋体',serif;
            font-size: 17px;
            float: left;
            padding-left: 1rem">输出：
            </h4>
          </a-col>
          <a-col :span="8">
            <a-form-item has-feedback name="output">
              <a-input
                  v-model:value="domain.output"
                  style="width: 100%;float: left"
                  placeholder="测试输出" />
            </a-form-item>

          </a-col>
          <a-col :span="4">
            <MinusCircleOutlined
                v-if="dynamicValidateForm.domains.length > 1"
                class="dynamic-delete-button"
                :disabled="dynamicValidateForm.domains.length === 1"
                @click="removeDomain(domain)"
            />
          </a-col>
        </a-row>
      </div>

      <a-form-item>
        <a-button type="dashed" style="width: 50%" @click="addDomain">
          <PlusOutlined />
          添加测试用例
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button
            type="primary"  @click="submitForm"
            style="width: 50%;background-color:green" html-type="submit">上传</a-button>
<!--        <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>-->
      </a-form-item>
    </a-form>
  </a-layout>


</template>
<script lang="ts">
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, ref,h } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { SmileOutlined } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
interface Domain {
  input: string;
  output:string,
  key: number;
}
export default defineComponent({
  components: {
    MinusCircleOutlined,
    PlusOutlined,
  },
  setup() {
    const formRef = ref<FormInstance>();

    const dynamicValidateForm = reactive<{ domains: Domain[] }>({
      domains: [],

    });

    //提交表单
    const submitForm = () => {
      //发送请求，上传字符串


    };


    //移除域
    const removeDomain = (item: Domain) => {
      let index = dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.domains.splice(index, 1);
      }
    };

    //添加域
    const addDomain = () => {

      //不能超过10条测试用例
      let len=dynamicValidateForm.domains.length
      if(len<10){
        dynamicValidateForm.domains.push({
          input: '',
          output:'',
          key: Date.now(),
        });
      }else{
        notification.open({
          message: '提醒',
          description:
              '测试数据最多为10条!',
          icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
        });
      }


    };
    return {
      formRef,

      //数据
      dynamicValidateForm,

      //提交表单的信息
      submitForm,

      removeDomain,
      addDomain,
    };
  },
});
</script>
<style>


.qtestcasesup-main-box{

  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
  border-radius: 5px;
}
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
