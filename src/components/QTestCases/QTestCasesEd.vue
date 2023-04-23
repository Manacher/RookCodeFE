<template>
  <a-layout  class="qtestcasesed-main-box">
    <a-form
        style="padding-top: 1rem;"
        ref="formRef"
        name="dynamic_form_item"
        :model="dynamicValidateForm"
    >
      <div
          v-for="(domain) in dynamicValidateForm.domains"
          :key="domain.key"
      >
        <!--输入，输出    -->
        <a-row>
          <a-col :span="1">
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
            <a-form-item>
              <a-input
              style="width: 100%;float: left;"
              placeholder="测试输入"
              v-model:value="domain.input"
              :disabled="domain.disabled"
              />
            </a-form-item>

          </a-col>
          <a-col :span="1"></a-col>
          <a-col :span="1">
            <h4
                style="text-align: left ;
            font-weight: bold;
            font-family:'宋体',serif;
            font-size: 17px;
            float: left;
            padding-left: 0rem">输出：
            </h4>
          </a-col>
          <a-col :span="8">
            <a-form-item>
              <a-input
                  style="width: 100%;float: left"
                  placeholder="测试输出"
                  v-model:value="domain.output"
                  :disabled="domain.disabled"/>
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-space :size="10">
              <a-button style="background-color:green;color: gainsboro;border-radius: 4px"
              @click="editAndUpload(domain)">
                {{ domain.disabled === true ? '编辑' : '上传' }}</a-button>
              <a-button style="background-color:firebrick;color: gainsboro;border-radius: 4px"
              @click="removeDomain(domain)">删除</a-button>
            </a-space>
          </a-col>
        </a-row>
      </div>
      <a-form-item>
        <a-button type="dashed" style="width: 50%" @click="addDomain">
          <PlusOutlined />
          添加测试用例
        </a-button>
      </a-form-item>

    </a-form>
  </a-layout>


</template>
<script lang="ts">
import { PlusOutlined,SmileOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, ref,h,createVNode } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { notification } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

interface Domain {
  input: string;
  output:string;
  disabled:boolean
  key: number;
}
export default defineComponent({
  components: {
    PlusOutlined,
  },
  setup() {
    const formRef = ref<FormInstance>();

    const dynamicValidateForm = reactive<{ domains: Domain[] }>({
      domains: [
        {input:"22 33 44",output:"33 444",disabled:true,key:0},
        {input:"22 33 44",output:"33 444",disabled:true,key:1},
        {input:"22 33 44",output:"33 444",disabled:true,key:2},
        {input:"22 33 44",output:"33 444",disabled:true,key:3},
        {input:"22 33 44",output:"33 444",disabled:true,key:4},
        {input:"22 33 44",output:"33 444",disabled:true,key:5},
        {input:"22 33 44",output:"33 444",disabled:true,key:6},
      ],
    });


    //重置表单
    const resetForm = () => {
      //formRef.value.resetFields();
    };

    //移除域
    const removeDomain = (item: Domain) => {

      //直接删除
      if(item.key==-626){
        let index = dynamicValidateForm.domains.indexOf(item);
        if (index !== -1) {
          dynamicValidateForm.domains.splice(index, 1);
        }
      }
      else{
        //弹出对话框询问是否真的要删除
        Modal.confirm({
          title: '你确定删除该测试用例吗?',
          icon: createVNode(ExclamationCircleOutlined),
          content: '该用例将会被永久删除，无法恢复!',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            console.log('OK');

            //发送axiso请求
            //注意键值的操作


            let index = dynamicValidateForm.domains.indexOf(item);
            if (index !== -1) {
              dynamicValidateForm.domains.splice(index, 1);
            }



          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    };

    //添加测试用例
    const addDomain = () => {

      //不能超过10条测试用例
      let len=dynamicValidateForm.domains.length
      if(len<10){
        dynamicValidateForm.domains.push({
          input: '',
          output:'',
          disabled:false,
          key: -626,//特定的键值
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

    //编辑或者上传
    const editAndUpload=(item: Domain)=>{

      //按钮被禁用了，这时候就打开 这个时候进入编辑模式
      if(item.disabled){

        let index = dynamicValidateForm.domains.indexOf(item);
        dynamicValidateForm.domains[index].disabled=false;
      }else{


        //发送请求，完成修改
        if(item.input==""||item.output==""){
          notification.open({
            message: '提示！',
            description:
                '输入输出不得为空!',
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
        }else{

          //发送请求，告知修改

          //再次禁用
          let index = dynamicValidateForm.domains.indexOf(item);
          dynamicValidateForm.domains[index].disabled=true;
        }




      }


    }

    return {
      formRef,

      //数据
      dynamicValidateForm,
      //编辑或者上传
      editAndUpload,

      resetForm,
      removeDomain,
      addDomain,
    };
  },
});
</script>
<style>


.qtestcasesed-main-box{

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
