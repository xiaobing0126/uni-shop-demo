<template>
  <view class="viewport">
    <!--推荐封面图-->
    <view class="cover">
      <image :src="bannerPicture" />
    </view>

    <!--推荐选项-->
    <view class="tabs">
      <text
        v-for="(item, index) in subTypes"
        :key="item.id"
        class="text"
        :class="{ active: activeTab === index }"
        @tap="activeTab = index"
        >{{ item.title }}</text
      >
    </view>
    <!--推荐列表-->
    <scroll-view
      v-for="(item, index) in subTypes"
      v-show="activeTab === index"
      :key="item.id"
      scroll-y
      class="scroll-view"
      @scrolltolower="onScrollToLower"
    >
      <view class="goods">
        <navigator
          v-for="good in item.goodsItems.items"
          :key="good.id"
          class="navigator"
          hover-class="none"
          :url="`pages/goods/goods?id=${good.id}`"
        >
          <image :src="good.picture" class="thumb" />
          <view class="name ellipsis">{{ good.name }}</view>
          <view class="price">¥{{ good.price }}</view>
        </navigator>
      </view>
      <view class="loading-text">
        {{ item.finish ? '没有更多数据了~' : '正在加载...' }}
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// 热门推荐页 标题和ur1
const urlMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买金', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]
const query = defineProps<{
  type: string
}>()
const currentMap = urlMap.find((item) => item.type === query.type)
uni.setNavigationBarTitle({
  title: currentMap ? currentMap!.title : '热门推荐',
})

// 获取热门推荐数据
import { getHotRecommendApi } from '@/services/hot'
import { onLoad } from '@dcloudio/uni-app'

const bannerPicture = ref<string>('')
const subTypes = ref<Array<any>>([])
const activeTab = ref(0)

async function getHotRecommendData(params?: any) {
  const res = await getHotRecommendApi(currentMap!.url, params)
  console.log('热门推荐数据==', res)
  if (res && res.code === '1') {
    bannerPicture.value = res.result.bannerPicture
    subTypes.value = res.result.subTypes
  }
}

onLoad(() => {
  getHotRecommendData()
})

// 滚动到底部加载更多
async function onScrollToLower() {
  const currentSubType = subTypes.value[activeTab.value]
  // 分页条件
  if (currentSubType.goodsItems.page < currentSubType.goodsItems.pages) {
    // 当前页码累加
    currentSubType.goodsItems.page++
  } else {
    // 标记已结束
    currentSubType.finish = true
    // 退出并轻提示
    return uni.showToast({ icon: 'none', title: '没有更多数据了~' })
  }
  const params = {
    page: currentSubType.goodsItems.page,
    pageSize: currentSubType.goodsItems.pageSize,
    subType: currentSubType.id,
  }
  const res = await getHotRecommendApi(currentMap!.url, params)
  console.log('热门推荐数据==', res)
  if (res && res.code === '1') {
    // 新的列表选项
    const newsubTypes = res.result.subTypes[activeTab.value]
    // 数组追加
    currentSubType.goodsItems.items.push(...newsubTypes.goodsItems.items)
  }
}
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  image {
    width: 100%;
    height: 100%;
  }
}
.scroll-view {
  flex: 1;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    height: 88rpx;
    font-size: 26rpx;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
