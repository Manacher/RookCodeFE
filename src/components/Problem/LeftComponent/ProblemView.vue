<template>
  <div class="problemView">
    <div v-if="loading">
      <a-skeleton active size="small" />
      <a-divider style="background-color: lightgray" />
      <a-skeleton active />
    </div>

    <div v-if="!loading">
      <h3>P{{ (Array(4).join("0") + String(id)).slice(-4) }} {{ title }}</h3>
      <a-space>
        <span style="color: gray">难度</span>
        <span :style="{ color: diffColor }">{{ difficulty }}</span>
        <a-tag v-for="tag in tagList" :key="tag">{{ tag }}</a-tag>
      </a-space>
      <a-divider style="background-color: lightgray" />
    </div>

    <Editor
      v-model="content"
      :defaultConfig="editorConfig"
      :mode="mode"
      class="myEditor"
      style="padding-bottom: 6.5rem"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import axios from "axios";
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import { Editor } from "@wangeditor/editor-for-vue";
import { Boot } from "@wangeditor/editor";
import markdownModule from "@wangeditor/plugin-md";

Boot.registerModule(markdownModule);

export default {
  name: "Problem",
  components: { Editor },
  props: ["id"], // Number
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props: any, context: any) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();
    // 编辑器，工具栏配置
    const toolbarConfig = {};
    const editorConfig = { readOnly: true, scroll: true, autoFocus: false };
    // 题目内容
    const title = ref("这是标题"); // 题目标题
    const difficulty = ref("这是难度"); // 题目难度
    const diffColor = ref("#63ec0c"); // ”难度“颜色
    const content = ref(""); // 题目内容html格式
    const tagList = ref([]); // 题目标签

    const loading = ref(false); // 加载中

    // ajax 异步获取后端数据
    onMounted(() => {
      loading.value = true;
      axios
        .post("http://175.178.221.165:8081/questions/getQuestion", {
          id: props.id,
        })
        .then(
          (res) => {
            const success = res.data.success;
            const message = res.data.message;
            const data = res.data.data;
            title.value = data.title;
            if (data.level == 1) {
              // 简单
              difficulty.value = "简单";
              diffColor.value = "#008000";
            } else if (data.level == 2) {
              // 中等
              difficulty.value = "中等";
              diffColor.value = "#FFA500";
            } else if (data.level == 3) {
              // 困难
              difficulty.value = "困难";
              diffColor.value = "#FF0000";
            } else {
              console.log("error difficulty");
            }
            content.value = data.content;
            tagList.value = data.tags;
            loading.value = false;
          },
          (err) => {
            console.log(err.data);
          }
        );
    });

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    // 创建编辑器后
    const handleCreated = (editor: any) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    return {
      editorRef,
      title,
      difficulty,
      diffColor, // ”难度“字体颜色
      content,
      tagList,
      mode: "default", // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,

      loading,
    };
  },
};
</script>

<style scoped>
.problemView {
  overflow-y: hidden;
  text-align: left;
}

.myEditor >>> .w-e-scroll {
  padding-right: 1rem;
}

.myEditor >>> .w-e-scroll::-webkit-scrollbar {
  width: 0.5rem;
}

.myEditor >>> .w-e-scroll::-webkit-scrollbar-track {
  background: #ffffff;
}

.myEditor >>> .w-e-scroll::-webkit-scrollbar-thumb {
  background: #ececec;
  border-radius: 0.6rem;
}
</style>
