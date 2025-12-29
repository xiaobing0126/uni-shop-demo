<template>
  <cartMain></cartMain>
</template>

<script setup lang="ts">
import cartMain from './components/cartMain.vue'
</script>

<style lang="scss">
// 为了处理h5端，滑动到底部，不加载更多的问题，因为视窗高度（即整个窗口高度-导航栏-tabbar）很高，滑动不到底部
.page {
  height: 100%;
}
</style>
