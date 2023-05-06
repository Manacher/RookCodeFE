// TODO: 修改名称、接口

<template>
  <div class="discussion">
    <div class="discussion-main-area">
      <div class="content-area">
        <a-skeleton avatar :paragraph="{ rows: 4 }" active v-if="initLoading" />

        <div v-else>
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

              <span
                style="margin-left: 0.2rem; display: flex; flex-direction: row"
                @click="onLike"
              >
                <div style="margin-bottom: 0.2rem">
                  <like-outlined v-if="!liked" class="unlike-button" />
                  <like-filled class="like-button" v-else />
                </div>

                {{ thumbNum }}
              </span>

              <span style="color: #e5e5e5">•</span>

              <span style="margin-left: 0.2rem"
                ><eye-outlined style="margin-right: 0.2rem" />{{
                  viewNum
                }}</span
              >

              <span style="color: #e5e5e5">•</span>

              <span style="margin-left: 0.2rem"
                >发布于 {{ moment(date).fromNow() }}</span
              >

              <span style="color: #e5e5e5">•</span>
            </a-space>
          </div>

          <a-divider style="margin-bottom: 0"></a-divider>
          <Editor
            v-model="content"
            :defaultConfig="contentConfig"
            :mode="mode"
            @onCreated="contentCreated"
          />
        </div>
      </div>

      <div style="padding-left: 0.5rem; padding-right: 0.5rem">
        <span style="font-size: 1rem; color: #595959">评论 >_</span>

        <div class="comment">
          <div class="comment-edit">
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
              style="border-radius: 1rem"
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
      </div>

      <div class="commentList" style="text-align: left">
        <a-list
          :data-source="commentList"
          :pagination="pagination"
          class="comment-list"
          item-layout="horizontal"
          style="overflow-y: auto; padding: 0.5rem"
          :loading="commentLoading"
        >
          <template #renderItem="{ item }">
            <a-list-item
              style="
                background-color: white;
                border-radius: 0.6rem;
                margin-top: 0.8rem;
                box-shadow: 0 0 0.5rem 0.1rem #e6e6e6;
              "
            >
              <a-comment :author="item.nickname" style="padding-left: 1rem">
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
  LikeFilled,
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
  name: "Discussion",
  components: { Toolbar, LikeFilled, LikeOutlined, EyeOutlined, Editor },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    // 获取路由参数
    const { query, params } = useRoute();
    // 讨论包含的信息
    const account = ref("");
    const avatar = ref("");
    const title = ref("");
    const nickname = ref("");
    const thumbNum = ref(0);
    const viewNum = ref(0);
    const date = ref("");
    const liked = ref(false);
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

    let initLoading = ref(true);
    let commentLoading = ref(true);

    // 评论列表数据
    const commentList = ref([]);
    // 每页评论个数
    const pageSize = 10;
    // commentList的分页设置
    const pagination = ref({
      onChange: (page: number) => {
        commentLoading.value = true;
        cur_page.value = page;
        commentList.value.length = 0;
        axios
          .get("/discussions/getComments", {
            params: {
              page: cur_page.value,
              discussion_id: params.dis_id,
            },
          })
          .then(
            (res) => {
              commentList.value = res.data.data.commentList;
              pagination.value.total = res.data.data.total_page * pageSize;
              commentLoading.value = false;
            },
            (err) => {
              console.log(err.data);
              commentLoading.value = false;
            }
          );
      },
      pageSize: pageSize,
      total: 1,
      showSizeChanger: false,
    });

    // ajax 异步获取后端数据
    onMounted(() => {
      axios
        .get("/discussions/getDiscussionById", {
          params: {
            discussion_id: params.dis_id,
          },
          headers: {
            Authorization: store.state.token,
          },
        })
        .then(
          (res) => {
            const success = res.data.success;
            const message = res.data.message;
            const data = res.data.data;
            console.log(data.account);
            liked.value = data._liked;
            account.value = data.account;
            avatar.value = data.avatar;
            nickname.value = data.nickname;
            content.value = data.content;
            thumbNum.value = data.like_num;
            viewNum.value = data.view_num;
            date.value = data.dateTime;
            title.value = data.title;
            initLoading.value = false;
          },
          (err) => {
            console.log(err.data);
            initLoading.value = false;
          }
        );

      axios
        .get("/discussions/getComments", {
          params: {
            page: cur_page.value,
            discussion_id: params.dis_id,
          },
        })
        .then(
          (res) => {
            commentList.value = res.data.data.commentList;
            pagination.value.total = res.data.data.total_page * pageSize;
            commentLoading.value = false;
          },
          (err) => {
            console.log(err.data);
            commentLoading.value = false;
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

    // 评论
    const onComment = () => {
      axios
        .post(
          "/discussions/commentDiscussion",
          {
            content: comment.value,
            discussion_id: params.dis_id,
          },
          {
            headers: { Authorization: store.state.token },
          }
        )
        .then(
          (res) => {
            notification.open({
              message: "评论成功",
              description: "",
              icon: () => h(CheckCircleOutlined, { style: "color: #008000" }),
            });
            comment.value = "";
            // TODO: 刷新评论？
            cur_page.value = 1;
            axios
              .get("/discussions/getComments", {
                params: {
                  page: cur_page.value,
                  discussion_id: params.dis_id,
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

    let showInfo = (success: boolean, info: string) => {
      if (success) {
        notification.success({
          message: "",
          description: info,
          duration: 0.5,
        });
      } else {
        notification.error({
          message: "",
          description: info,
          duration: 0.5,
        });
      }
    };

    // 点赞
    const onLike = () => {
      axios
        .get("/discussions/likeDiscussion", {
          params: {
            discussion_id: params.dis_id,
          },
          headers: { Authorization: store.state.token },
        })
        .then(
          (res) => {
            liked.value = !liked.value;
            if (liked.value) {
              thumbNum.value += 1;
              showInfo(true, "点赞成功");
            } else {
              thumbNum.value -= 1;
              showInfo(true, "取消点赞成功");
            }
          },
          (err) => {
            showInfo(false, err);
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
      liked,
      mode: "simple", // 编辑器模式，也可以是simple
      contentConfig,
      contentRef,
      content,
      commentConfig,
      toolbarConfig,
      commentRef,
      comment,
      commentList,
      pagination,
      moment,
      contentCreated,
      commentCreated,
      onComment,
      onLike,
      initLoading,
      commentLoading,
    };
  },
};
</script>

<style scoped>
.discussion {
  background: #f7f8fa;
}

.discussion-main-area {
  margin-left: 20rem;
  width: 50rem;
  text-align: left;
  overflow-y: hidden;
}

.content-area {
  margin: 1rem 0.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 0 0.5rem 0.08rem #e6e6e6;
}

.comment {
  margin-top: 1rem;
  position: relative;
}

.comment-edit {
  background-color: white;
  box-shadow: 0 0 0.5rem 0.08rem #e6e6e6;
}

.comment-submit {
  text-align: right;
  padding: 0.2rem;
}

.like-button {
  margin-right: 0.4rem;
  color: white;
  background-color: #00c36c;
  border-radius: 1rem;
  padding: 0.3rem;
  font-size: 0.7rem;
}

.like-button:hover {
  cursor: pointer;
}

.unlike-button {
  margin-right: 0.4rem;
  color: #8c8c8c;
  background-color: #efefef;
  border-radius: 1rem;
  padding: 0.25rem;
  font-size: 0.8rem;
}

.unlike-button:hover {
  cursor: pointer;
  background-color: #e0f4e7;
  color: #2db55d;
}

.comment-list::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}

.comment-list::-webkit-scrollbar-track {
  background: #ffffff;
}

.comment-list::-webkit-scrollbar-thumb {
  background: #ececec;
  border-radius: 0.6rem;
}
</style>
