<template>
  <div class="submitView">


    <div class="lang-select">

      <div style="float: left; margin-top: 0.5rem; color: #bfbfbf">
        当前所用语言：
      </div>

      <a-select
          ref="select"
          v-model:value="language"
          style="width: 6rem; float: left; background: #f7f7f7; margin-top: 0.5rem"
          size="small"
          @change="handleLangChange">
        <a-select-option value="C++">C++</a-select-option>
        <a-select-option value="C">C</a-select-option>
        <a-select-option value="Python">Python</a-select-option>
        <a-select-option value="Java">Java</a-select-option>
      </a-select>


    </div>


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
          class="myCodeMirror"
          @ready="log('ready', $event)"
          @change="log('change', $event)"
          @focus="log('focus', $event)"
          @blur="log('blur', $event)"/>
    </div>
    <div class="submitInfo" v-if="showInfo">
      <div class="basicInfo">
        <a-row type="flex" justify="space-around" align="middle">
          <a-col :span="12" style="text-align: left">
            <span style="font-weight: bold">{{ acNum }}/{{ testNum }}</span>个通过测试用例
          </a-col>
          <a-col :span="12" style="text-align: right">
            状态：
            <span v-if="state === 'ACCEPT'" style="color: green; font-size: large">{{ state }}</span>
            <span v-else style="color: red; font-size: large">{{ state }}</span>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around" align="middle">
          <a-col :span="12" style="text-align: left">
            执行用时：<span style="font-weight: bold">{{ time }} ms</span>
          </a-col>
          <a-col :span="12" style="text-align: right">
            内存消耗：
            <span style="font-weight: bold">{{ memory }} KB</span>
          </a-col>
        </a-row>
      </div>
      <div class="detailInfo" v-if="debugInfo !== ''">
        <span style="color: red">
          {{ debugInfo }}
        </span>
      </div>
    </div>

    <div class="submit">
      <a-space>
        <a-button type="primary" :loading="loading"  @click="handleButtonClick">提交</a-button>
      </a-space>
    </div>

  </div>
</template>

<script lang="ts">
import {Codemirror} from "vue-codemirror";
import {cpp} from "@codemirror/lang-cpp";
import {python} from "@codemirror/lang-python";
import {java} from "@codemirror/lang-java";
import {oneDark} from "@codemirror/theme-one-dark";
import {ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import store from "@/store";

interface DelayLoading {
  delay: number;
}

export default {
  name: "Submit",
  components: {Codemirror,},
  emits: ['submit'],  // 自定义component事件
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props: any, context: any) {
    // 获取路由参数
    const {params} = useRoute()
    const code = ref("");  // 用户编写的代码
    let language = ref("C++");  // 选择的代码语言
    const options = {
      style: {height: "100%"},
      mode: "text/x-c++src",
      spellcheck: true,
      autofocus: true,
      indentWithTab: true,
      tabSize: 2,
      extensions: [cpp(), oneDark], // 传递给CodeMirror EditorState。创建({扩展})
    }
    const loading = ref<boolean | DelayLoading>(false);  // 用于控制提交按钮状态
    const showInfo = ref(false)  // 控制提交代码后返回信息的显示
    const acNum = ref(0)  // 通过测试数量
    const testNum = ref(0)  // 总共的测试数量
    const state = ref("")  // 运行结果
    const time = ref("")  // 运行用时
    const memory = ref("")  // 消耗的内存
    const debugInfo = ref("")  // 返回的调试信息


    // 监听代码语言的选择
    const handleLangChange = (lang: string) => {
      console.log(lang)
      language.value = lang
      if (language.value === "C++" || language.value === "C") {
        options.extensions = [cpp(), oneDark]
        if (language.value === "C++") options.mode = "text/x-c++src";
        else if (language.value === "C") options.mode = "text/x-csrc";
      } else if (language.value === "Python") {
        options.extensions = [python(), oneDark]
        options.mode = "text/x-python";
      } else if (language.value === "Java") {
        options.extensions = [java(), oneDark]
        options.mode = "text/x-java";
      } else {
        console.log("unknown language")
      }
    }

    // 监听提交按钮
    const handleButtonClick = () => {
      loading.value = {delay: 0}

      const ConvertLang = (lang: string) => {
        if (lang === "C") return "C"
        else if (lang === "C++") return "C_PLUS_PLUS";
        else if (lang === "Python") return "PYTHON"
        else if (lang === "Java") return "JAVA"
        return "C"
      }

      // TODO: 提交代码,
      axios.post("http://175.178.221.165:8081/submission/submit_code",
          {
            "language": ConvertLang(language.value),
            "questionId": params.pro_id,
            "submissionCode": code.value,
          },
          {
            headers: {'Authorization': store.state.token}
          }
      ).then(res => {
        const data = res.data.data
        loading.value = false;
        showInfo.value = true
        acNum.value = data.accessNum
        testNum.value = data.totalNum
        state.value = data.judgeCondition
        debugInfo.value = data.extraInfo
        time.value = data.timeCost
        memory.value = data.memoryCost
      }, err => {
        console.log(err.data)
      })

    }

    return {
      code,
      options,
      language,
      loading,
      showInfo,
      acNum,
      testNum,
      state,
      time,
      memory,
      debugInfo,
      log: console.log,
      handleLangChange,
      handleButtonClick,
    };
  }

}
</script>

<style scoped>

.lang-select {
  background-color: #f5f5f5;
  height: 2.45rem;
}


.submitView {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.code {
  text-align: left;
  overflow-y: hidden;
  flex-grow: 1;
  overflow-x: hidden;
}

.submitInfo {
  padding-top: 1rem;
}

.basicInfo {
  border: 0.1rem solid lightgray;
  padding: 1rem;
}

.detailInfo {
  background: rgba(240, 128, 128, 0.25);
  border: 0.1rem solid red;
  padding: 1rem;
  text-align: left;
}

.submit {
  text-align: right;
  padding-top: 0.5rem;
  padding-right: 1rem;
  background: #f7f7f7;
}


.myCodeMirror >>> .cm-scroller::-webkit-scrollbar {
  height: 0.4rem;
}

.myCodeMirror >>> .cm-scroller::-webkit-scrollbar-track {
  background: rgb(144, 151, 164);
}

.myCodeMirror >>> .cm-scroller::-webkit-scrollbar-thumb  {
  background: #ffffff;
  border-radius: 0.5rem;
}

</style>