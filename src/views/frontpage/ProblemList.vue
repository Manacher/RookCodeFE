<template>

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
          :maxTagCount="tagNumMaxi"
          show-search
          style="width: 20rem; text-align: left; height: 2rem"
          :dropdown-style="{ maxHeight: '40rem', overflow: 'auto' }"
          placeholder="筛选标签"
          allow-clear
          multiple
          :maxTagPlaceholder = onTagNumOverMaxi
          :treeDefaultExpandedKeys=defaultExpand
          :tree-data="treeData"
          :field-names="{
      children: 'children',
      label: 'name',
      value: 'value',
    }"
      ></a-tree-select>

    </div>

    <div class="search-bar-item">
      <a-input
          v-model:value="inputContent"
          placeholder="搜索题目或编号"
          size="small"
          style="height: 2rem; margin-left: 2rem;width: 15rem">

        <template #prefix>
          <search-outlined style="color: #959595"/>
        </template>
      </a-input>

      <div>
        <a-button type="primary"
                  size="small"
                  style="margin-top: 0.2rem"
                  @click="onSearchClicked">
          搜索</a-button>
      </div>


    </div>



  </div>

  <div class="problem-list">

    <a-table :columns="listColumns"
             :data-source="listData"
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
            <router-link :to="{path: 'problem/' + record.key }" style="color: inherit">{{ record.title }}</router-link>
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


</template>

<script lang="ts">
import {ref} from "vue";
import { message } from 'ant-design-vue';

const listColumns = [
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: '题目',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '题解',
    dataIndex: 'solution',
    key: 'solution',
  },
  {
    title: '通过率',
    key: 'pass',
    dataIndex: 'pass',
  },
  {
    title: '难度',
    key: 'difficulty',
    dataIndex: 'difficulty',
  },
];
const listData = [
  {
    key: '1',
    state: 'solved',
    title: '1.两数之和',
    solution: 21358,
    pass: '52.9%',
    difficulty: 'easy',
  },
  {
    key: '2',
    state: 'unanswered',
    title: '2.两数相加',
    solution: 11833,
    pass: '42.4%',
    difficulty: 'medium',
  },
  {
    key: '3',
    state: 'unanswered',
    title: '3.无重复字符的最长子串',
    solution: 13320,
    pass: '39.1%',
    difficulty: 'medium',
  },
  {
    key: '4',
    state: 'tried',
    title: '4.寻找两个正序数组的中位数',
    solution: 6747,
    pass: '41.7%',
    difficulty: 'hard',
  },
];
const treeData = [
  {
    name: '基本',
    value: 'basic',
    selectable: false,
    children: [
      {
        name: '数组',
        value: 'array',
      },
      {
        name: '字符串',
        value: 'string',
      },
      {
        name: '排序',
        value: 'sort',
      },
      {
        name: '模拟',
        value: 'simulate',
      },
      {
        name: '  ...',
        selectable: false,
        value: 'basic_more',
        children: [
          {
            name: '矩阵',
            value: 'matrix',
          },
          {
            name: '枚举',
            value: 'iterate',
          },
        ]
      }
    ],
  }, {
    name: '算法',
    value: 'algorithm',
    selectable: false,
    children: [
      {
        name: '动态规划',
        value: 'parent 1-0',
      },
      {
        name: '深度优先搜索',
        value: 'dfs',
      },
      {
        name: '贪心',
        value: 'greedy',
      },
    ],
  },

]

let diffSelected = ref('')
let stateSelected = ref('')
let tagSelected = ref([])
let inputContent = ref('')
let defaultExpand = ref(['basic', 'algorithm'])


let diffOptions = [
  {
    value: 'easy',
    label: '简单',
  },
  {
    value: 'medium',
    label: '中等',
  },
  {
    value: 'hard',
    label: '困难',
  },
]
let stateOptions = [
  {
    value: 'unanswered',
    label: '未开始',
  },
  {
    value: 'solved',
    label: '已解答',
  },
  {
    value: 'tried',
    label: '尝试过',
  },
]

let tagNumMaxi = ref(3);

export default {
  name: "problem-list",
  setup() {

    let onTagNumOverMaxi = (e: any) =>{
      tagSelected.value = tagSelected.value.slice(0, tagNumMaxi.value)
      message.info('最多可以选择3个标签');
    }

    let onSearchClicked = () =>{
      console.log("search clicked")
    }

    return {
      listData,
      listColumns,

      diffSelected,
      stateSelected,
      tagSelected,
      inputContent,

      diffOptions,
      stateOptions,

      treeData,
      defaultExpand,

      tagNumMaxi,
      onTagNumOverMaxi,
      onSearchClicked,

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
  margin-top: 1rem;
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
  margin: auto;
  margin-right: 1rem;
  font-size: 1rem;
}

.search-bar-item-select {
  width: 6rem;
  height: 2rem;
  margin-right: 1.5rem;
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