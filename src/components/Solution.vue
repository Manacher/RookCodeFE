<template>
  <div class="solution">
    <div class="title">
      <router-link :to="'/problems/'+params.pro_id"><a-button size="small">关闭</a-button></router-link><br>
      <a-space>
        <a-avatar :size="32" :src="avatar"/>
        <span style="font-size: x-large">{{ title }}</span>
        <a-button @click="onEdit">编辑</a-button>
      </a-space>
    </div>
    <div class="action">
      <a-space>
        <span>{{ nickname }}</span>
        <span><like-outlined/>{{ thumbNum }}</span>
        <span><eye-outlined/>{{ viewNum }}</span>
        <span>发布于：{{ date }}</span>
        <span v-for="tag in tagList" :key="tag">
      <a-tag>{{tag}}</a-tag>
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
    <div class="comment">
      <div class="comment-edit" style="border: solid 0.1rem lightgray;">
        <Toolbar
            :editor="commentRef"
            :mode="mode"
        />
        <Editor
            style="min-height: 5.4rem"
            v-model="comment"
            :defaultConfig="commentConfig"
            :mode="mode"
            @onCreated="commentCreated"
        />
      </div>
      <div class="comment-submit">
        <a-button type="primary" @click="onComment">评论</a-button>
      </div>
    </div>
    <div class="commentList" style="text-align: left">
      <a-list item-layout="horizontal" :data-source="commentList" :pagination="pagination">
        <template #header>
          <h1>精选评论</h1>
        </template>
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :description="item.datetime">
              <template #title>
                {{ item.nickname }}
              </template>
              <template #avatar>
                <a-avatar :src="item.avatar" />
              </template>
            </a-list-item-meta>
          </a-list-item>
          <Editor
              v-model="item.content"
              :defaultConfig="contentConfig"
              :mode="mode"
          />
        </template>
      </a-list>
    </div>
  </div>
</template>

<script lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import {LikeOutlined, EyeOutlined, CheckCircleOutlined} from '@ant-design/icons-vue';
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {Boot} from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'
import {onBeforeUnmount, shallowRef, ref, onMounted, h} from "vue";
import {useRoute} from 'vue-router';
import axios from "axios";
import store from "@/store";
import {notification} from "ant-design-vue";

Boot.registerModule(markdownModule)

interface CommentItem {
  avatar: string,
  comment_id: number,
  content: string,
  datetime: string,
  nickname: string,
  user_id: number,
}

export default {
  name: "Solution",
  components: {Toolbar, LikeOutlined, EyeOutlined, Editor},

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(){
    // 获取路由参数
    const { query, params } = useRoute()
    debugger
    // 题解包含的信息
    const avatar = ref("")
    const title = ref("")
    const nickname = ref("")
    const thumbNum = ref(0)
    const viewNum = ref(0)
    const date = ref("")
    const tagList = ref([])
    // 编辑器实例，必须用 shallowRef
    const contentRef = shallowRef()
    // 编辑器，工具栏配置
    const contentConfig = {readOnly :true, scroll: false}
    const content = ref("")

    // 评论当前页号(从1开始)
    const cur_page = ref(1)
    // 编辑器实例，必须用 shallowRef
    const commentRef = shallowRef()
    // 编辑器，工具栏配置
    const commentConfig = {readOnly :false, scroll: false}
    const comment = ref('')
    // 评论列表数据
    const commentList = ref([]);
    // 每页评论个数
    const pageSize = 10
    // commentList的分页设置
    const pagination = ref({
      onChange: (page: number) => {
        cur_page.value = page
        commentList.value.length = 0;
        axios.get("http://175.178.221.165:8081/solutions/Getcomments", {
          params: {
            'page': cur_page.value,
            'solution_id': params.sln_id,
          }
        }).then(res => {
          commentList.value = res.data.data.commentList
          pagination.value.total = res.data.data.total_page*pageSize
        }, err => {
          console.log(err.data)
        })
      },
      pageSize: pageSize,
      total: 100,
      showSizeChanger: false,
    });

    // ajax 异步获取后端数据
    onMounted(() => {
      axios.post("http://175.178.221.165:8081/solutions/getSolutionsById",
          {
            'id': params.sln_id,
          }
      ).then(res=>{
        const success = res.data.success
        const message = res.data.message
        const data = res.data.data
        avatar.value = data.avatar
        nickname.value = data.nickname
        content.value = data.content
        thumbNum.value = data.like_num
        viewNum.value = data.view_num
        date.value = data.dateTime
        title.value = data.title
        tagList.value = data.tags.split("_")
      },err=>{
        console.log(err.data)
      })

      axios.get("http://175.178.221.165:8081/solutions/Getcomments", {
        params: {
          'page': cur_page.value,
          'solution_id': params.sln_id,
        }
      }).then(res => {
        commentList.value = res.data.data.commentList
        pagination.value.total = res.data.data.total_page*pageSize
      }, err => {
        console.log(err.data)
      })
    })

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      let editor = contentRef.value
      if (editor == null) return
      editor.destroy()
      editor = commentRef.value
      if (editor == null) return
      editor.destroy()
    })

    // 创建编辑器后
    const contentCreated = (editor: any) => {
      contentRef.value = editor // 记录 editor 实例，重要！
    }

    // 创建编辑器后
    const commentCreated = (editor: any) => {
      commentRef.value = editor // 记录 editor 实例，重要！
    }

    // 编辑自己的题解
    const onEdit = () => {
      //TODO
      console.log(commentRef.value.getHtml())
    }

    // 评论
    const onComment = () => {
      axios.post("http://175.178.221.165:8081/solutions/PublishComment",
          {
            "content": comment.value,
            "solution_id": params.sln_id,
          },
          {
            headers: {'Authorization': store.state.token}
          }
      ).then(res=>{
        debugger
        notification.open({
          message: '评论成功',
          description: '',
          icon: () => h(CheckCircleOutlined, { style: 'color: #008000' }),
        });
        comment.value = ""
        // TODO: 刷新评论？
        cur_page.value = 1
        axios.get("http://175.178.221.165:8081/solutions/Getcomments", {
          params: {
            'page': cur_page.value,
            'solution_id': params.sln_id,
          }
        }).then(res => {
          commentList.value = res.data.data.commentList
          pagination.value.total = res.data.data.total_page*pageSize
        }, err => {
          console.log(err.data)
        })
      }, err=>{
        console.log(err)
      })
    }

    return{
      query,
      params,
      avatar,
      title,
      nickname,
      thumbNum,
      viewNum,
      date,
      tagList,
      mode: 'simple',  // 编辑器模式，也可以是simple
      contentConfig,
      contentRef,
      content,
      commentConfig,
      commentRef,
      comment,
      commentList,
      pagination,
      contentCreated,
      commentCreated,
      onEdit,
      onComment,
    }
  }

}
</script>

<style scoped>
  .solution{
    text-align: left;
    overflow-y: hidden;
    background: white;
  }
  .title{

  }
  .action{

  }
  .comment{

  }
  .comment-edit{

  }
  .comment-submit{
    text-align: right;
    padding: 0.2rem;
  }
  .commentList{

  }


</style>