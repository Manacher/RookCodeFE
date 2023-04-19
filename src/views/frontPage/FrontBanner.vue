<template>
  <a-carousel arrows>

    <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
        <left-circle-outlined />
      </div>
    </template>

    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 10px">
        <right-circle-outlined />
      </div>
    </template>

    <div class="banner-page">
      <div style="background-color: #ececec; padding: 20px">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-card title="Card title" :bordered="false">
              <p>card content</p>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card title="Card title" :bordered="false">
              <p>card content</p>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card title="Card title" :bordered="false">
              <p>card content</p>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="banner-page">
      <div style="background-color: #ececec; padding: 20px">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-card title="Card title" :bordered="false">
              <p>card content</p>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card title="Card title" :bordered="false">
              <p>card content</p>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>

  </a-carousel>
</template>

<script lang="ts">
export default {
  name: "front-banner"
}
</script>

<style scoped>

.banner-page{
  padding: 1rem 2rem;
}



.ant-carousel :deep(.slick-slide) {
  text-align: center;
  background: white;
  overflow: hidden;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
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