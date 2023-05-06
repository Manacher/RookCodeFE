<template>
  <div class="user-info-card">

    <a-row>
      <a-col>
        <img
            :src="cardData.avatar"
            style="width: 5.5rem; height: 5.5rem; border-radius: 0.7rem"/>
      </a-col>
      <a-col>
        <a-space direction="vertical"
                 :size=0
                 style="text-align: left; margin-left: 1.5rem">
          <span style="color: #262626; font-size: 1.8rem; font-weight: bold">{{cardData.nickname}}</span>
          <span style="color: #87878c">{{cardData.account}}</span>
        </a-space>
      </a-col>
    </a-row>

  </div>
</template>

<script lang="ts">
import {watch, ref} from "vue";

export default {
  props: ['cardInfo'],
  name: "user-info-card",
  setup(props: any, context: any){
    let cardData = ref({
      avatar: '',
      nickname: '',
      account: '',
    })

    // 监听数据加载变化，当数据加载完成后对ref变量赋值，进行响应式变化
    watch(() => props.cardInfo.isLoading, (newValue, oldValue) => {
      cardData.value.avatar = props.cardInfo.avatar
      cardData.value.nickname = props.cardInfo.nickname
      cardData.value.account = props.cardInfo.account
    });

    return{
      cardData
    }
  }
}
</script>

<style scoped>

.user-info-card {

}

</style>