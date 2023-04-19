<template>
  <div class="create-solution">
    <a-input v-model:value="title" placeholder="此处输入标题" :bordered="false" style="font-size: xx-large"/>
    <a-select
        v-model:value="selectTags"
        mode="tags"
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
          style="height: 35rem"
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
        <a-button type="primary">发布题解</a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import {onBeforeUnmount, ref, shallowRef} from "vue";
import type { SelectProps } from 'ant-design-vue';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {Boot} from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'

Boot.registerModule(markdownModule)

export default {
  name: "CreateSolution",
  components: {Editor, Toolbar},

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(){
    const title = ref("")
    const selectTags = ref([])
    const tagList = ref<SelectProps['options']>([
      {
        value: 'dfs',
        label: 'dfs',
      },
      {
        value: 'bfs',
        label: 'bfs',
      },
      {
        value: '回溯',
        label: '回溯',
      },
      {
        value: '动态规划',
        label: '动态规划',
      },
    ])
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    // 编辑器，工具栏配置
    const editorConfig = {readOnly :false, scroll: true}
    const content = ref("")




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
      //TODO

    }

    // 继续发布
    const cancel = (e: MouseEvent) => {
      console.log(e);
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
      confirm,
      cancel,
    }
  }

}
</script>

<style scoped>
  .create-solution{
    width: 60%;
    margin: auto;
    text-align: left;
  }
  .editor{
    border: solid 0.1rem lightgray;
  }
  .submit{
    padding: 0.5rem;
    text-align: right;
  }


</style>