<template>
  <div class="front-banner-area">
    <div
      style="
        position: absolute;
        top: -1.1rem;
        text-align: left;
        font-size: 1.4rem;
        color: #535353;
      "
    >
      推荐
    </div>

    <a-carousel arrows>
      <template #prevArrow>
        <div
          class="custom-slick-arrow"
          style="top: -2.4rem; left: 92%; z-index: 1"
        >
          <left-square-filled />
        </div>
      </template>

      <template #nextArrow>
        <div
          class="custom-slick-arrow"
          style="top: -2.4rem; right: 1%; z-index: 1"
        >
          <right-square-filled />
        </div>
      </template>

      <div class="banner-page">
        <div>
          <a-row :gutter="0">
            <a-col :span="8">
              <router-link to="/discussion/detail/47">
                <img
                  class="banner-image"
                  style="margin-right: auto"
                  src="https://pic.leetcode.cn/1681956795-LmTyue-侧边栏.png"
                />
              </router-link>
            </a-col>

            <a-col :span="8">
              <router-link to="/discussion/detail/49">
                <img
                  class="banner-image"
                  style="margin-left: auto; margin-right: auto"
                  src="https://pic.leetcode.cn/1681885944-SLNYar-动态规划精讲（二）.png"
                />
              </router-link>
            </a-col>

            <a-col :span="8">
              <router-link to="/discussion/detail/48">
                <img
                  class="banner-image"
                  style="margin-left: auto"
                  src="https://pic.leetcode-cn.com/1662013960-HAXnSh-题库.png"
                />
              </router-link>
            </a-col>
          </a-row>
        </div>
      </div>

      <div class="banner-page">
        <div>
          <a-row :gutter="24">
            <a-col :span="8">
              <router-link to="/discussion/detail/50">
                <img
                  class="banner-image"
                  style="margin-right: auto"
                  src="https://pic.leetcode.cn/1681885778-toCwCJ-贪心算法-题库.jpg"
                />
              </router-link>
            </a-col>

            <a-col :span="8">
              <router-link to="/discussion/detail/51">
                <img
                  class="banner-image"
                  style="margin-left: auto; margin-right: auto"
                  src="https://pic.leetcode.cn/1680000867-xQYuiM-%E9%A2%98%E5%BA%93.png?x-oss-process=image%2Fformat%2Cwebp"
                />
              </router-link>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-carousel>
  </div>
</template>

<script lang="ts">
export default {
  name: "front-banner",
};
</script>

<style scoped>
.front-banner-area {
  font-family: 微软雅黑;
  padding-top: 2rem;
}

.banner-page {
  padding-bottom: 1rem;
}

.banner-image {
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  max-width: 20rem;
}

.banner-image:hover {
  cursor: pointer;
}

.ant-carousel :deep(.slick-slide) {
  text-align: center;
  overflow: hidden;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 2rem;
  height: 2rem;
  font-size: 2rem;
  color: #5b5b5b;
  background-color: rgba(0, 0, 0, 0);
  opacity: 0.3;
  z-index: 1;
}

.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}

.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #ffffff;
}
</style>
