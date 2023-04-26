<template>
  <div class="create-solution">
    <a-input v-model:value="title" placeholder="此处输入标题" :bordered="false" style="font-size: xx-large;"/>
    <a-select
        v-model:value="selectTags"
        mode="multiple"
        style="width: 100%"
        placeholder="添加编程语言、方法、知识点等标签"
        :options="tagList"
        :bordered="false"
    ></a-select>
    <a-divider></a-divider>
    <div class="editor">
      <Toolbar
          :editor="editorRef"
          :mode="mode"
      />
      <Editor
          v-model="content"
          :defaultConfig="editorConfig"
          :mode="mode"
          style="height: 30rem"
          @onCreated="editorCreated"
      />
    </div>
    <div class="submit">
      <a-space>
        <a-popconfirm
            title="确定取消发布题解吗？您将丢失所有编辑记录。"
            ok-text="确定"
            cancel-text="取消"
            @confirm="confirm"
            @cancel="cancel">
          <a-button>取消发布</a-button>
        </a-popconfirm>
        <a-button type="primary" @click="onPublish">发布题解</a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import {onBeforeUnmount, ref, shallowRef, h, onMounted} from "vue";
import type { SelectProps } from 'ant-design-vue';
import { notification } from 'ant-design-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {Boot} from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'
import {useRoute} from 'vue-router';
import router from "@/router";
import axios from "axios";
import store from "@/store";
import {CheckCircleOutlined} from "@ant-design/icons-vue"

Boot.registerModule(markdownModule)

export default {
  name: "CreateSolution",
  components: {Editor, Toolbar},

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(){
    // 获取路由参数
    const {params} = useRoute()
    const title = ref("")
    const selectTags = ref([])
    const tagList = ref<SelectProps['options']>([])
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    // 编辑器，工具栏配置
    const editorConfig = {readOnly :false, scroll: true}
    const content = ref("")


    // ajax 异步获取后端数据
    onMounted(() => {
      axios.get("http://175.178.221.165:8081/solutions/getAllTags",
      ).then(res=>{
        const success = res.data.success
        const message = res.data.message
        const data = res.data.data
        const list = data.split("_")
        tagList.value = []
        for(let i=0;i<list.length;i++){
          tagList.value.push({
            value: list[i],
            label: list[i],
          });
        }
      }, err=>{
        console.log(err.data)
      })
    })

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      let editor = editorRef.value
      if (editor == null) return
      editor.destroy()
      editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    // 创建编辑器后
    const editorCreated = (editor: any) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    // 确定取消发布
    const confirm = (e: MouseEvent) => {
      //router.push('/problems/'+params.pro_id)
      router.back()
    }

    // 继续发布
    const cancel = (e: MouseEvent) => {
      console.log(e);
    }

    // 发布题解
    const onPublish = () => {
      const List2String = (list: never[]) => {
        let str = ""
        for(let data of list){
          str += data + '_'
        }
        return str
      }

      axios.post("http://175.178.221.165:8081/solutions/pubSolution",
          {
            'content': editorRef.value.getHtml(),
            'questionId': Number(params.pro_id),
            'tags': List2String(selectTags.value),
            'title': title.value,
          },
          {
            headers: {'Authorization': store.state.token}
          }
      ).then(res => {  // 发布成功
        notification.open({
          message: '题解发布成功',
          description: '',
          icon: () => h(CheckCircleOutlined, { style: 'color: #008000' }),
        });
        router.push('/problems/'+params.pro_id+'/solution/'+res.data.data)  // TODO: id?
      }, err => {  // 发布失败
        console.log(err.data)
      })
    }

    return {
      params,
      title,
      selectTags,
      tagList,
      editorRef,
      content,
      mode: "default",
      editorConfig,
      editorCreated,
      confirm,
      cancel,
      onPublish,
    }
  }

}
</script>

<style scoped>
  .create-solution{
    margin: auto;
    text-align: left;
    background: #FFFFFF;
  }
  .editor{
    border: solid 0.1rem lightgray;
  }
  .submit{
    padding: 0.5rem;
    text-align: right;
  }


</style>