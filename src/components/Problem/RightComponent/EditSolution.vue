<template>
  <div class="edit-solution">
    <a-input v-model:value="title" placeholder="此处输入标题" :bordered="false" style="font-size: xx-large"/>
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
            title="确定删除这篇题解吗？删除后不可恢复。"
            ok-text="确定"
            cancel-text="取消"
            @confirm="confirmDelete"
            @cancel="cancelDelete">
          <a-button type="primary" danger>删除</a-button>
        </a-popconfirm>
        <a-popconfirm
            title="确定取消更新题解吗？您将丢失所有编辑记录。"
            ok-text="确定"
            cancel-text="取消"
            @confirm="confirmQuit"
            @cancel="cancelQuit">
          <a-button>取消修改</a-button>
        </a-popconfirm>
        <a-button type="primary" @click="onUpdate">更新题解</a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import {h, onBeforeUnmount, onMounted, ref, shallowRef} from "vue";
import type { SelectProps } from 'ant-design-vue';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {Boot} from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'
import axios from "axios";
import {useRoute} from "vue-router";
import router from "@/router";
import store from "@/store";
import {notification} from "ant-design-vue";
import {CheckCircleOutlined} from "@ant-design/icons-vue";

Boot.registerModule(markdownModule)

export default {
  name: "EditSolution",
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
    const editorConfig = {readOnly :false, scroll: true, autoFocus: false}
    const content = ref("")


    // ajax 异步获取后端数据
    onMounted(() => {
      axios.post("http://175.178.221.165:8081//solutions/getSolutionsById",
          {
            'id': params.sln_id,
          }
      ).then(res=>{
        const success = res.data.success
        const message = res.data.message
        const data = res.data.data
        content.value = data.content
        title.value = data.title
        selectTags.value = data.tags.split("_")

      },err=>{
        console.log(err.data)
      })

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

    // 确定取消更新
    const confirmQuit = (e: MouseEvent) => {
      //TODO
      router.back()
    }

    // 继续更新
    const cancelQuit = (e: MouseEvent) => {
      console.log(e);
    }

    // 确定删除
    const confirmDelete = (e: MouseEvent) => {
      //TODO
      axios.post("http://175.178.221.165:8081/solutions/deleteSolution",
          {
            "id": params.sln_id,
          },
          {
            headers: {'Authorization': store.state.token}
          }
      ).then(res=>{
        console.log(res.data)
        notification.open({
          message: '题解删除成功',
          description: '',
          icon: () => h(CheckCircleOutlined, { style: 'color: #008000' }),
        });
      }, err=>{
        console.log(err)
      })
    }

    // 取消删除
    const cancelDelete = (e: MouseEvent) => {
      console.log(e);
    }

    // 确定修改题解
    const onUpdate = () => {
      const List2String = (list: never[]) => {
        let str = ""
        for(let data of list){
          str += data + '_'
        }
        return str
      }

      axios.post("http://175.178.221.165:8081/solutions/updateSolution",
          {
            'content': content.value,
            'solution_id': Number(params.sln_id),
            'tags': List2String(selectTags.value),
            'title': title.value
          },
          {
            headers: {'Authorization': store.state.token}
          }
      ).then(res=>{
        notification.open({
          message: '题解更新成功',
          description: '',
          icon: () => h(CheckCircleOutlined, { style: 'color: #008000' }),
        });
        router.push('/problems/'+params.pro_id+'/solution/'+res.data.data.id_new)
      }, err=>{
        console.log(err)
      })
    }

    return {
      title,
      selectTags,
      tagList,
      editorRef,
      content,
      mode: "default",
      editorConfig,
      editorCreated,
      confirmQuit,
      cancelQuit,
      confirmDelete,
      cancelDelete,
      onUpdate,
    }
  }

}
</script>

<style scoped>
.edit-solution{
  margin: auto;
  text-align: left;
  background: white;
}
.editor{
  border: solid 0.1rem lightgray;
}
.submit{
  padding: 0.5rem;
  text-align: right;
}


</style>