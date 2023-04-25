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
          @blur="log('blur', $event)"/>
    </div>
    <div class="submit">
      <a-space>
        <a-select
            ref="select"
            v-model:value="language"
            style="width: 6rem"
            @change="handleLangChange">
          <a-select-option value="C++">C++</a-select-option>
          <a-select-option value="C">C</a-select-option>
          <a-select-option value="Python">Python</a-select-option>
          <a-select-option value="Java">Java</a-select-option>
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
import axios from "axios";
import {useRoute} from "vue-router";
import store from "@/store";

interface DelayLoading{
  delay: number;
}

export default {
  name: "Submit",
  components:{Codemirror,},
  emits: ['submit'],  // 自定义component事件
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props: any, context: any){
    // 获取路由参数
    const { params } = useRoute()
    const code = ref("");  // 用户编写的代码
    let language = ref("C++");  // 选择的代码语言
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
      if(language.value === "C++" || language.value === "C"){
        // eslint-disable-next-line no-undef
        options.extensions = [cpp(), oneDark]
        if(language.value === "C++") options.mode = "text/x-c++src";
        else if(language.value === "C") options.mode = "text/x-csrc";
      }
      else if(language.value === "Python"){
        // eslint-disable-next-line no-undef
        options.extensions = [python(), oneDark]
        options.mode = "text/x-python";
      }
      else if(language.value === "Java"){
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
      loading.value = { delay: 0 }

      const ConvertLang = (lang: string) => {
        if(lang === "C") return "C"
        else if(lang === "C++") return "C_PLUS_PLUS";
        else if(lang === "Python") return "PYTHON"
        else if(lang === "Java") return "JAVA"
        return "C"
      }

      // TODO: 提交代码, 
      axios.post("http://175.178.221.165:8081/submission/submit_code",
          {
            "language": ConvertLang(language.value),
            "questionId":  params.pro_id,
            "submissionCode": code.value,
          },
          {
            headers: {'Authorization': store.state.token}
          }
      ).then(res=>{
        console.log(res.data)
        loading.value = false;
        context.emit("submit", 1)
      }, err=>{
        console.log(err.data)
      })

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