<template>
  <div class="solution">
    <div class="solution-top-area" style="background: #f7f7f7; height: 2.4rem">
      <router-link :to="'/problems/' + params.pro_id">
        <a-button size="small" style="margin-top: 0.5rem">关闭 </a-button>
      </router-link>
    </div>

    <div class="solution-main-area" style="padding: 1rem">
      <div class="title">
        <a-space>
          <router-link :to="'/user/' + account">
            <a-avatar :size="32" :src="avatar" />
          </router-link>
          <span
            style="font-size: 1.2rem; margin-left: 0.5rem; color: #262626"
            >{{ title }}</span
          >
        </a-space>
      </div>

      <div class="action">
        <a-space style="margin-top: 1rem; color: #8c8c8c">
          <router-link :to="'/user/' + account">
            <a href="" style="color: #8c8c8c">{{ nickname }}</a>
          </router-link>

          <span style="color: #e5e5e5">•</span>

          <span style="margin-left: 0.2rem"
            ><like-outlined style="margin-right: 0.2rem" />{{ thumbNum }}</span
          >

          <span style="color: #e5e5e5">•</span>

          <span style="margin-left: 0.2rem"
            ><eye-outlined style="margin-right: 0.2rem" />{{ viewNum }}</span
          >

          <span style="color: #e5e5e5">•</span>

          <span style="margin-left: 0.2rem"
            >发布于 {{ moment(date).fromNow() }}</span
          >

          <span style="color: #e5e5e5">•</span>

          <span v-for="tag in tagList" :key="tag">
            <a-tag
              style="
                border-radius: 0.5rem;
                border: none;
                background: #f2f3f4;
                color: #262626;
              "
              >{{ tag }}</a-tag
            >
          </span>
        </a-space>
      </div>
      <a-divider></a-divider>
      <Editor
        v-model="content"
        :defaultConfig="contentConfig"
        :mode="mode"
        @onCreated="contentCreated"
      />
      <a-divider></a-divider>

      <span style="font-size: 1rem; color: #595959">评论 >_</span>

      <div class="comment">
        <div class="comment-edit" style="border: solid 0.1rem lightgray">
          <Editor
            v-model="comment"
            :defaultConfig="commentConfig"
            :mode="mode"
            @onCreated="commentCreated"
          />
          <Toolbar
            :editor="commentRef"
            :mode="mode"
            :defaultConfig="toolbarConfig"
          />
        </div>
        <div class="comment-submit">
          <a-button
            size="small"
            type="primary"
            @click="onComment"
            style="position: absolute; bottom: 0.8rem; right: 0.4rem"
            >评论</a-button
          >
        </div>
      </div>

      <div class="commentList" style="text-align: left">
        <a-list
          :data-source="commentList"
          :pagination="pagination"
          class="comment-list"
          item-layout="horizontal"
        >
          <template #renderItem="{ item }">
            <a-list-item>
              <a-comment :author="item.nickname">
                <template #avatar>
                  <router-link :to="'/user/' + item.account">
                    <a-avatar :size="32" :src="item.avatar" />
                  </router-link>
                </template>
                <template #content>
                  <Editor
                    v-model="item.content"
                    :defaultConfig="contentConfig"
                    :mode="mode"
                    style="width: 45rem"
                  />
                </template>
                <template #datetime>
                  {{ moment(item.datetime).fromNow() }}
                </template>
              </a-comment>
            </a-list-item>
          </template>
        </a-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import {
  CheckCircleOutlined,
  EyeOutlined,
  LikeOutlined,
} from "@ant-design/icons-vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { Boot, IToolbarConfig } from "@wangeditor/editor";
import markdownModule from "@wangeditor/plugin-md";
import { h, onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import store from "@/store";
import { notification } from "ant-design-vue";
import moment from "moment/moment";
import { DomEditor } from "@wangeditor/editor";

moment.locale("zh-cn");

Boot.registerModule(markdownModule);

interface CommentItem {
  avatar: string;
  comment_id: number;
  content: string;
  datetime: string;
  nickname: string;
  user_id: number;
  account: string;
}

export default {
  name: "Solution",
  components: { Toolbar, LikeOutlined, EyeOutlined, Editor },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    // 获取路由参数
    const { query, params } = useRoute();
    debugger;
    // 题解包含的信息
    const account = ref("");
    const avatar = ref("");
    const title = ref("");
    const nickname = ref("");
    const thumbNum = ref(0);
    const viewNum = ref(0);
    const date = ref("");
    const tagList = ref([]);
    // 编辑器实例，必须用 shallowRef
    const contentRef = shallowRef();
    // 编辑器，工具栏配置
    const contentConfig = { readOnly: true, scroll: false };
    const content = ref("");

    // 评论当前页号(从1开始)
    const cur_page = ref(1);
    // 编辑器实例，必须用 shallowRef
    const commentRef = shallowRef();
    // 编辑器，工具栏配置
    const commentConfig = { readOnly: false, scroll: false };
    const comment = ref("");

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

    // 评论列表数据
    const commentList = ref([]);
    // 每页评论个数
    const pageSize = 10;
    // commentList的分页设置
    const pagination = ref({
      onChange: (page: number) => {
        cur_page.value = page;
        commentList.value.length = 0;
        axios
          .get("/solutions/Getcomments", {
            params: {
              page: cur_page.value,
              solution_id: params.sln_id,
            },
          })
          .then(
            (res) => {
              commentList.value = res.data.data.commentList;
              pagination.value.total = res.data.data.total_page * pageSize;
            },
            (err) => {
              console.log(err.data);
            }
          );
      },
      pageSize: pageSize,
      total: 100,
      showSizeChanger: false,
    });

    // ajax 异步获取后端数据
    onMounted(() => {
      axios
        .post("/solutions/getSolutionsById", {
          id: params.sln_id,
        })
        .then(
          (res) => {
            const success = res.data.success;
            const message = res.data.message;
            const data = res.data.data;
            console.log(data.account);
            account.value = data.account;
            avatar.value = data.avatar;
            nickname.value = data.nickname;
            content.value = data.content;
            thumbNum.value = data.like_num;
            viewNum.value = data.view_num;
            date.value = data.dateTime;
            title.value = data.title;
            if (data.tags !== "") tagList.value = data.tags.split("_");
            else tagList.value = [];
          },
          (err) => {
            console.log(err.data);
          }
        );

      axios
        .get("/solutions/Getcomments", {
          params: {
            page: cur_page.value,
            solution_id: params.sln_id,
          },
        })
        .then(
          (res) => {
            commentList.value = res.data.data.commentList;
            pagination.value.total = res.data.data.total_page * pageSize;
          },
          (err) => {
            console.log(err.data);
          }
        );
    });

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      let editor = contentRef.value;
      if (editor == null) return;
      editor.destroy();
      editor = commentRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    // 创建编辑器后
    const contentCreated = (editor: any) => {
      contentRef.value = editor; // 记录 editor 实例，重要！
    };

    // 创建编辑器后
    const commentCreated = (editor: any) => {
      commentRef.value = editor; // 记录 editor 实例，重要！
    };

    // 编辑自己的题解
    const onEdit = () => {
      console.log(commentRef.value.getHtml());
    };

    // 评论
    const onComment = () => {
      axios
        .post(
          "/solutions/PublishComment",
          {
            content: comment.value,
            solution_id: params.sln_id,
          },
          {
            headers: { Authorization: store.state.token },
          }
        )
        .then(
          (res) => {
            debugger;
            notification.open({
              message: "评论成功",
              description: "",
              icon: () => h(CheckCircleOutlined, { style: "color: #008000" }),
            });
            comment.value = "";
            // TODO: 刷新评论？
            cur_page.value = 1;
            axios
              .get("/solutions/Getcomments", {
                params: {
                  page: cur_page.value,
                  solution_id: params.sln_id,
                },
              })
              .then(
                (res) => {
                  commentList.value = res.data.data.commentList;
                  pagination.value.total = res.data.data.total_page * pageSize;
                },
                (err) => {
                  console.log(err.data);
                }
              );
          },
          (err) => {
            console.log(err);
          }
        );
    };

    return {
      query,
      params,
      avatar,
      account,
      title,
      nickname,
      thumbNum,
      viewNum,
      date,
      tagList,
      mode: "simple", // 编辑器模式，也可以是simple
      contentConfig,
      contentRef,
      content,
      commentConfig,
      commentRef,
      comment,
      commentList,
      pagination,
      moment,
      contentCreated,
      commentCreated,
      onEdit,
      onComment,

      toolbarConfig,
    };
  },
};
</script>

<style scoped>
.solution {
  min-height: 48rem;
  text-align: left;
  overflow-y: hidden;
  background: white;
}

.title {
}

.action {
}

.comment {
  margin-top: 1rem;
  position: relative;
}

.comment-edit {
}

.comment-submit {
  text-align: right;
  padding: 0.2rem;
}
.commentList {
}
</style>
