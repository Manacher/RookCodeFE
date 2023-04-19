<template>

  <a-layout style="width: 45%;height: 100%">
    题解
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
                  style="width: 100%;background-color: green">
          写题解
        </a-button>
      </a-col>
    </a-row>


<!-- 有点小问题   -->
<!--    <a-row>
      <a-collapse v-model:activeKey="activeKey" :bordered="false">
        <template #expandIcon="{ isActive }">
          <caret-right-outlined :rotate="isActive ? 90 : 0" />
        </template>
        <a-collapse-panel key="1" header="下拉选择标签" :style="customStyle">
          <div>
            <a-space :size=15>
              <a-button
                        v-for="(item, index) in btn_lst"
                        :key="index"
                        style="border-radius: 15px;"
                        :class="{tag_btn_choosed:index%2===0}"
                        @click="choosetag(item)"
              >
                {{ item }}
              </a-button>
            </a-space>

          </div>
        </a-collapse-panel>
      </a-collapse>
    </a-row>-->

    <h4>选择题解标签</h4>
    <div style="height: 100px;overflow: auto;float: left">
        <a-button
            v-for="(item, index) in btn_lst"
            :key="index"
            style="border-radius: 15px;float: left; margin-right: 10px;"
            :class="{tag_btn_choosed:index%2===0}"
            @click="choosetag(item)"

        >
          {{ item }}
        </a-button>
    </div>

  </a-layout>

</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
export default defineComponent({

  setup(){


    const activeKey = ref(['1']);
    const customStyle =
        'background: #f7f7f7;' +
        'border-radius: 4px;' +
        'margin-bottom: 24px;' +
        'border: 0;' +
        'overflow: hidden'+
        'width:100%'+
        'height:500px';


    /*创建按钮的数组*/
    const btn_lst=['按钮1','按钮2','按钮3','按钮4',
      '按钮5','按钮6','按钮7','按钮8','按钮9','按钮10',
      '按钮11','按钮12','按钮13','按钮14','按钮15']


    /*按钮点击事件*/
    const choosetag=(item:string)=>{
      //alert(item)
    }

    const onSearch = (searchValue: string) => {
      alert("搜索")
    };



    return{


      //所有的标签按钮
      btn_lst,
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