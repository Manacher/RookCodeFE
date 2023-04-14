<template>
  <div class="submitView">
    <div class="code">
      <codemirror
          v-model="code"
          placeholder="Your code here..."
          :style="options.style"
          :mode="options.mode"
          :spellcheck="options.spellcheck"
          :autofocus="options.autofocus"
          :indent-with-tab="options.indentWithTab"
          :tabSize="options.tabSize"
          :extensions="options.extensions"
          @ready="log('ready', $event)"
          @change="log('change', $event)"
          @focus="log('focus', $event)"
          @blur="log('blur', $event)"
      />
    </div>
    <div class="submit">
      <a-space>
        <a-select
            ref="select"
            v-model:value="language"
            style="width: 6rem"
            @change="handleLangChange">
          <a-select-option value="cpp">cpp</a-select-option>
          <a-select-option value="c">c</a-select-option>
          <a-select-option value="python">python</a-select-option>
          <a-select-option value="java">java</a-select-option>
        </a-select>
        <a-button type="primary" :loading="loading" @click="handleButtonClick">提交</a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { Codemirror } from "vue-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";
import {ref} from "vue";

interface DelayLoading{
  delay: number;
}

export default {
  name: "Submit",
  components:{Codemirror,},
  emits: ['submit'],  // 自定义component事件
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props: any, context: any){
    const code = ref("");  // 用户编写的代码
    let language = ref("cpp");  // 选择的代码语言
    const options = {
      style: { height: "100%" },
      mode: "text/x-c++src",
      spellcheck: true,
      autofocus: true,
      indentWithTab: true,
      tabSize: 2,
      extensions: [cpp(), oneDark], // 传递给CodeMirror EditorState。创建({扩展})
    }
    const loading = ref<boolean | DelayLoading>(false);  // 用于控制提交按钮状态


    // 监听代码语言的选择
    const handleLangChange = (lang: string) => {
      console.log(lang)
      language.value = lang
      if(language.value === "cpp" || language.value === "c"){
        // eslint-disable-next-line no-undef
        options.extensions = [cpp(), oneDark]
        if(language.value === "cpp") options.mode = "text/x-c++src";
        else if(language.value === "c") options.mode = "text/x-csrc";
      }
      else if(language.value === "python"){
        // eslint-disable-next-line no-undef
        options.extensions = [python(), oneDark]
        options.mode = "text/x-python";
      }
      else if(language.value === "java"){
        // eslint-disable-next-line no-undef
        options.extensions = [java(), oneDark]
        options.mode = "text/x-java";
      }
      else{
        console.log("unknown language")
      }
    }

    // 监听提交按钮
    const handleButtonClick = () =>{
      //TODO
      loading.value = { delay: 0 }

      setTimeout(() => {
        loading.value = false;
      }, 5000);

      debugger
      context.emit("submit", 1)
    }

    return {
      code,
      options,
      language,
      loading,
      log: console.log,
      handleLangChange,
      handleButtonClick,
    };
  }

}
</script>

<style scoped>
  .submitView{
    height: 100%;
  }
  .code{
    height: 95%;
    text-align: left;
    overflow-y: hidden;
  }
  .submit{
    float: right;
    padding: 1rem;
  }
</style>