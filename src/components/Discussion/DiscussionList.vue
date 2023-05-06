<template>
  <div class="discussion-list-main-area">
    <div class="top-area">
      <a-input-search
        v-model:value="inputValue"
        placeholder="搜索感兴趣的内容"
        style="width: 15rem; margin-right: 1rem"
        @search="onSearch"
      />

      <button id="create-button" @click="onCreateClicked">
        <tag-outlined />
        发起讨论
      </button>
    </div>

    <a-list
      :data-source="discussion_list"
      :loading="loading"
      item-layout="horizontal"
      style="margin-top: 2rem; margin-bottom: 4rem"
    >
      <template #renderItem="{ item }">
        <a-list-item
          class="discussion-list-item"
          @click="onListItemClicked(item.id)"
          style="
            text-align: left;
            background-color: white;
            border-top: 1px solid #e5e5e5;
            padding-bottom: 0rem;
            margin-top: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 1px 5px 1px rgba(213, 207, 207, 0.73);
          "
        >
          <a-comment style="padding: 0 1rem 0 1rem; border-radius: 0.5rem">
            <template #actions>
              <span
                key="comment-basic-like"
                style="font-size: 0.8rem; color: #595959"
              >
                <template v-if="item.is_liked">
                  <LikeFilled
                    style="color: #00c36c"
                  />
                </template>
                <template v-else>
                  <LikeOutlined  />
                </template>

                <span style="padding-left: 8px; cursor: auto">
                  {{ item.like_num }}
                </span>
              </span>

              <span
                key="comment-basic-view"
                style="font-size: 0.8rem; color: #595959"
              >
                <eye-outlined />
                <span style="padding-left: 8px; cursor: auto">
                  {{ item.view_num }}
                </span>
              </span>

              <span style="font-size: 0.8rem; color: #595959">
                <comment-outlined />
                <span style="padding-left: 8px; cursor: auto">
                  {{ item.com_num }}
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
              <div style="margin-top: 0.5rem">
                <span style="font-size: 0.9rem; color: #8c8c8c">
                  {{ item.description }}
                </span>
              </div>
            </template>
          </a-comment>
        </a-list-item>
      </template>
    </a-list>

    <a-pagination
      v-model:current="pagination.current"
      :total="pagination.total"
      style="
        padding-bottom: 1rem;
        padding-top: 1rem;
        position: absolute;
        bottom: 0;
        right: 0;
      "
      @change="tableChange"
      defaultPageSize="15"
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
import {onMounted, ref} from "vue";
import axios from "axios/index";
import {message} from "ant-design-vue";
import store from "@/store";
import router from "@/router";
//html文本处理函数
function stripHtml(html: string): string {
  const content = document.createElement('div');
  content.innerHTML = html;
  const text = content.innerText;
  if (text.length > 100) {
    return text.substr(0, 100) + '...';
  } else {
    return text;
  }
}
export default {
  name: "DiscussionList",

  setup() {
    const pagination = ref({
      current: 1,
      total: 1,
      pageSize: 15,
    });

    onMounted(()=>{
      getDisscussionData()
    })

    //列表
    const discussion_list = ref<any>([])
    let loading = ref(false);
    let inputValue = ref("");

    //页码改变的事件
    //页码改变的事件
    let tableChange = (page:number) => {
      pagination.value.current = page;
      getDisscussionData()
    };
    //获取所有数据的接口
    const getDisscussionData=()=>{
      loading.value=true
      axios.get("http://175.178.221.165:8081/discussions/getDiscussions",{
        params:{
          "page":pagination.value.current
        } ,
        headers: {
          'Content-Type': 'application/json',
          Authorization:store.state.token
        } ,
      }).then((res) =>{
        //
        if(res.data.success===true){
          discussion_list.value = res.data.data.discussionList.map((item: any) => ({
            id:item.id,
            title:item.title,
            description:item.description,
            avatar:item.avatar,
            like_num:item.like_num,
            view_num:item.view_num,
            com_num:item.comments_num,
            is_liked:item._liked,
          }));
          for (let i=0;i<discussion_list.value.length;i++){
            discussion_list.value[i].description=stripHtml(discussion_list.value[i].description)
          }
          pagination.value.total=res.data.data.total_cnt
        }else{
          message.error(res.data.message)
        }
      })
      loading.value=false
    }

    //搜索函数
    let onSearch = () => {
      if(inputValue.value===''){
        getDisscussionData()
      }
      else{
        loading.value=true
        axios.get("http://175.178.221.165:8081/discussions/findDiscussions",{
          params:{
            "title":inputValue.value,
            "page":pagination.value.current
          } ,
          headers: {
            'Content-Type': 'application/json',
            Authorization:store.state.token
          } ,
        }).then((res) =>{
          if(res.data.success===true){
            discussion_list.value = res.data.data.discussionList.map((item: any) => ({
              id:item.id,
              title:item.title,
              description:item.description,
              avatar:item.avatar,
              like_num:item.like_num,
              view_num:item.view_num,
              com_num:item.comments_cnt,
              is_liked:item._liked,
            }));
            //这里还需要对文本的内容进行过滤
            for (let i=0;i<discussion_list.value.length;i++){
              discussion_list.value[i].description=stripHtml(discussion_list.value[i].description)
            }
            pagination.value.total=res.data.data.total_cnt
          }else{
            message.error(res.data.message)
          }
        })
        loading.value=false
      }


    };


    //跳转到详情界面
    let onListItemClicked = (id: number) => {
      window.open('/discussion/detail/'+String(id), '_blank');
    };

    //创建讨论
    let onCreateClicked = () => {
      console.log("onCreateClicked");
      router.push({path:'create-discussion'})
    };

    return {
      getDisscussionData,
      loading,
      discussion_list,
      pagination,
      inputValue,
      tableChange,
      onSearch,
      onListItemClicked,
      onCreateClicked,
    };
  },
};
</script>

<style scoped>
.discussion-list-main-area {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 20rem;
  width: 50rem;
}

.top-area {
  /*float: right;*/
  position: absolute;
  right: 0;
}

.discussion-list-item:hover {
  cursor: pointer;
  background-color: #f7f7f8 !important;
  transition: background-color 0.3s ease-in-out !important;
}

#create-button {
  background-color: #2db55d;
  border-radius: 1rem;
  border: none;
  color: #fff;
  padding: 0.3rem 0.7rem 0.3rem 0.7rem;
}

#create-button:hover {
  background-color: #269a4f;
  cursor: pointer;
  transition: ease-in-out 0.15s;
}
</style>
