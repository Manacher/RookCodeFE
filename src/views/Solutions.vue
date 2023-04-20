<template>


  <div class="main_box" :style="myStyle">

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
          <template #icon>
            <EditOutlined />
          </template>
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
    <div style="padding-bottom: 50px;background-color: white">
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
            :data-source="solution_info_list">
      <template #renderItem="{ item }">
        <a-list-item >
          <a-list-item-meta style="text-align: left"
              :description="item.descrp"
          >
            <template #title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar :src="item.avatar" />
            </template>
          </a-list-item-meta>
        </a-list-item>

        <a-tag color="#55acee" style="float: left;margin-left: 2rem;margin-top: 0.3rem">
          <template #icon>
            <LikeOutlined />
          </template>
          {{item.like_cnt}}
        </a-tag>
        <a-tag color="#55acee" style="margin-top: 0.3rem">
          <template #icon>
            <UserOutlined />
          </template>
          {{item.view_cnt}}
        </a-tag>
        <a-tag color="#55acee" style="float: right;margin-right: 2rem;margin-top: 0.3rem">
          <template #icon>
            <MessageOutlined />
          </template>
          {{item.com_cnt}}
        </a-tag>
        <a-divider style="border-color: #7cb305" dashed />

      </template>
    </a-list>




    <a-pagination
        v-model:current="current"
        :total="500"
        style="padding-bottom: 1rem;padding-top: 1rem"
        @change="tableChange">
      <template #itemRender="{ type, originalElement }">
        <a v-if="type === 'prev'">前一页</a>
        <a v-else-if="type === 'next'">后一页</a>
        <component :is="originalElement" v-else></component>
      </template>

    </a-pagination>





  </div>

</template>

<script lang="ts">

import {defineComponent, onMounted, ref} from 'vue';
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

    const myStyle=ref({height:""})
    onMounted(() => {
      //初始的时候获取按钮标签

      //获取屏幕高度
      myStyle.value.height=window.outerHeight-100+"px";


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

    /*创建题解的数组*/
    let solution_info_list=ref([
        {title:"测试标题1",descrp:"测试内容1哈哈哈哈哈哈哈",
          avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {title:"测试标题2",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {title:"测试标题3",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {title:"测试标题4",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {title:"测试标题5",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {title:"测试标题6",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {title:"测试标题7",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {title:"测试标题8",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {title:"测试标题9",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {title:"测试标题10",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {title:"测试标题11",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},])








    //搜索题解函数
    const onSearch = (searchValue: string) => {
      alert("搜索")
      console.log(myStyle)
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
      //发送的类型为页码加数目

      //将数组清空之后填充
      

    };




    return{

      //获取屏幕高度
      myStyle,
      //题解的数组
      solution_info_list,

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

      //搜索函数
      onSearch,
    };
  }



});

</script>



<!--占据左侧的位置-->
<style scoped>
.main_box{
  width: 45%;
  background-color: white;
  margin-left: 0.5rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  overflow: auto;
  box-shadow: 0 0 5px 1px #999;
}
.tag_btn_choosed{
  background-color: dodgerblue;
}
</style>