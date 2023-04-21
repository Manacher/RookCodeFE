<template>
  <div class="user-info-card">

    <a-row>
      <a-col>
        <img
            src="https://assets.leetcode.cn/aliyun-lc-upload/users/elated-villaniw8c/avatar_1645749344.png"
            style="width: 5.5rem; height: 5.5rem; border-radius: 0.7rem"/>
      </a-col>
      <a-col>
        <a-space direction="vertical"
                 :size=0
                 style="text-align: left; margin-left: 1.5rem">
          <span style="color: #262626; font-size: 1.8rem; font-weight: bold">AgarthaSF</span>
          <span style="color: #87878c">1426887306@qq.com</span>
        </a-space>
      </a-col>
    </a-row>

  </div>
</template>

<script>
export default {
  name: "user-info-card"
}
</script>

<style scoped>

.user-info-card {

}

</style>