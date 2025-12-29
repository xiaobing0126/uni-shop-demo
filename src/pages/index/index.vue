<template>
  <!--自定义导航栏组件-->
  <customNavBar />
  <scroll-view
    scroll-y
    class="scroll-view"
    @scrolltolower="onSrcollTolower"
    refresher-enabled
    @refresherrefresh="onRefresherRefresh"
    :refresher-triggered="isRefresh"
  >
    <pageSkeleton v-if="isRefresh" />
    <!--轮播图-->
    <view style="width: 100%; height: 280rpx">
      <XtxSwpier :list="bannerList" />
    </view>
    <!--分类导航-->
    <categoryPanel :list="categoryList" />
    <!--热门推荐-->
    <hotPanel :list="hotList" />
    <!--猜你喜欢-->
    <XtxGuess ref="guessRef" />
  </scroll-view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import customNavBar from './components/customNavBar.vue'
import categoryPanel from './components/categoryPanel.vue'
import hotPanel from './components/hotPanel.vue'
import pageSkeleton from './components/pageSkeleton.vue'

// 获取首页轮播图数据
import { getHomeBannerApi, getHomeCategoryApi, getHomeHotApi } from '@/services/home'

// 猜你喜欢组件
const guessRef = ref(<any>null)

// 是否完成下拉刷新
const isRefresh = ref(true)

const bannerList = ref<Array<any>>([])
const categoryList = ref<Array<any>>([])
const hotList = ref<Array<any>>([])

onLoad(() => {
  Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()]).then(() => {
    isRefresh.value = false
  })
})

// 获取首页轮播图数据
async function getHomeBannerData() {
  const res = await getHomeBannerApi()
  console.log('首页轮播图数据==', res)
  if (res && res.code === '1') {
    bannerList.value = res.result || []
  }
}

// 获取首页分类导航数据
async function getHomeCategoryData() {
  const res = await getHomeCategoryApi()
  console.log('首页分类导航数据==', res)
  if (res && res.code === '1') {
    categoryList.value = res.result || []
  }
}

// 获取首页热门推荐数据
async function getHomeHotData() {
  const res = await getHomeHotApi()
  console.log('首页热门推荐数据==', res)
  if (res && res.code === '1') {
    hotList.value = res.result || []
  }
}

// 下拉刷新触发
function onRefresherRefresh() {
  console.log('下拉刷新了')
  isRefresh.value = true
  guessRef.value && guessRef.value.resetData()
  // 重新获取数据
  Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    guessRef.value && guessRef.value.getMore(),
  ]).then(() => {
    isRefresh.value = false
  })
}

// 滚动到底部触发
function onSrcollTolower() {
  console.log('滚动到底部了')
  guessRef.value && guessRef.value.getMore()
}
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.scroll-view {
  flex: 1;
}
</style>
