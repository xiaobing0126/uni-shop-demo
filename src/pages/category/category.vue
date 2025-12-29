<template>
  <view class="viewport">
    <!-- 搜索框 -->
    <view class="search">
      <view class="input">
        <text class="icon-search">输入搜索商品</text>
      </view>
    </view>
    <!--骨架屏-->
    <pageSkeleton v-if="categoryList.length === 0" />
    <!-- 分类 -->
    <view class="categories">
      <!-- 左侧：一级分类 -->
      <scroll-view class="primary" scroll-y>
        <view
          v-for="(item, index) in categoryList"
          :key="item.id"
          class="item"
          :class="{ active: activeTab === index }"
          @tap="tapCategory(index)"
        >
          <text class="name">{{ item.name }}</text>
        </view>
      </scroll-view>
      <!-- 右侧：二级分类 -->
      <scroll-view class="secondary" scroll-y>
        <!-- 焦点图 -->
        <XtxSwpier class="banner" :list="bannerList" />
        <!-- 内容区域 -->
        <view class="panel" v-for="item in subCategoryList" :key="item">
          <view class="title">
            <text class="name">{{ item.name }}</text>
            <navigator class="more" hover-class="none">全部</navigator>
          </view>
          <view class="section">
            <view
              v-for="goods in item.goods"
              :key="goods.id"
              class="goods"
              @tap="goToGoodsDetail(goods)"
            >
              <image class="image" :src="goods.picture"></image>
              <view class="name ellipsis">{{ goods.name }}</view>
              <view class="price">
                <text class="symbol">¥</text>
                <text class="number">{{ goods.price }}</text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getHomeBannerApi } from '@/services/home'
import { getCategoryTopApi } from '@/services/category'
import { onLoad } from '@dcloudio/uni-app'
import pageSkeleton from './components/pageSkeleton.vue'
import { useMemberStore } from '@/stores'

const activeTab = ref(0)
const bannerList = ref<Array<any>>([])
// 获取轮播图数据
async function getCategoryBannerData() {
  const res = await getHomeBannerApi(2)
  console.log('分类页轮播图数据==', res)
  if (res && res.code === '1') {
    bannerList.value = res.result || []
  }
}

const categoryList = ref<Array<any>>([])
const subCategoryList = ref<Array<any>>([])
// 获取分类列表数据
async function getCategoryListData() {
  const res = await getCategoryTopApi()
  console.log('分类列表数据==', res)
  if (res && res.code === '1') {
    categoryList.value = res.result || []
    subCategoryList.value = res.result[activeTab.value]?.children || []
  }
}

// 点击一级分类
function tapCategory(index: number) {
  activeTab.value = index
  subCategoryList.value = categoryList.value[activeTab.value]?.children || []
}

// 前往商品详情
function goToGoodsDetail(item: any) {
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

onLoad(() => {
  getCategoryBannerData()
  getCategoryListData()
})
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search {
  padding: 0 30rpx 20rpx;
  background-color: #fff;
  .input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64rpx;
    padding-left: 26rpx;
    color: #8b8b8b;
    font-size: 28rpx;
    border-radius: 32rpx;
    background-color: #f3f4f4;
  }
}
.icon-search {
  &::before {
    margin-right: 10rpx;
  }
}
/* 分类 */
.categories {
  flex: 1;
  min-height: 400rpx;
  display: flex;
}
/* 一级分类 */
.primary {
  overflow: hidden;
  width: 180rpx;
  flex: none;
  background-color: #f6f6f6;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 96rpx;
    font-size: 26rpx;
    color: #595c63;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 42rpx;
      bottom: 0;
      width: 96rpx;
      border-top: 1rpx solid #e3e4e7;
    }
  }
  .active {
    background-color: #fff;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 8rpx;
      height: 100%;
      background-color: #27ba9b;
    }
  }
}
.primary .item:last-child::after,
.primary .active::after {
  display: none;
}
/* 二级分类 */
.secondary {
  background-color: #fff;
  .carousel {
    height: 200rpx;
    margin: 0 30rpx 20rpx;
    border-radius: 4rpx;
    overflow: hidden;
  }
  .panel {
    margin: 0 30rpx 0rpx;
  }
  .title {
    height: 60rpx;
    line-height: 60rpx;
    color: #333;
    font-size: 28rpx;
    border-bottom: 1rpx solid #f7f7f8;
    .more {
      float: right;
      padding-left: 20rpx;
      font-size: 24rpx;
      color: #999;
    }
  }
  .more {
    &::after {
      font-family: 'erabbit' !important;
      content: '\e6c2';
    }
  }
  .section {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 20rpx 0;
    .goods {
      width: 150rpx;
      margin: 0rpx 30rpx 20rpx 0;
      &:nth-child(3n) {
        margin-right: 0;
      }
      image {
        width: 150rpx;
        height: 150rpx;
      }
      .name {
        padding: 5rpx;
        font-size: 22rpx;
        color: #333;
      }
      .price {
        padding: 5rpx;
        font-size: 18rpx;
        color: #cf4444;
      }
      .number {
        font-size: 24rpx;
        margin-left: 2rpx;
      }
    }
  }
}
</style>
