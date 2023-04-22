<template>
    <a-list item-layout="horizontal" id="pass-list" size="large" :pagination="pagination" :data-source="listData" style="width: 65rem">

      <template #renderItem="{item, index}">
        <a-list-item key="item.title"
                     @click="onTitleClicked(item.id)"
                     :style= "{'background-color':(index%2 === 1 ? '#fff' : '#f7f7f8'),
                   'border-radius': (index%2 === 1 ? '0' : '0.35rem')}">
          <template #actions>
            <div>
              <span style="margin-right: 1rem">提交时间</span>
              <span>{{ item.date }}</span>
            </div>

          </template>
          <div>
            <a  style="color: #262626">{{ item.title }}</a>
          </div>

        </a-list-item>
      </template>
    </a-list>

</template>

<script lang="ts">

let listData: { title: string; date: string; id: number; }[] = [];

for (let i = 0; i < 100; i++) {
  listData.push({
    title: `剑指Offer 12.矩阵中的路径 ${i}`,
    date: '2021-05-01',
    id: i,
  });
}

export default {
  name: "UserRecentPassList",
  setup() {

    let onTitleClicked = (id : number) => {
      window.open(`/solution/${id}`)
    }

    const pagination = {
      onChange: (page: number) => {
        console.log(page);
      },
      pageSize: 15,
    };

    return {
      listData,
      pagination,
      onTitleClicked,
    };
  },
}
</script>

<style scoped>

#pass-list .ant-list-item{
  cursor: pointer;
}

</style>