<template>

  <a-table :columns="columns" :data-source="data">

    <template #bodyCell="{ column, record }">

      <template v-if="column.key === 'state'">

        <div v-if="record.state === 'solved'">
          <check-circle-outlined style="color: green;"/>
        </div>
        <div v-else-if="record.state === 'tried'">
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
        <span>
          <a-tag
              :color="record.difficulty === 'hard' ? '#ff5064' : record.difficulty === 'medium' ? '#ffb800' : '#00af9b'   "
          >
            {{ record.difficulty }}
          </a-tag>


        </span>
      </template>

      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a>
        </span>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
const columns = [
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

const data = [
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

export default {
  name: "problem-list",
  setup() {
    return {
      data,
      columns,
    };
  },
}


</script>

<style scoped>

.problem-title:hover{
  color: #007aff;
}

/*.problem-list{*/
/*  background-color: lightseagreen;*/
/*  height: 50rem;*/
/*}*/

</style>