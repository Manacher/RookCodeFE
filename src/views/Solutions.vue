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
        :total="total_cnt"
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

type solutionType={
  ID:number,
  title:string,
  descrp:string,
  avatar_src:string,
  like_cnt:number,
  view_cnt:number,
  com_cnt:number
}


export default defineComponent({

  setup(){

    const myStyle=ref({height:""})
    onMounted(() => {
      //初始的时候获取按钮标签

      //获取屏幕高度
      myStyle.value.height=window.outerHeight-100+"px";


    })

    //当前的页码
    const current=ref(1)
    //当前页码大小
    const current_size=ref(10)
    //当前总的题解数目
    const total_cnt=ref(500)
    //当前的题解字符串
    const tag_str=ref("")






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
        {ID:1,title:"测试标题1",descrp:"测试内容1哈哈哈哈哈哈哈",
          avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {ID:2,title:"测试标题2",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {ID:3,title:"测试标题3",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {ID:4,title:"测试标题4",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {ID:5,title:"测试标题5",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {ID:6,title:"测试标题6",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {ID:7,title:"测试标题7",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {ID:8,title:"测试标题8",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {ID:9,title:"测试标题9",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {ID:10,title:"测试标题10",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},
      {ID:11,title:"测试标题11",descrp:"测试内容1哈哈哈哈哈哈哈",
        avatar_src:"https://joeschmoe.io/api/v1/random", like_cnt:0,view_cnt:0,com_cnt:0},])



    //搜索题解函数
    const onSearch = (searchValue: string) => {
      console.log(searchValue)

      //调用函数

    };
    /*按钮点击事件*/
    const choosetag=(item:number)=>{

      console.log("item0 click status ", tag_btn_list.value[0].isChoosed)
      tag_btn_list.value[item].isChoosed=!tag_btn_list.value[item].isChoosed;
      //获得当前的题解字符串


      var str=""
      //调用函数
      for (var i=0;i<tag_btn_list.value.length;i++){

        if(tag_btn_list.value[i].isChoosed){
          if(i!=(tag_btn_list.value.length-1)){
            str+=tag_btn_list.value[i].tag+"_"
          }else{
            str+=tag_btn_list.value[i].tag
          }
        }
      }
      tag_str.value=str
      alert(tag_str.value)

    }
    //跳转到写题解界面
    const writeSolution=()=>{
      //路由

    };


    //页码改变的事件
    const tableChange=(page:number,pageSize:number)=>{

      current.value=page
      current_size.value=pageSize

      //重新请求数据

    };


    //核心函数，对数据进行渲染
    const getDataAndLoad=(page:number,pageSize:number,searchValue:string,tag_str:string)=>{

      //发送请求
    }



    return{
      //获取屏幕高度
      myStyle,
      //题解的数组
      solution_info_list,
      //总题解数目
      total_cnt,
      //所有的标签按钮
      tag_btn_list,
      //当前的页码
      current,
      //当前的页码大小
      current_size,
      //当前的题解字符串
      tag_str,

      //搜索题解函数
      onSearch,
      //核心函数，对数据进行渲染
      getDataAndLoad,
      //写题解函数：跳转路由
      writeSolution,
      //页码改变的事件
      tableChange,
      //点击按钮选择标签事件
      choosetag,

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