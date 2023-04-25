<template>
  <a-list item-layout="horizontal" id="publish-list" size="large" :pagination="pagination" :data-source="listData" style="width: 100%">

    <template #renderItem="{item, index}">

      <a-list-item key="item.title"
                   @click="onTitleClicked(item.id)"
                   :style= "{'background-color':(index%2 === 1 ? '#fff' : '#f7f7f8'),
                   'border-radius': (index%2 === 1 ? '0' : '0.35rem')}">

        <template #actions>
            <span class="publish-list-action-item">
              <like-outlined style="margin-right: 0.3rem"/>{{ item.like }}</span>
          <span class="publish-list-action-item">
              <eye-outlined style="margin-right: 0.3rem"/>{{ item.view }}</span>
          <span class="publish-list-action-item">
              {{ item.date }}</span>
          <a @click="onEditClicked(item.id)">编辑</a>
        </template>
        <div>
          <a style="color: #262626" >{{ item.title }}</a>
        </div>

      </a-list-item>




    </template>
  </a-list>

</template>

<script lang="ts">

let listData: { title: string; date: string; id: number; like: number; view: number; }[] = [];

for (let i = 0; i < 100; i++) {
  listData.push({
    title: `93. 复原 IP 地址 - C++ 时间击败100% ${i}`,
    date: '2021-05-01',
    id: i,
    like: 13,
    view: 123,
  });
}

export default {
  name: "UserPublishList",
  setup() {

    let onTitleClicked = (id: number) => {
      window.open(`/solution/${id}`)
    }

    let onEditClicked = (id: number) => {
      window.open(`/solution/edit/${id}`)
    }

    console.log(window.innerWidth)
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
      onEditClicked,
    };
  },
}
</script>

<style scoped>

.publish-list-action-item {
  margin-right: 0.5rem;
  margin-left: 0.5rem
}


#publish-list .ant-list-item{
  cursor: pointer;
}

</style>