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

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
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
    const editorConfig = {readOnly :true, scroll: true}
    // 题目内容
    const id = "0000"  // 题号
    const title = "A+B 问题"  // 题目标题
    const difficulty = "简单"  // 题目难度
    let diffColor = "#63ec0c"  // ”难度“颜色
    const content = ref("<p>给你一个字符串 <code>s</code> ，请你统计并返回这个字符串中 <strong>回文子串</strong> 的数目。</p><p><strong>回文字符串</strong> 是正着读和倒过来读一样的字符串。</p>\n" +
        "\n" +
        "<p><strong>子字符串</strong> 是字符串中的由连续字符组成的一个序列。</p>\n" +
        "\n" +
        "<p>具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。</p>\n" +
        "\n" +
        "<p>&nbsp;</p>\n" +
        "\n" +
        "<p><strong>示例 1：</strong></p>\n" +
        "\n" +
        "<pre><strong>输入：</strong>s = \"abc\"\n" +
        "<strong>输出：</strong>3\n" +
        "<strong>解释：</strong>三个回文子串: \"a\", \"b\", \"c\"\n" +
        "</pre>\n" +
        "\n" +
        "<p><strong>示例 2：</strong></p>\n" +
        "\n" +
        "<pre><strong>输入：</strong>s = \"aaa\"\n" +
        "<strong>输出：</strong>6\n" +
        "<strong>解释：</strong>6个回文子串: \"a\", \"a\", \"a\", \"aa\", \"aa\", \"aaa\"</pre>\n" +
        "\n" +
        "<p>&nbsp;</p>\n" +
        "\n" +
        "<p><strong>提示：</strong></p>\n" +
        "\n" +
        "<ul>\n" +
        "\t<li><code>1 &lt;= s.length &lt;= 1000</code></li>\n" +
        "\t<li><code>s</code> 由小写英文字母组成</li>\n" +
        "</ul>")


    // ajax 异步获取后端数据
    onMounted(() => {
      console.log("get data")

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