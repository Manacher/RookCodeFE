<template>
  <a-input-search
      v-model:value="searchText"
      placeholder="搜索题解"
      @search="onSearch"
  />
  <a-list item-layout="horizontal" :data-source="data" style="text-align: left;">
    <template #renderItem="{ item }">
      <a-list-item :key="item.key">
        <template #actions>
          <span><like-outlined/>{{ item.thumbNum }}</span>
          <span><eye-outlined/>{{ item.viewNum }}</span>
          <span>{{ item.date }}</span>
        </template>
        <a-list-item-meta :description='item.content'>
          <template #title>
            <a href="https://www.antdv.com/">{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar :src='item.avatar'/>
          </template>
        </a-list-item-meta>
        {{blank}}
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
import {ref} from "vue";
import  { LikeOutlined, EyeOutlined } from '@ant-design/icons-vue';

interface DataItem {
  key: string,
  title: string;
  avatar: string;
  content: string;
  viewNum: number;
  thumbNum: number;
  date: string;
}

export default {
  name: "SolutionList",
  components: {LikeOutlined, EyeOutlined},

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(){
    const searchText = ref<string>('');
    const data: DataItem[] = [
      {
        key: '1',
        title: 'A+B Problem',
        avatar: 'https://joeschmoe.io/api/v1/random',
        content: '方法一，暴力枚举\n' +
            '解题思路\n' +
            '最容易想到的方法是枚举数组中的每一个数 x，寻找数组中是否存在 \\textit{target} - x。\n' +
            '当用遍历整个数组的方式寻找 \\textit{target} - x 时，需要注意到每一个位于 x 之前的元素都已经和 x 匹配过，因此不需要再进行匹配。而每一个元素不能被使用两次，所以',
        viewNum: 666,
        thumbNum: 666,
        date: '2023/04/15',
      },
    ];

    const onSearch = (searchValue: string) => {
      console.log(searchValue)
      //TODO

    };

    return{
      searchText,
      data,
      blank: '🎉RookCode',
      onSearch,
    }
  }
}
</script>

<style scoped>

</style>