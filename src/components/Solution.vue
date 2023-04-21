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
            v-model="comment"
            :defaultConfig="commentConfig"
            :mode="mode"
            @onCreated="commentCreated"
        />
      </div>
      <div class="comment-submit">
        <a-button type="primary">评论</a-button>
      </div>
    </div>
    <div class="commentList" style="text-align: left">
      <a-list item-layout="horizontal" :data-source="commentList" :pagination="pagination">
        <template #header>
          <h1>精选评论</h1>
        </template>
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :description="item.date">
              <template #title>
                {{ item.nickname }}
              </template>
              <template #avatar>
                <a-avatar :src="item.avatar" />
              </template>
            </a-list-item-meta>
          </a-list-item>
          <Editor
              v-model="item.comment"
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

import  { LikeOutlined, EyeOutlined } from '@ant-design/icons-vue';
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {Boot} from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'
import {onBeforeUnmount, shallowRef, ref} from "vue";
import {useRoute} from 'vue-router';

Boot.registerModule(markdownModule)

interface CommentItem {
  avatar: string,
  nickname: string,
  date: string,
  comment: string,
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
    const avatar = "https://tse2-mm.cn.bing.net/th/id/OIP-C.Y5AKy_ThdGknRFLuqJmdtwHaEo?pid=ImgDet&rs=1"
    const title = "A+B 题解"
    const nickname = "YnmtDJ"
    const thumbNum = 666
    const viewNum = 777
    const date = "2023/01/06"
    const tagList = [
          "bfs",
          "dfs",
        ]
    // 编辑器实例，必须用 shallowRef
    const contentRef = shallowRef()
    // 编辑器，工具栏配置
    const contentConfig = {readOnly :true, scroll: false}
    const content = ref("<p>给你一个字符串 <code>s</code> ，请你统计并返回这个字符串中 <strong>回文子串</strong> 的数目。</p><p><strong>回文字符串</strong> 是正着读和倒过来读一样的字符串。</p>\n" +
        "\n" +
        "<p><strong>子字符串</strong> 是字符串中的由连续字符组成的一个序列。</p>\n" +
        "\n" +
        "<p>具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。</p>\n" +
        "\n" +
        "<p>&nbsp;</p>\n" +
        "\n" +
        "<p><strong>示例 1：</strong></p>\n" +
        "\n" +
        "<pre><strong>输入：</strong>s = \"abc\"\n" +
        "<strong>输出：</strong>3\n" +
        "<strong>解释：</strong>三个回文子串: \"a\", \"b\", \"c\"\n" +
        "</pre>\n" +
        "\n" +
        "<p><strong>示例 2：</strong></p>\n" +
        "\n" +
        "<pre><strong>输入：</strong>s = \"aaa\"\n" +
        "<strong>输出：</strong>6\n" +
        "<strong>解释：</strong>6个回文子串: \"a\", \"a\", \"a\", \"aa\", \"aa\", \"aaa\"</pre>\n" +
        "\n" +
        "<p>&nbsp;</p>\n" +
        "\n" +
        "<p><strong>提示：</strong></p>\n" +
        "\n" +
        "<ul>\n" +
        "\t<li><code>1 &lt;= s.length &lt;= 1000</code></li>\n" +
        "\t<li><code>s</code> 由小写英文字母组成</li>\n" +
        "</ul>")

    // 编辑器实例，必须用 shallowRef
    const commentRef = shallowRef()
    // 编辑器，工具栏配置
    const commentConfig = {readOnly :false, scroll: false}
    const comment = ref('')
    // 评论列表数据
    const commentList: CommentItem[] = [
      {
        avatar: "https://tse2-mm.cn.bing.net/th/id/OIP-C.Y5AKy_ThdGknRFLuqJmdtwHaEo?pid=ImgDet&rs=1",
        nickname: "三七",
        date: "2023/01/05",
        comment: "<p style=\"text-align: left;\">我的代码很简单</p><pre><code class=\"language-cpp\">class Solution {\n" +
            "public:\n" +
            "    unordered_map&lt;int,int&gt; mp1;\n" +
            "    vector&lt;int&gt; twoSum(vector&lt;int&gt;& nums, int target) {\n" +
            "        for( int i=0;i&lt;nums.size();i++ ){\n" +
            "            if( mp1.count(target-nums[i]) ) return vector&lt;int&gt;{i,mp1[target-nums[i]]};\n" +
            "            else mp1[nums[i]]=i;\n" +
            "        }\n" +
            "        return vector&lt;int&gt;();\n" +
            "    }\n" +
            "};</code></pre><p><br></p>",
      },
    ];
    // commentList的分页设置
    const pagination = {
      onChange: (page: number) => {
        //TODO
        console.log(page);
        commentList.length = 0;

      },
      pageSize: 10,
      total: 100,
      showSizeChanger: false,
    };

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
    padding: 0.1rem;
  }
  .commentList{

  }


</style>