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
        <span v-if="state === 'ACCEPT'" style="color: green; font-size: large">{{state}}</span>
        <span v-else style="color: red; font-size: large">{{state}}</span>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="12" style="text-align: left">
        执行用时：<span style="font-weight: bold">{{time}} ms</span><br>
        内存消耗：<span style="font-weight: bold">{{memory}} KB</span>
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
import {useRoute} from "vue-router";
import router from "@/router"
import {onMounted, ref} from 'vue'
import moment from "moment/moment";
import axios from "axios";
import {oneDark} from "@codemirror/theme-one-dark";

moment.locale('zh-cn');

export default {
  name: "Submission",
  components: {Codemirror, },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(){
    // 获取路由参数
    const { params } = useRoute()
    // 需要的变量
    const title = ref("A+B问题")  // 题目标题
    const acNum = ref(15)  // 通过测试数量
    const testNum = ref(20)  // 总共的测试数量
    const state = ref("执行出错")  // 运行结果
    const time = ref("N/A")  // 运行用时
    const memory = ref("N/A")  // 消耗的内存
    const date = ref("2023/01/02")  // 提交日期
    const debugInfo = ref("")  // 调试输出
    const lang = ref("C++")  // 选择的语言
    const code = ref("int main(){\n" +
        "\tint a = 1;\n" +
        "\treturn 0;\n" +
        "}")  // 提交的代码
    const options = {
      style: { height: "100%" },
      mode: "text/x-c++src",
      extensions: [cpp()], // 传递给CodeMirror EditorState。创建({扩展})
    }
    const pro_id = ref(-1)  // 对应的问题的id


    // ajax异步请求数据
    onMounted(() => {
      axios.get("http://175.178.221.165:8081/records/GetRecordsDetail/"+params.sub_id,
      ).then(res=>{
        const data = res.data.data
        time.value = data.execTime
        debugInfo.value = data.extraInfo
        lang.value = data.langName
        memory.value = data.memory
        pro_id.value = data.questionId
        title.value = data.questionTitle
        state.value = data.result
        code.value = data.submitCode
        date.value = data.submitDate
        acNum.value = data.testCaseAccessNum
        testNum.value = data.testCaseTotalNum
        if(lang.value === "C++" || lang.value === "C"){
          options.extensions = [cpp()]
          if(lang.value === "C++") options.mode = "text/x-c++src";
          else if(lang.value === "C") options.mode = "text/x-csrc";
        }
        else if(lang.value === "Python"){
          options.extensions = [python()]
          options.mode = "text/x-python";
        }
        else if(lang.value === "Java"){
          options.extensions = [java()]
          options.mode = "text/x-java";
        }
        else{
          console.log("unknown language")
        }
      }, err=>{
        console.log(err.data)
      })
    })

    const handleClick = () => {  // 返回题目
      router.push('/problems/'+pro_id.value)
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
    text-align: left;
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