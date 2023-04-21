<template>
  <div class="user-detail-area">

    <a-space direction="vertical"
             :size=4>

      <button class="edit-button">编辑个人信息</button>

      <div class="info-detail-item" style="margin-top: 1.2rem">
        <div style="color: #262626; font-weight: bold; font-size: 1.1rem">个人简介</div>
        <div style="color: #5c5c5c; margin-top: 0.4rem">这个人太懒了，什么都没有留下</div>
      </div>

      <a-divider/>


      <div class="info-detail-item">
        <div style="color: #262626; font-weight: bold; font-size: 1.1rem">成就贡献</div>

        <div class="contribution-item">
          <eye-outlined style="color: #007aff"/>
          <span style="color: #5c5c5c">阅读总数</span>
          <span style="color: #262626">110</span>

        </div>

        <div class="contribution-item">
          <like-outlined style="color: #00af9b"/>
          <span style="color: #5c5c5c">获得点赞</span>
          <span style="color: #262626">1</span>
        </div>

      </div>


      <a-divider/>


    </a-space>

    <div class="info-detail-item">
      <div style="color: #262626; font-weight: bold;">语言</div>

      <div v-for="(value, key) in langData" :key="key" >

        <div style="font-size: 0.8rem; margin-top: 1rem">
          <span style="
          color: #8a8a8e;
background-color: #f2f3f4;
padding: 0.3rem 0.7rem;
border-radius: 0.8rem">

            {{ value.lang }}</span>

          <div style="float: right;">
            <span style="color: #8a8a8e">解题数 </span>
            <span style="color: #262626">{{ value.num }}</span>

          </div>
        </div>

      </div>
    </div>


  </div>
</template>

<script lang="ts">

let langData = [
  {lang: 'C++', num: 144},
  {lang: 'Java', num: 13},
  {lang: 'Python', num: 11},
  {lang: 'C', num: 51},
]

export default {
  name: "UserInfoDetail",
  setup() {

    // location.reload()
    return {
      langData
    };
  },
}
</script>

<style scoped>

.user-detail-area {
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  font-family: 微软雅黑;
  box-shadow: 0 2px 8px lightgrey;
}

.edit-button {
  background-color: #eff9f2;
  color: #2db55d;
  border: none;
  border-radius: 0.5rem;
  padding: 0.4rem 3.9rem 0.4rem 3.9rem;
  font-size: 0.9rem;

}

.info-detail-item{
  text-align: left;
}

.contribution-item {
  margin-top: 0.6rem;
}

.contribution-item span {
  margin-right: 0.5rem;
}

</style>