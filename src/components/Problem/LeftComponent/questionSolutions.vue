<template>
  <div :style="myStyle" class="main_box">
    <div class="top-area" style="padding: 0 1rem 0 1rem">
      <div style="display: flex; flex-direction: row">
        <a-input-search
          placeholder="请输入题解名称"
          style="flex-grow: 1; margin-right: 0.5rem"
          @search="onSearch"
        />

        <a-button
          style="background-color: green; border-color: green; flex-grow: 0"
          type="primary"
          @click="writeSolution"
        >
          <template #icon>
            <EditOutlined />
          </template>
          写题解
        </a-button>
      </div>

      <div style="display: flex; flex-direction: row; padding: 1rem 0 1rem 0">
        <div
          style="
            color: #262626;
            font-weight: bold;
            font-size: 1.1rem;
            flex-grow: 0;
            margin-top: 0.1rem;
          "
        >
          题解标签：
        </div>

        <a-tree-select
          v-model:value="tagSelected"
          :field-names="{
            children: 'children',
            label: 'name',
            value: 'value',
          }"
          :tree-data="frontPageTreeData"
          allow-clear
          multiple
          placeholder="筛选标签"
          style="
            flex-grow: 1;
            text-align: left;
            height: 1.5rem;
            font-size: 1rem;
          "
          @change="treeChange"
        ></a-tree-select>
      </div>
    </div>

    <a-list
      :data-source="solution_info_list"
      :loading="loading"
      item-layout="horizontal"
    >
      <template #renderItem="{ item }">
        <a-list-item
          class="question-list-item"
          @click="onItemClicked(item.ID)"
          style="
            text-align: left;
            background-color: white;
            border-top: 1px solid #e5e5e5;
            padding-bottom: 0rem;
          "
        >
          <a-comment style="padding: 0 1rem 0 1rem">
            <template #actions>
              <span
                key="comment-basic-like"
                style="font-size: 0.9rem; color: #595959"
              >
                <a-tooltip title="点赞量">
                  <template v-if="action === 'liked'">
                    <LikeFilled @click="like" />
                  </template>
                  <template v-else>
                    <LikeOutlined @click="like" />
                  </template>
                </a-tooltip>
                <span style="padding-left: 8px; cursor: auto">
                  {{ item.like_cnt }}
                </span>
              </span>

              <span
                key="comment-basic-view"
                style="font-size: 0.9rem; color: #595959"
              >
                <a-tooltip title="浏览量">
                  <eye-outlined />
                </a-tooltip>
                <span style="padding-left: 8px; cursor: auto">
                  {{ item.view_cnt }}
                </span>
              </span>

              <span style="font-size: 0.9rem; color: #595959">
                <a-tooltip title="评论数">
                  <comment-outlined />
                </a-tooltip>
                <span style="padding-left: 8px; cursor: auto">
                  {{ item.com_cnt }}
                </span>
              </span>
            </template>
            <template #author>
              <span style="font-size: 1rem; color: #262626">
                {{ item.title }}
              </span>
            </template>
            <template #avatar>
              <a-avatar :src="item.avatar" alt="avatar" />
            </template>
            <template #content>
              <span style="font-size: 0.9rem; color: #8c8c8c">
                {{ item.descrp }}
              </span>
            </template>
            <template #datetime>
              <!--              <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">-->
              <!--                <span>{{ dayjs().fromNow() }}</span>-->
              <!--              </a-tooltip>-->
            </template>
          </a-comment>
        </a-list-item>
      </template>
    </a-list>

    <a-pagination
      v-model:current="current"
      :total="total_cnt"
      style="padding-bottom: 1rem; padding-top: 1rem"
      @change="tableChange"
    >
      <template #itemRender="{ type, originalElement }">
        <a v-if="type === 'prev'">前一页</a>
        <a v-else-if="type === 'next'">后一页</a>
        <component :is="originalElement" v-else></component>
      </template>
    </a-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { FrontPageData } from "@/api/frontPageUtil";
