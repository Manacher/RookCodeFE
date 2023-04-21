<template>
  <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData" style="width: 65rem">

    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <div>
          <a :href= "`/submission/${item.id}`" style="color: #262626">{{ item.title }}</a>
          <span style="float: right">{{ item.date }}</span>
        </div>

      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">

let listData: { title: string; date: string; id: number; }[] = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    title: `剑指Offer 12.矩阵中的路径 ${i}`,
    date: '2021-05-01',
    id: i,
  });
}

export default {
  name: "UserRecentPassList",
  setup() {
    const pagination = {
      onChange: (page: number) => {
        console.log(page);
      },
      pageSize: 3,
    };

    return {
      listData,
      pagination,
    };
  },
}
</script>

<style scoped>

</style>