<template>
  <div class="create-discussion">
    <div style="padding: 1rem">
      <a-input
        v-model:value="title"
        placeholder="此处输入标题"
        :bordered="false"
        style="font-size: xx-large"
      />
      <a-divider></a-divider>
      <div class="editor">
        <Toolbar
          :editor="editorRef"
          :mode="mode"
          :default-config="toolbarConfig"
        />
        <Editor
          v-model="content"
          :defaultConfig="editorConfig"
          :mode="mode"
          style="height: 30rem"
          @onCreated="editorCreated"
        />
      </div>
      <div class="submit">
        <a-space>
          <a-popconfirm
            title="确定取消发布讨论吗？您将丢失所有编辑记录。"
            ok-text="确定"
            cancel-text="取消"
            @confirm="confirm"
            @cancel="cancel"
          >
            <a-button>取消发布</a-button>
          </a-popconfirm>
          <a-button type="primary" @click="onPublish">发布讨论</a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeUnmount, ref, shallowRef, h, onMounted } from "vue";
import type { SelectProps } from "ant-design-vue";
import { notification } from "ant-design-vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { Boot, IToolbarConfig } from "@wangeditor/editor";
import markdownModule from "@wangeditor/plugin-md";
import { useRoute } from "vue-router";
import router from "@/router";
import axios from "axios";
import store from "@/store";
import { CheckCircleOutlined } from "@ant-design/icons-vue";

Boot.registerModule(markdownModule);

export default {
  name: "CreateDiscussion",
  components: { Editor, Toolbar },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    // 获取路由参数
    const { params } = useRoute();
    const title = ref("");
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();
    // 编辑器，工具栏配置
    const editorConfig = { readOnly: false, scroll: true };
    const content = ref("");

    // ajax 异步获取后端数据
    onMounted(() => {
      debugger;
    });

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      let editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
      editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    // 创建编辑器后
    const editorCreated = (editor: any) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    // 确定取消发布
    const confirm = (e: MouseEvent) => {
      //router.push('/problems/'+params.pro_id)
      router.back();
    };

    // 继续发布
    const cancel = (e: MouseEvent) => {
      console.log(e);
    };

    // 发布题解
    const onPublish = () => {
      axios
        .post(
          "/discussions/pubDiscussion",
          {
            content: editorRef.value.getHtml(),
            title: title.value,
          },
          {
            headers: { Authorization: store.state.token },
          }
        )
        .then(
          (res) => {
            // 发布成功
            notification.open({
              message: "讨论发布成功",
              description: "",
              icon: () => h(CheckCircleOutlined, { style: "color: #008000" }),
            });
            router.push("/discussion/detail/" + res.data.data);
          },
          (err) => {
            // 发布失败
            console.log(err.data);
          }
        );
    };

    const toolbarConfig: Partial<IToolbarConfig> = {};
    toolbarConfig.toolbarKeys = [
      // 菜单 key
      "headerSelect",
      "blockquote",
      "bold",
      "italic",
      "underline",
      "code",
      "codeBlock",
      "bulletedList",
      "numberedList",
      {
        key: "group-image",
        title: "图片", // 必填
        iconSvg:
          '<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>',
        menuKeys: ["insertImage", "uploadImage"],
      },
      {
        key: "group-more-style",
        title: "更多", // 必填
        menuKeys: ["through", "clearStyle"],
      },
    ];

    return {
      params,
      title,
      editorRef,
      content,
      mode: "default",
      editorConfig,
      editorCreated,
      confirm,
      cancel,
      onPublish,
      toolbarConfig,
    };
  },
};
</script>

<style scoped>
.create-discussion {
  text-align: left;
  background: #ffffff;
  /*padding: 1rem;*/
}
.editor {
  border: solid 0.1rem lightgray;
}
.submit {
  padding: 0.5rem;
  text-align: right;
}
</style>
