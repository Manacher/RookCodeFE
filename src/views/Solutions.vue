<template>


  <a-layout
      style="width: 45%;height: 100%;
      background-color: white;
      margin-left: 0.5rem;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      overflow: auto;
      box-shadow: 0 0 5px 1px #999;

      ">

    <!-- 这一行写搜索和题解   -->
    <a-row>
      <a-col :span="20">
        <a-input-search
            placeholder="请输入题解名称"
            style="width: 100%;padding-left: 0px"
            @search="onSearch"
        />
      </a-col>
      <a-col :span="4">
        <a-button type="primary"
                  style="width: 100%;background-color: green"
                  @click="writeSolution">
          写题解
        </a-button>
      </a-col>
    </a-row>



    <a-divider style="border-color: #7cb305" dashed />
    <h4  style="text-align: left ;
          padding-left: 4px;
          font-weight: bold;
      font-family:'宋体',serif;
      font-size: 15px">不限</h4>
    <div style="height: 100px;overflow: auto;float: left;background-color: white">
        <a-button
            v-for="(item, index) in tag_btn_list"
            :key="index"
            style="border-radius: 15px;float: left; margin-right: 10px;"
            @click="choosetag(index)"
            :class="{'tag_btn_choosed':item.isChoosed}"
        >
          {{ item.tag }}
        </a-button>
    </div>
    <a-divider style="border-color: #7cb305" dashed />




    <a-list
        item-layout="horizontal"
            :data-source="data">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta style="text-align: left"
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <template #title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar src="https://joeschmoe.io/api/v1/random" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>




    <a-pagination
        v-model:current="current"
        :total="500"
        @change="tableChange">
      <template #itemRender="{ type, originalElement }">
        <a v-if="type === 'prev'">前一页</a>
        <a v-else-if="type === 'next'">后一页</a>
        <component :is="originalElement" v-else></component>
      </template>
    </a-pagination>





  </a-layout>

</template>

<script lang="ts">

import {defineComponent, onMounted, ref} from 'vue';
import store from "@/store";
interface DataItem {
  title: string;
}
const data: DataItem[] = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];



export default defineComponent({

  setup(){


    onMounted(() => {
      //初始的时候获取按钮标签


    })

    /*创建按钮的数组*/
    let tag_btn_list = ref([{tag:'C++',isChoosed:false},
      {tag:'python',isChoosed:false},
      {tag:'java',isChoosed:false},
      {tag:'回溯',isChoosed:false},
      {tag:'DFS',isChoosed:false},
      {tag:'BFS',isChoosed:false},
      {tag:'DP',isChoosed:false},
      {tag:'贪心',isChoosed:false},
      {tag:'暴力',isChoosed:false},
      {tag:'树',isChoosed:false},
      {tag:'栈',isChoosed:false},
      {tag:'队列',isChoosed:false}])

    const activeKey = ref(['1']);
    const customStyle =
        'background: #f7f7f7;' +
        'border-radius: 4px;' +
        'margin-bottom: 24px;' +
        'border: 0;' +
        'overflow: hidden'+
        'width:100%'+
        'height:500px';






    //搜索题解函数
    const onSearch = (searchValue: string) => {
      alert("搜索")
    };
    /*按钮点击事件*/
    const choosetag=(item:number)=>{

      console.log("item0 click status ", tag_btn_list.value[0].isChoosed)

      if(tag_btn_list.value[item].isChoosed){
        tag_btn_list.value[item].isChoosed=!tag_btn_list.value[item].isChoosed;
        //都需要发生变化
      }else{
        //都需要发生变化
        tag_btn_list.value[item].isChoosed=!tag_btn_list.value[item].isChoosed;
      }

    }
    //跳转到写题解界面
    const writeSolution=()=>{
      //
    };


    //当前的页码
    const current=ref(1)
    //页码改变的事件
    const tableChange=(page:number,pageSize:number)=>{

      //请求新的题解，做填充

    };




    return{


      //测试
      data,

      //写题解函数
      writeSolution,

      //当前的页码
      current,
      //页码改变的事件
      tableChange,


      //所有的标签按钮
      tag_btn_list,
      //点击按钮事件
      choosetag,

      //下拉选择标签
      activeKey,
      customStyle,

      //搜索函数
      onSearch,
    };
  }



});

</script>



<!--占据左侧的位置-->
<style scoped>



.tag_btn_choosed{
  background-color: dodgerblue;
}

</style>