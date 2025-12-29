<template>
  <view class="category">
    <navigator
      class="category-items"
      hover-class="none"
      url="/pages/index/index"
      v-for="item in props.list"
      :key="item.id"
    >
      <view class="category-item">
        <image class="icon" :src="item.icon"></image>
        <text class="text">{{ item.name }}</text>
      </view>
    </navigator>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{
  list?: Array<any>
}>()
</script>

<style lang="scss">
@import '../styles/categoryPanel.scss';
</style>
