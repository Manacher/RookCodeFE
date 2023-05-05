<template>
  <div class="user-detail-area">
    <a-space direction="vertical" :size="4" style="width: 100%">
      <UserSubscribe />

      <button
        class="edit-button"
        @click="onEditClicked"
        v-if="userDetailData.isSelf"
      >
        编辑个人信息
      </button>

      <div class="info-detail-item" style="margin-top: 1.2rem">
        <div style="color: #262626; font-weight: bold; font-size: 1.1rem">
          个人简介
        </div>

        <div style="color: #5c5c5c; margin-top: 0.4rem">
          {{ userDetailData.description }}
        </div>
      </div>

      <a-divider />

      <div class="info-detail-item">
        <div style="color: #262626; font-weight: bold; font-size: 1.1rem">
          成就贡献
        </div>

        <div class="contribution-item">
          <eye-outlined style="color: #007aff" />
          <span style="color: #5c5c5c; margin-left: 0.5rem">阅读总数</span>
          <span style="color: #262626; margin-left: 0.5rem">{{
            userDetailData.view
          }}</span>
        </div>

        <div class="contribution-item">
          <like-outlined style="color: #00af9b" />
          <span style="color: #5c5c5c; margin-left: 0.5rem">获得点赞</span>
          <span style="color: #262626; margin-left: 0.5rem">{{
            userDetailData.like
          }}</span>
        </div>
      </div>

      <a-divider />
    </a-space>

    <div class="info-detail-item">
      <div style="color: #262626; font-weight: bold; font-size: 1.1rem">
        语言
      </div>

      <div v-for="(value, key) in detailInfo.langs" :key="key">
        <div style="font-size: 0.8rem; margin-top: 1rem">
          <span
            style="
              color: #8a8a8e;
              background-color: #f2f3f4;
              padding: 0.3rem 0.7rem;
              border-radius: 0.8rem;
            "
          >
            {{ value.lang_name }}</span
          >
          <div style="float: right">
            <span style="color: #8a8a8e">解题数 </span>
            <span style="color: #262626">{{ value.total_solve }}</span>
          </div>
        </div>
      </div>
    </div>

    <a-modal
      title="编辑个人信息"
      v-model:visible="modalVisible"
      :confirm-loading="modalLoading"
      @ok="handleModalOK"
      cancelText="取消"
      ok-text="保存"
    >
      <a-form
        :model="editInfo"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-form-item label="头像">
          <a-upload
            :file-list="fileList"
            :before-upload="beforeUpload"
            class="avatar-uploader"
          >
            <div class="user-avatar-area">
              <img
                :src="editInfo.imageSrc"
                alt="avatar"
                style="
                  width: 10rem;
                  height: 10rem;
                  border-radius: 1rem;
                  margin-left: 4rem;
                "
              />
              <div id="avatar-hover-div">
                <a-space
                  direction="vertical"
                  :size="2"
                  style="
                    align-items: center;
                    margin-left: 1.9rem;
                    margin-top: 3.4rem;
                  "
                >
                  <plus-circle-outlined style="font-size: 2rem" />
                  <span style="font-size: 1rem">点击修改头像</span>
                </a-space>
              </div>
            </div>
          </a-upload>
        </a-form-item>

        <a-form-item label="昵称">
          <a-input
            v-model:value="editInfo.nickName"
            placeholder="请输入新的昵称"
          />
        </a-form-item>
        <a-form-item label="个人简介">
          <a-input
            v-model:value="editInfo.description"
            placeholder="请输入新的简介"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";
import { message, Modal } from "ant-design-vue";
import UserSubscribe from "@/components/UserPage/UserFollower.vue";
import {
  uploadUserInfo,
  UserInfoUploadBody,
} from "@/components/UserPage/userPageHttp";

export default {
  props: ["detailInfo"],
  name: "UserInfoDetail",
  components: {
    UserSubscribe,
  },
  setup(props: any, context: any) {
    let userDetailData = ref({
      description: "",
      view: 0,
      like: 0,
      langs: [],
      isSelf: false,
    });

    let editInfo = ref({
      nickName: "",
      description: "",
      imageSrc: "",
    });

    let modalVisible = ref(false);
    let modalLoading = ref(false);

    // todo 根据当前用户是否是自己，选择显示或隐藏编辑个人资料按钮

    // 监听数据加载变化，当数据加载完成后对ref变量赋值，进行响应式变化
    watch(
      () => props.detailInfo.isLoading,
      (newValue, oldValue) => {
        userDetailData.value.description = props.detailInfo.description;
        userDetailData.value.view = props.detailInfo.view;
        userDetailData.value.like = props.detailInfo.like;
        userDetailData.value.langs = props.detailInfo.langs;
        userDetailData.value.isSelf = props.detailInfo.isSelf;
      }
    );

    let onEditClicked = () => {
      editInfo.value.imageSrc = props.detailInfo.avatar;
      editInfo.value.nickName = props.detailInfo.nickname;
      editInfo.value.description = props.detailInfo.description;
      modalVisible.value = true;
    };

    let handleModalOK = () => {
      modalLoading.value = true;
      let body: UserInfoUploadBody = {
        avatar: editInfo.value.imageSrc,
        nickname: editInfo.value.nickName,
        description: editInfo.value.description,
      };

      uploadUserInfo(body).then((res: any) => {
        if (res.success) {
          let secondsToGo = 1;
          modalLoading.value = false;
          const modal = Modal.success({
            title: "修改成功",
            content: `用户信息修改成功，即将刷新页面`,
          });

          const interval = setInterval(() => {
            secondsToGo -= 1;
          }, 1000);
          setTimeout(() => {
            clearInterval(interval);
            modal.destroy();
            location.reload();
          }, secondsToGo * 1000);
        } else {
          modalLoading.value = false;
          message.error(res.message);
        }
      });
    };

    const fileList = ref<any>([]);
    const uploading = ref<boolean>(false);

    async function getBase64(file: any) {
      let src = "";
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
      });
      editInfo.value.imageSrc = src;
    }

    const beforeUpload = (file: any) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("只能上传JPG或PNG文件");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("只能上传小于2MB的图片");
        return false;
      }
      uploading.value = true;
      getBase64(file);
      uploading.value = false;
      return false;
    };

    return {
      userDetailData,
      modalVisible,
      modalLoading,
      handleModalOK,
      onEditClicked,

      fileList,
      uploading,
      beforeUpload,
      editInfo,
    };
  },
};
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

.edit-button:hover {
  background-color: #ebf5ee;
}

.info-detail-item {
  text-align: left;
}

.contribution-item {
  margin-top: 0.6rem;
}

#avatar-hover-div {
  z-index: 1;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
  color: white;
  position: absolute;
  left: 4rem;
  bottom: 0;
  height: 10rem;
  width: 10rem;
  border-radius: 1rem;
  background-color: rgba(74, 74, 74, 0.75);
}

#avatar-hover-div:hover {
  opacity: 1;
}
</style>
