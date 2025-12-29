<template>
  <!--猜你喜欢-->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <view class="guess-item" v-for="item in geussList" :key="item.id" @tap="goToDetail(item)">
      <image class="image" :src="item.picture" mode="aspectFill" />
      <view class="name">{{ item.name }}</view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </view>
  </view>
  <view class="loading-text"> {{ loading ? '正在加载中...' : '没有更多了' }} </view>
</template>

<script lang="ts" setup>
import { getHomeGuessLikeApi } from '@/services/home'
import { useMemberStore } from '@/stores'
import { onMounted, reactive, ref } from 'vue'

const geussList = ref<Array<any>>([])
const pager = reactive({
  page: 1,
  pageSize: 10,
})
let loading = ref(true)

onMounted(() => {
  getGuessListData()
})

// 获取猜你喜欢数据
async function getGuessListData() {
  if (!loading.value) {
    return uni.showToast({
      title: '没有更多了',
      icon: 'none',
      mask: true,
    })
  }
  const res = await getHomeGuessLikeApi(pager)
  console.log('猜你喜欢数据==', res)
  if (res && res.code === '1') {
    geussList.value.push(...(res.result.items || []))
    if (pager.page <= res.result.pages) {
      loading.value = true
      pager.page += 1
    } else {
      loading.value = false
    }
  }
}

// 前往详情
function goToDetail(item: any) {
  const memberStore = useMemberStore()
  if (!memberStore.profile) {
    return uni.showToast({
      title: '请先登陆',
      icon: 'none',
      mask: true,
    })
  }
  uni.navigateTo({
    url: `/pages/goods/goods?id=${item.id}`,
  })
}

// 重置数据
function resetData() {
  geussList.value = []
  pager.page = 1
  loading.value = true
}

defineExpose({
  getMore: getGuessListData,
  resetData,
})
</script>

<style lang="scss" scoped>
/*分类标题*/
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;
    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

/*猜你喜欢*/
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  .guess-item {
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }
  .image {
    width: 304rpx;
    height: 260rpx;
  }
  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    line-height: 1;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 26rpx;
  }
  .small {
    font-size: 80%;
  }
}

// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