import axios from "axios";
import {
  EditOutlined,
  LikeOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import router from "@/router";

type solutionType = {
  ID: number;
  title: string;
  descrp: string;
  avatar: string;
  like_cnt: number;
  view_cnt: number;
  com_cnt: number;
};
let frontPageTreeData = FrontPageData.frontPageTreeData;
let tagSelected = ref([]);

//html文本处理函数
function stripHtml(html: string): string {
  const content = document.createElement("div");
  content.innerHTML = html;
  const text = content.innerText;
  if (text.length > 100) {
    return text.substr(0, 100) + "...";
  } else {
    return text;
  }
}

export default defineComponent({
  components: { MessageOutlined, UserOutlined, LikeOutlined, EditOutlined },
  setup() {
    const { params } = useRoute(); // 获取路由参数
    const myStyle = ref({ height: "" });
    onMounted(() => {
      //获取题解
      getDataAndLoad(1, 10, "", "");
      //获取屏幕高度
      //TODO: 注释了所有高度、宽度设置
      //myStyle.value.height=window.outerHeight-100+"px";
    });

    //当前的页码
    const current = ref(1);
    //当前页码大小
    const current_size = ref(10);
    //当前总的题解数目
    const total_cnt = ref(500);
    //当前的题解字符串
    const tag_str = ref("");
    //当前的搜索字符串
    const search_str = ref("");
    /*创建题解的数组*/
    let solution_info_list = ref<solutionType[]>([]);

    let loading = ref(false);

    //搜索题解函数
    const onSearch = (searchValue: string) => {
      search_str.value = searchValue;
      getDataAndLoad(
        current.value,
        current_size.value,
        search_str.value,
        tag_str.value
      );
    };
    /*选择标签*/
    const treeChange = (value: any, label: any, extra: any) => {
      console.log(value);
      var new_str = "";
      for (var i = 0; i < value.length; i++) {
        if (i != value.length - 1) {
          new_str += value[i] + "_";
        } else {
          new_str += value[i];
        }
      }
      tag_str.value = new_str;
      //调用函数
      getDataAndLoad(
        current.value,
        current_size.value,
        search_str.value,
        tag_str.value
      );
    };

    //跳转到写题解界面
    const writeSolution = () => {
      //在这里添加路由
      router.push("/problems/" + params.pro_id + "/create-solution");
    };

    //页码改变的事件
    const tableChange = (page: number, pageSize: number) => {
      current.value = page;
      current_size.value = pageSize;
      //重新请求数据
      getDataAndLoad(
        current.value,
        current_size.value,
        search_str.value,
        tag_str.value
      );
    };

    //核心函数，对数据进行渲染
    const getDataAndLoad = (
      page: number,
      pageSize: number,
      searchValue: string,
      tagStr: string
    ) => {
      loading.value = true;
      //发送请求
      //渲染数据
      axios
        .post(
          "http://175.178.221.165:8081/solutions/findSolutions",
          {
            name: searchValue,
            page: page,
            question_id: params.pro_id,
            tags: tagStr,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data.success == true) {
            //更新题目总的数量
            total_cnt.value = res.data.data.total_cnt;
            //在这里进行类型转换
            solution_info_list.value = res.data.data.findSolutionRespList.map(
              (item: any) => ({
                ID: item.id,
                title: item.title,
                descrp: item.description,
                avatar: item.avatar,
                like_cnt: item.like_num,
                view_cnt: item.view_num,
                com_cnt: item.comments_cnt,
              })
            );

            for (var i = 0; i < solution_info_list.value.length; i++) {
              var str = solution_info_list.value[i].descrp;
              var new_str = stripHtml(str);
              solution_info_list.value[i].descrp = new_str;
            }
            console.log(solution_info_list.value);
            loading.value = false;
          }
        });
    };

    let onItemClicked = (id: number) => {
      console.log("item clicked", id);
      router.push(`/problems/${params.pro_id}/solution/${id}`);
    };

    return {
      // 路由参数
      params,
      //题解标签
      tagSelected,
      frontPageTreeData,
      //获取屏幕高度
      myStyle,
      //题解的数组
      solution_info_list,
      //总题解数目
      total_cnt,
      //所有的标签按钮
      treeChange,
      //当前的页码
      current,
      //当前的页码大小
      current_size,
      //当前的题解字符串
      tag_str,
      //搜索题解函数
      onSearch,
      //核心函数，对数据进行渲染
      getDataAndLoad,
      //写题解函数：跳转路由
      writeSolution,
      //页码改变的事件
      tableChange,

      loading,
      onItemClicked,
    };
  },
});
</script>

<!--占据左侧的位置-->
<style scoped>
.main_box {
  overflow: auto;
  /*padding-right: 1rem;*/
}

.main_box::-webkit-scrollbar {
  width: 0.5rem;
}

.main_box::-webkit-scrollbar-track {
  background: #ffffff;
}

.main_box::-webkit-scrollbar-thumb {
  background: #ececec;
  border-radius: 0.6rem;
}

.question-list-item:hover {
  cursor: pointer;
  background-color: #f7f7f8 !important;
  transition: background-color 0.3s ease-in-out !important;
}
</style>
