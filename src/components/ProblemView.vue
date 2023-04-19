<template>
  <div class = "problemView">
    <h3>P{{id}} {{title}}</h3>
    <span style="color: lightgray">难度 </span><span :style="{color: diffColor}">{{difficulty}}</span>
    <a-divider style="height: 0.1rem; background-color: lightgray" />
    <Editor
        v-model="content"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
    />
  </div>
</template>

<script lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import axios from 'axios'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor} from '@wangeditor/editor-for-vue'
import {Boot} from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'

Boot.registerModule(markdownModule)

export default {
  name: "Problem",
  components: { Editor},
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    // 编辑器，工具栏配置
    const toolbarConfig = {}
    const editorConfig = {readOnly :true, scroll: true, autoFocus: false}
    // 题目内容
    const id = "0000"  // 题号
    const title = "A+B 问题"  // 题目标题
    const difficulty = "简单"  // 题目难度
    let diffColor = "#63ec0c"  // ”难度“颜色
    const content = ref("<p>给你一个整数 <code>x</code> ，如果 <code>x</code> 是一个回文整数，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>\n" +
        "\n" +
        "<p>回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。</p>\n" +
        "\n" +
        "<ul>\n" +
        "\t<li>例如，<code>121</code> 是回文，而 <code>123</code> 不是。</li>\n" +
        "</ul>\n" +
        "\n" +
        "<p>&nbsp;</p>\n" +
        "\n" +
        "<p><strong>示例 1：</strong></p>\n" +
        "\n" +
        "<pre><strong>输入：</strong>x = 121\n" +
        "<strong>输出：</strong>true\n" +
        "</pre>\n" +
        "\n" +
        "<p><strong>示例&nbsp;2：</strong></p>\n" +
        "\n" +
        "<pre><strong>输入：</strong>x = -121\n" +
        "<strong>输出：</strong>false\n" +
        "<strong>解释：</strong>从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。\n" +
        "</pre>\n" +
        "\n" +
        "<p><strong>示例 3：</strong></p>\n" +
        "\n" +
        "<pre><strong>输入：</strong>x = 10\n" +
        "<strong>输出：</strong>false\n" +
        "<strong>解释：</strong>从右向左读, 为 01 。因此它不是一个回文数。\n" +
        "</pre>\n" +
        "\n" +
        "<p>&nbsp;</p>\n" +
        "\n" +
        "<p><strong>提示：</strong></p>\n" +
        "\n" +
        "<ul>\n" +
        "\t<li><code>-2<sup>31</sup>&nbsp;&lt;= x &lt;= 2<sup>31</sup>&nbsp;- 1</code></li>\n" +
        "</ul>\n" +
        "\n" +
        "<p>&nbsp;</p>\n" +
        "\n" +
        "<p><strong>进阶：</strong>你能不将整数转为字符串来解决这个问题吗？</p>")


    // ajax 异步获取后端数据
    onMounted(() => {
      axios({
        url: "http://175.178.221.165:8081/",
        params:{
          id: 1,
        }
      }).then(res=>{
        debugger
        console.log(res.data)
      },err=>{
        debugger
        console.log(err.data)
      })
    })

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    // 创建编辑器后
    const handleCreated = (editor: any) => {
      editorRef.value = editor // 记录 editor 实例，重要！

    }

    return {
      editorRef,
      id,
      title,
      difficulty,
      diffColor,  // ”难度“字体颜色
      content,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated
    };
  }

}
</script>

<style scoped>
  .problemView{
    overflow-y: hidden;
    text-align: left
  }


</style>