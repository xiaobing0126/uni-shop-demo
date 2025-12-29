<template>
  <!--推荐专区-->
  <view class="panel hot">
    <view class="item" v-for="item in props.list" :key="item.id">
      <view class="title">
        <text class="title-text">{{ item.title }}</text>
        <text class="title-desc">{{ item.alt }}</text>
      </view>
      <navigator :url="`/pages/hot/hot?type=${item.type}`" hover-class="none" class="cards">
        <image v-for="pic in item.pictures" :key="pic" :src="pic" mode="aspectFit" class="image" />
      </navigator>
    </view>
  </view>
</template>

<script lang="ts" setup>
const props = defineProps<{
  list?: Array<any>
}>()
</script>

<style lang="scss">
@import '../styles/hotPanel.scss';
</style>
