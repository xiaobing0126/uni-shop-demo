<template>
  <view class="carousel">
    <swiper :interval="3000" :autoplay="false" circular @change="changeSwiper">
      <swiper-item v-for="item in props.list" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image :src="item.imgUrl" mode="aspectFill" class="image" />
        </navigator>
      </swiper-item>
    </swiper>
    <view class="indicator">
      <view
        v-for="(item, index) in props.list"
        class="dot"
        :class="{ active: index === activeIndex }"
        :key="item.id"
      ></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeIndex = ref(0)

const props = defineProps<{
  list?: Array<any>
}>()

// 监听轮播图变化
function changeSwiper(e: any) {
  activeIndex.value = e.detail.current
}
</script>

<style lang="scss" scoped>
.carousel {
  height: 240rpx;
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  background-color: #efefef;
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 16rpx;
    display: flex;
    justify-content: center;
    .dot {
      width: 30rpx;
      height: 6rpx;
      margin: 0 8rpx;
      border-radius: 6rpx;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .active {
      background-color: #ffffff;
    }
  }
  .navigator {
    width: 100%;
    height: 100%;
    .image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
