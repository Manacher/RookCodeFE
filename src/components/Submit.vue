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
            style="width: 100px"
            @focus="focus"
            @change="handleLangChange">
          <a-select-option value="cpp">cpp</a-select-option>
          <a-select-option value="c">c</a-select-option>
          <a-select-option value="python">python</a-select-option>
          <a-select-option value="java">java</a-select-option>
        </a-select>
        <a-button type="primary">提交</a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
import { Codemirror } from "vue-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";
import {reactive, ref} from "vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Submit",
  components:{Codemirror,},
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(){
    const code = ref("");  // 用户编写的代码
    let language = "cpp";  // 选择的代码语言
    const options = reactive({
      style: { height: "400px" },
      mode: "text/x-c++src",
      spellcheck: true,
      autofocus: true,
      indentWithTab: true,
      tabSize: 2,
      extensions: [cpp(), oneDark], // 传递给CodeMirror EditorState。创建({扩展})
    });


    // 监听代码语言的选择
    const handleLangChange = (lang) => {
      console.log(lang)
      language = lang
      if(language === "cpp" || language === "c"){
        // eslint-disable-next-line no-undef
        options.extensions = [cpp(), oneDark]
        if(language === "cpp") options.mode = "text/x-c++src";
        else if(language === "c") options.mode = "text/x-csrc";
      }
      else if(language === "python"){
        // eslint-disable-next-line no-undef
        options.extensions = [python(), oneDark]
        options.mode = "text/x-python";
      }
      else if(language === "java"){
        // eslint-disable-next-line no-undef
        options.extensions = [java(), oneDark]
        options.mode = "text/x-java";
      }
      else{
        console.log("unknown language")
      }
    }

    return {
      code,
      options,
      language,
      log: console.log,
      handleLangChange,
    };
  }

}
</script>

<style scoped>
  .submitView{
    width: 800px;
  }
  .code{
    text-align: left;
    overflow-y: hidden;
  }
  .submit{
    float: right;
    padding: 10px;
  }

</style>