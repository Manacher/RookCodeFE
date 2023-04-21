<template>


  <a-layout  class="qtestcases-main-box">
    <a-form
        style="padding-top: 1rem;padding-left: 0rem"
        ref="formRef"
        name="dynamic_form_item"
        :model="dynamicValidateForm"
    >
      <a-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :key="domain.key"
          :name="['domains', index, 'value']"
          :rules="{required: true,message: 'domain can not be null',trigger: 'change',
      }"
      >
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
            <a-input
                style="width: 100%;float: left;"
                placeholder="测试输入" />
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
            <a-input
                style="width: 100%;float: left"
                placeholder="测试输出" />
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
      </a-form-item>
      <a-form-item>
        <a-button type="dashed" style="width: 50%" @click="addDomain">
          <PlusOutlined />
          添加测试用例
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary"  @click="submitForm" style="width: 50%">上传</a-button>
<!--        <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>-->
      </a-form-item>
    </a-form>
  </a-layout>


</template>
<script lang="ts">
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';

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
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const dynamicValidateForm = reactive<{ domains: Domain[] }>({
      domains: [],
    });
    const submitForm = () => {
      formRef.value
          .validate()
          .then(() => {
            console.log('values', dynamicValidateForm.domains);
          })
          .catch(error => {
            console.log('error', error);
          });
    };
    //重置表单
    const resetForm = () => {
      //formRef.value.resetFields();
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
      dynamicValidateForm.domains.push({
        input: '',
        output:'',
        key: Date.now(),
      });
    };
    return {
      formRef,
      formItemLayout,
      formItemLayoutWithOutLabel,
      dynamicValidateForm,
      submitForm,
      resetForm,
      removeDomain,
      addDomain,
    };
  },
});
</script>
<style>


.qtestcases-main-box{

  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
  background-color: #d1c2d3;
  border-radius: 5px;
  box-shadow: 0 0 5px 1px #999;


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
