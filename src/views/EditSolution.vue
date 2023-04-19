<template>
  <div class="edit-solution">
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
            @confirm="confirmUpdate"
            @cancel="cancelUpdate">
          <a-button>取消修改</a-button>
        </a-popconfirm>
        <a-button type="primary">更新题解</a-button>
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
  name: "EditSolution",
  components: {Editor, Toolbar},

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(){
    const title = ref("A+B 问题的详细题解")
    const selectTags = ref(["dfs", "bfs"])
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
    const editorConfig = {readOnly :false, scroll: true, autoFocus: false}
    const content = ref("首先..., 然后..., 最后...")



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
    const confirmUpdate = (e: MouseEvent) => {
      //TODO

    }

    // 继续更新
    const cancelUpdate = (e: MouseEvent) => {
      console.log(e);
    }

    // 确定删除
    const confirmDelete = (e: MouseEvent) => {
      //TODO

    }

    // 取消删除
    const cancelDelete = (e: MouseEvent) => {
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
      confirmUpdate,
      cancelUpdate,
      confirmDelete,
      cancelDelete,
    }
  }

}
</script>

<style scoped>
.edit-solution{
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