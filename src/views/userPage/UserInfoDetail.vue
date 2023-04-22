<template>
  <div class="user-detail-area">

    <a-space direction="vertical"
             :size=4>

      <button class="edit-button" @click="onEditClicked">编辑个人信息</button>

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
      <div style="color: #262626; font-weight: bold; font-size: 1.1rem">语言</div>

      <div v-for="(value, key) in langData" :key="key">

        <div style="font-size: 0.8rem; margin-top: 1rem">
          <span style="color: #8a8a8e;background-color: #f2f3f4;padding: 0.3rem 0.7rem;border-radius: 0.8rem">

            {{ value.lang }}</span>

          <div style="float: right;">
            <span style="color: #8a8a8e">解题数 </span>
            <span style="color: #262626">{{ value.num }}</span>

          </div>
        </div>

      </div>
    </div>


    <a-modal
        title="编辑个人信息"
        v-model:visible="modalVisible"
        :confirm-loading="modalLoading"
        @ok="handleModalOK"
    >
      <a-form :model="userinfo" :label-col="{span: 6}" :wrapper-col="{span: 18}">

        <a-form-item label="头像">

          <a-upload :file-list="fileList" :before-upload="beforeUpload" class="avatar-uploader">

            <div class="user-avatar-area">
              <img :src="imageSrc" alt="avatar" style="width: 10rem; height: 10rem; border-radius: 1rem; margin-left: 4rem;"/>
              <div id="avatar-hover-div">
                <a-space direction="vertical" :size="2" style="align-items: center; margin-left: 1.9rem; margin-top: 3.4rem">
                  <plus-circle-outlined style="font-size: 2rem"/>
                  <span style="font-size: 1rem">点击修改头像</span>
                </a-space>

              </div>

            </div>


          </a-upload>
        </a-form-item>

        <a-form-item label="昵称">
          <a-input v-model:value="userinfo.nickname" placeholder="请输入新的昵称"/>
        </a-form-item>
        <a-form-item label="个人简介">
          <a-input v-model:value="userinfo.description" placeholder="请输入新的简介"/>
        </a-form-item>


      </a-form>
    </a-modal>


  </div>
</template>

<script lang="ts">

import {onMounted, ref} from 'vue'
import {message} from "ant-design-vue";

let langData = [
  {lang: 'C++', num: 144},
  {lang: 'Java', num: 13},
  {lang: 'Python', num: 11},
  {lang: 'C', num: 51},
]

let userinfo = ref({
  nickname: "AgarthaSF",
  description: "这个人太懒了，什么都没有留下",
  avatar: "https://assets.leetcode.cn/aliyun-lc-upload/users/elated-villaniw8c/avatar_1645749344.png",
})

export default {
  name: "UserInfoDetail",
  setup() {

    let modalVisible = ref(false)
    let modalLoading = ref(false)
    let handleModalOK = () => {
      location.reload()
    }

    let onEditClicked = () => {
      modalVisible.value = true;
      console.log("clicked")
    }


    const fileList = ref<any>([]);
    const uploading = ref<boolean>(false);
    let imageSrc = ref("")

    onMounted(() => {
      imageSrc.value = userinfo.value.avatar
    })

    async function getBase64(file: any) {
      let src = ""
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
      });
      imageSrc.value = src;
    }

    const beforeUpload = (file: any) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('只能上传JPG或PNG文件');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('只能上传小于2MB的图片')
        return false;
      }
      uploading.value = true;
      getBase64(file)
      uploading.value = false;
      return false;
    };

    return {
      langData,
      userinfo,
      modalVisible,
      modalLoading,
      handleModalOK,
      onEditClicked,

      fileList,
      uploading,
      beforeUpload,
      imageSrc,
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

.edit-button:hover{
  background-color: #ebf5ee;

}

.info-detail-item {
  text-align: left;
}

.contribution-item {
  margin-top: 0.6rem;
}

#avatar-hover-div{
  z-index:1;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
  color: white;
  position: absolute;
  left: 4rem;
  bottom: 0;
  height: 10rem;
  width: 10rem;
  border-radius: 1rem;
  background-color: rgba(74,74,74,0.75)
}

#avatar-hover-div:hover{
  opacity: 1;
}


</style>