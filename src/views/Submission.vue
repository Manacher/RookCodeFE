<template>
  <div class="title">
    <h2 style="color: gray">{{title}}</h2>
    <h1>提交记录</h1>
  </div>
  <div class="basicInfo">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="12" style="text-align: left">
        <span style="font-weight: bold">{{acNum}}/{{testNum}}</span>个通过测试用例
      </a-col>
      <a-col :span="12" style="text-align: right">
        状态：
        <span v-if="state === '通过'" style="color: green; font-size: large">{{state}}</span>
        <span v-else style="color: red; font-size: large">{{state}}</span>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="12" style="text-align: left">
        执行用时：<span style="font-weight: bold">{{time}}</span><br>
        内存消耗：<span style="font-weight: bold">{{memory}}</span>
      </a-col>
      <a-col :span="12" style="text-align: right">
        提交时间：
        <span style="font-weight: bold">{{moment(date).fromNow()}}</span>
      </a-col>
    </a-row>
  </div>
  <div class="detailInfo" v-if="debugInfo !== ''">
    <span style="color: red">
      {{debugInfo}}
    </span>
  </div>
  <div class="code">
    <a-divider style="height: 0.1rem; color: lightgray"></a-divider>
    <a-row type="flex" align="middle">
      <a-col :span="12" style="text-align: left">
        <h2>提交的代码：{{moment(date).fromNow()}}</h2>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="12" style="text-align: left">
        <span style="color: gray">语言：{{lang}}</span>
      </a-col>
      <a-col :span="12" style="text-align: right">
        <a-button type="primary" @click="handleClick">返回该题</a-button>
      </a-col>
    </a-row>
    <codemirror
        v-model="code"
        placeholder="Your code here..."
        :style="options.style"
        :mode="options.mode"
        :disabled=true
        :extensions="options.extensions"/>
  </div>
</template>

<script lang="ts">
import { Codemirror } from "vue-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import {useRoute, useRouter} from "vue-router";
import {ref} from 'vue'
import moment from "moment/moment";

moment.locale('zh-cn');

export default {
  name: "Submission",
  components: {Codemirror, },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(){
    // 获取路由参数
    const { params } = useRoute()
    const router = useRouter()
    // 需要的变量
    const title = ref("A+B问题")  // 题目标题
    const acNum = ref(15)  // 通过测试数量
    const testNum = ref(20)  // 总共的测试数量
    const state = ref("执行出错")  // 运行结果
    const time = ref("N/A")  // 运行用时
    const memory = ref("N/A")  // 消耗的内存
    const date = ref("2023/01/02")  // 提交日期
    const debugInfo = ref("=================================================================\n" +
        "==42==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000354 at pc 0x00000034c47f bp 0x7ffd6db038f0 sp 0x7ffd6db038e8\n" +
        "READ of size 4 at 0x602000000354 thread T0\n" +
        "    #2 0x7fbb067a30b2  (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)\n" +
        "0x602000000354 is located 0 bytes to the right of 4-byte region [0x602000000350,0x602000000354)\n" +
        "allocated by thread T0 here:")  // 调试输出
    const lang = ref("c++")  // 选择的语言
    const code = ref("int main(){\n" +
        "\tint a = 1;\n" +
        "\treturn 0;\n" +
        "}")  // 提交的代码
    const options = {
      style: { height: "100%" },
      mode: "text/x-c++src",
      extensions: [cpp()], // 传递给CodeMirror EditorState。创建({扩展})
    }


    const handleClick = () => {
      // TODO: 返回题目
      router.push('/problems/')
    }

    return{
      title,
      acNum,
      testNum,
      time,
      memory,
      state,
      date,
      debugInfo,
      lang,
      code,
      options,
      moment,
      handleClick,
    }
  }

}
</script>

<style scoped>
  .title{
    width: 70%;
    margin: auto;
    text-align: left;
    padding: 1rem;
  }
  .basicInfo{
    width: 70%;
    margin: auto;
    border: 0.1rem solid lightgray;
    padding: 1rem;
  }
  .detailInfo{
    width: 70%;
    margin: auto;
    background: rgba(240, 128, 128, 0.25);
    border: 0.1rem solid red;
    padding: 1rem;
  }
  .code{
    width: 70%;
    margin: auto;
    text-align: left;
    overflow-y: hidden;
  }


</style>