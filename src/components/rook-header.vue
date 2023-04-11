<template>
  <a-layout-header class="header">

    <div class="logo">
        <span>
             RookCode
        </span>
    </div>
    <a-menu
        v-model:selectedKeys="navKeys"
        mode="horizontal"
        class="menu"
    >
      <a-menu-item key="1">题库</a-menu-item>
      <a-menu-item key="2">讨论</a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script lang="ts">
import {ref} from "vue";

export default {
  name: "rook-header",
  setup(){
    return{
      navKeys: ref(['1'])
    }
  }
}
</script>

<style scoped>
.header {
  background-color: white;
  caret-color: rgba(0, 0, 0, 0);
  user-select: none;
  box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.03);
  font-size: 1rem;
}

.menu {
  lineHeight: 4rem;
  font-size: 1.2rem;
  color: #5c5c5c;
  /*font-family: Consolas;*/
}

.logo {
  float: left;
  margin-left: 2rem;
  margin-right: 1rem;
  font-style: italic;
  font-size: 1.5rem;
  font-weight: bold;
}

</style>