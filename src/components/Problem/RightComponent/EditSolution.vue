<template>
  <div class="edit-solution">
    <div style="background: #f7f7f7; height: 2.4rem">
      <router-link :to="'/problems/' + params.pro_id"
        ><a-button size="small" style="margin-top: 0.5rem"
          >关闭</a-button
        ></router-link
      >
    </div>

    <div style="padding: 1rem">
      <a-input
        v-model:value="title"
        placeholder="此处输入标题"
        :bordered="false"
        style="font-size: xx-large"
      />
      <a-select
        v-model:value="selectTags"
        mode="multiple"
        style="width: 100%"
        placeholder="添加编程语言、方法、知识点等标签"
        :options="tagList"
        :bordered="false"
      ></a-select>
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
            title="确定删除这篇题解吗？删除后不可恢复。"
            ok-text="确定"
            cancel-text="取消"
            @confirm="confirmDelete"
            @cancel="cancelDelete"
          >
            <a-button type="primary" danger>删除</a-button>
          </a-popconfirm>
          <a-button type="primary" @click="onUpdate">更新题解</a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { h, onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import type { SelectProps } from "ant-design-vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { Boot, IToolbarConfig } from "@wangeditor/editor";
import markdownModule from "@wangeditor/plugin-md";
import axios from "axios";
import { useRoute } from "vue-router";
import router from "@/router";
import store from "@/store";
import { Modal, notification } from "ant-design-vue";
import { CheckCircleOutlined } from "@ant-design/icons-vue";

Boot.registerModule(markdownModule);

export default {
  name: "EditSolution",
  components: { Editor, Toolbar },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    // 获取路由参数
    const { params } = useRoute();
    const title = ref("");
    const selectTags = ref([]);
    const tagList = ref<SelectProps["options"]>([]);
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();
    // 编辑器，工具栏配置
    const editorConfig = { readOnly: false, scroll: true, autoFocus: false };
    const content = ref("");

    // ajax 异步获取后端数据
    onMounted(() => {
      axios
        .post("http://175.178.221.165:8081//solutions/getSolutionsById", {
          id: params.sln_id,
        })
        .then(
          (res) => {
            const success = res.data.success;
            const message = res.data.message;
            const data = res.data.data;
            content.value = data.content;
            title.value = data.title;
            selectTags.value = data.tags.split("_");
          },
          (err) => {
            console.log(err.data);
          }
        );

      axios.get("http://175.178.221.165:8081/solutions/getAllTags").then(
        (res) => {
          const success = res.data.success;
          const message = res.data.message;
          const data = res.data.data;
          const list = data.split("_");
          tagList.value = [];
          for (let i = 0; i < list.length; i++) {
            tagList.value.push({
              value: list[i],
              label: list[i],
            });
          }
        },
        (err) => {
          console.log(err.data);
        }
      );
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

    // 确定取消更新
    const confirmQuit = (e: MouseEvent) => {
      //TODO
      router.push(`/problems/${params.pro_id}`);
    };

    // 继续更新
    const cancelQuit = (e: MouseEvent) => {
      console.log(e);
    };

    // 确定删除
    const confirmDelete = (e: MouseEvent) => {
      //TODO
      axios
        .post(
          "http://175.178.221.165:8081/solutions/deleteSolution",
          {
            id: params.sln_id,
          },
          {
            headers: { Authorization: store.state.token },
          }
        )
        .then(
          (res) => {
            console.log(res.data);
            notification.open({
              message: "题解删除成功",
              description: "",
              icon: () => h(CheckCircleOutlined, { style: "color: #008000" }),
            });

            let secondsToGo = 1;
            const modal = Modal.success({
              title: "删除成功",
              content: `题解删除成功，即将关闭页面`,
            });
            const interval = setInterval(() => {
              secondsToGo -= 1;
            }, 1000);
            setTimeout(() => {
              clearInterval(interval);
              modal.destroy();
              // location.reload()
              window.close();
            }, secondsToGo * 1000);
          },
          (err) => {
            console.log(err);
          }
        );
    };

    // 取消删除
    const cancelDelete = (e: MouseEvent) => {
      console.log(e);
    };

    // 确定修改题解
    const onUpdate = () => {
      const List2String = (list: never[]) => {
        let str = "";
        for (let data of list) {
          str += data + "_";
        }
        return str;
      };

      axios
        .post(
          "http://175.178.221.165:8081/solutions/updateSolution",
          {
            content: content.value,
            solution_id: Number(params.sln_id),
            tags: List2String(selectTags.value),
            title: title.value,
          },
          {
            headers: { Authorization: store.state.token },
          }
        )
        .then(
          (res) => {
            notification.open({
              message: "题解更新成功",
              description: "",
              icon: () => h(CheckCircleOutlined, { style: "color: #008000" }),
            });
            router.push(
              "/problems/" + params.pro_id + "/solution/" + res.data.data.id_new
            );
          },
          (err) => {
            console.log(err);
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
      title,
      selectTags,
      tagList,
      editorRef,
      content,
      mode: "default",
      editorConfig,
      editorCreated,
      confirmQuit,
      cancelQuit,
      confirmDelete,
      cancelDelete,
      onUpdate,
      params,
      toolbarConfig,
    };
  },
};
</script>

<style scoped>
.edit-solution {
  margin: auto;
  text-align: left;
  background: white;
}
.editor {
  border: solid 0.1rem lightgray;
}
.submit {
  padding: 0.5rem;
  text-align: right;
}
</style>
