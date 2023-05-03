<template>

  <div class="problem-list-area">
    <div class="search-bar">

      <div class="search-bar-item">
        <span>难度</span>

        <a-select
            v-model:value="diffSelected"
            placeholder="选择难度"
            size="middle"
            :options="diffOptions"
            class="search-bar-item-select"
        ></a-select>
      </div>

      <div class="search-bar-item">
        <span>状态</span>

        <a-select
            v-model:value="stateSelected"
            :options="stateOptions"
            size="middle"
            placeholder="Please select"
            class="search-bar-item-select"
        ></a-select>

      </div>

      <div class="search-bar-item">
        <span>标签</span>
        <a-tree-select
            v-model:value="tagSelected"
            :tree-data="frontPageTreeData"
            :field-names="{
              children: 'children',
              label: 'name',
              value: 'value'}"
            allow-clear
            multiple
            placeholder="筛选标签"
            :maxTagCount="tagNumMaxi"
            :maxTagPlaceholder=onTagNumOverMaxi
            style="width: 20rem; text-align: left; height: 2rem; margin-right: 1.2rem; font-size: 0.8rem"
        ></a-tree-select>

      </div>

      <div class="search-bar-item">
        <a-input
            v-model:value="inputContent"
            placeholder="输入题目名称"
            size="small"
            allow-clear
            style=" height: 1.9rem; margin: auto;width: 14rem">

          <template #prefix>
            <search-outlined style="color: #959595"/>
          </template>
        </a-input>

        <div>
          <a-button type="primary"
                    size="small"
                    style="margin-top: 0.1rem; margin-left: 1rem; height: 1.8rem;width: 4rem"
                    @click="onSearchClicked">
            搜索
          </a-button>
        </div>


      </div>


    </div>

    <div class="problem-list">

      <a-table :columns="listColumns"
               :data-source="listData"
               :pagination="pagination"
               :loading="loading"
               @change="handleTableChange"
               style="border-bottom-left-radius: 1rem; border-bottom-right-radius: 1rem;">

        <template #bodyCell="{ column, record }">

          <template v-if="column.key === 'state'">

            <div v-if="record.state === 'solved'" class="list-state-icon">
              <check-circle-outlined style="color: green;"/>
            </div>
            <div v-else-if="record.state === 'tried'" class="list-state-icon">
              <issues-close-outlined style="color: #f2bc00;"/>
            </div>
            <div v-else></div>

          </template>

          <template v-else-if="column.key === 'title'">

            <div class="problem-title">
              <router-link :to="{path: 'problems/' + record.key }" style="color: inherit">{{
                  record.title
                }}
              </router-link>
            </div>

          </template>

          <template v-else-if="column.key === 'difficulty'">
            <a-tag color="#00af9b" v-if="record.difficulty === 'easy'">
              简单
            </a-tag>
            <a-tag color="#ffb800" v-if="record.difficulty === 'medium'">
              中等
            </a-tag>
            <a-tag color="#ff5064" v-if="record.difficulty === 'hard'">
              困难
            </a-tag>
          </template>

          <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical"/>
          <a>Delete</a>
          <a-divider type="vertical"/>
          <a class="ant-dropdown-link">
            More actions
            <down-outlined/>
          </a>
        </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>


</template>

<script lang="ts">
import {ref} from "vue";
import {message} from 'ant-design-vue';
import {getProblemList, ProblemListBody} from "@/components/FrontPage/frontPageHttp";
import {FrontPageData, ProblemListColumn, processProblemListData} from "@/components/FrontPage/frontPageUtil";

let listColumns = FrontPageData.frontPageListColumns
let diffOptions = FrontPageData.frontPageDiffOptions
let stateOptions = FrontPageData.frontPageStateOptions
let listData: { value: ProblemListColumn[] } = ref([])
let frontPageTreeData = FrontPageData.frontPageTreeData

let pagination = ref({
  current: 1,
  pageSize: 15,
  total: 15,
  showSizeChanger: false,
});
let diffSelected = ref('none')
let stateSelected = ref('none')
let tagSelected = ref([])
let inputContent = ref('')
let tagNumMaxi = ref(3);
let loading = ref(false);

export default {
  name: "problem-list",
  setup() {

    let onTagNumOverMaxi = (e: any) => {
      tagSelected.value = tagSelected.value.slice(0, tagNumMaxi.value)
      message.info('最多可以选择3个标签');
    }

    let handleQuery = (page: number) => {
      loading.value = true;
      let body: ProblemListBody = {
        difficulty: diffSelected.value,
        input: inputContent.value,
        page: page,
        state: stateSelected.value,
        tag: tagSelected.value
      }
      getProblemList(body).then((resp: any) => {
        if (resp.success) {
          let data = resp.data;
          // 修改分页信息并更新数据
          pagination.value.current = page;
          pagination.value.total = data.total_page * pagination.value.pageSize;
          if (data.problemList === null) {
            listData.value = []
          } else {
            listData.value = processProblemListData(data.problemList)
          }
          loading.value = false;
        } else {

          message.error(resp.message)
          loading.value = false;
        }
      })
    }

    handleQuery(pagination.value.current)

    let onSearchClicked = () => {
      handleQuery(1)
    }

    const handleTableChange = (pagination: any) => {
      handleQuery(pagination.current);
    };


    return {
      listData,
      listColumns,
      diffSelected,
      stateSelected,
      tagSelected,
      inputContent,
      frontPageTreeData,
      diffOptions,
      stateOptions,
      tagNumMaxi,
      pagination,
      loading,
      onTagNumOverMaxi,
      onSearchClicked,
      handleTableChange,
    };
  },
}


</script>

<style scoped>

.problem-title:hover {
  color: #007aff;
}

.search-bar {
  display: flex;
  flex-direction: row;
  background-color: #e5e6e8;
  padding: 1rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  color: #2c3e50;
}

.search-bar-item {
  display: flex;
  flex-direction: row;
  user-select: none;
  overflow: clip;
}

.search-bar-item span {
  font-size: 1rem;
  margin-top: 0.2rem;
  margin-right: 0.5rem;
}

.search-bar-item-select {
  width: 6rem;
  height: 2rem;
  margin-right: 1.2rem;
  text-align: left;
  color: #2c3e50;
}

.list-state-icon {
  margin-left: 0.3rem;
}

.problem-list {
  caret-color: rgba(0, 0, 0, 0);
}
</style>