<template>
  <vk-data-goods-sku-popup
    ref="skuPopupRef"
    v-model="isShowSku"
    border-radius="20"
    :z-index="990"
    :localdata="goodsInfo"
    :mode="skuMode"
    :amount-type="0"
    @open="onOpenSkuPopup"
    @close="onCloseSkuPopup"
    @add-cart="onAddCart"
    @buy-now="onBuyNow"
    add-cart-background-color="#ffa868"
    buy-now-background-color="#27ba9b"
    :actived-style="{
      color: '#27ba9b',
      borderColor: '#27ba9b',
      backgroundColor: '#e9f8f5',
    }"
  ></vk-data-goods-sku-popup>
  <scroll-view scroll-y class="viewport">
    <!-- 基本信息 -->
    <view class="goods">
      <!-- 商品主图 -->
      <view class="preview">
        <swiper circular @change="changeMainPic">
          <swiper-item v-for="pic in goodsDetail.mainPictures" :key="pic" @tap="tapMainPic(pic)">
            <image mode="aspectFill" :src="pic" />
          </swiper-item>
        </swiper>
        <view class="indicator">
          <text class="current">{{ curMainPic }}</text>
          <text class="split">/</text>
          <text class="total">{{ goodsDetail?.mainPictures?.length }}</text>
        </view>
      </view>

      <!-- 商品简介 -->
      <view class="meta">
        <view class="price">
          <text class="symbol">¥</text>
          <text class="number">{{ goodsDetail.price }}</text>
        </view>
        <view class="name ellipsis">{{ goodsDetail.name }} </view>
        <view class="desc"> {{ goodsDetail.desc }} </view>
      </view>

      <!-- 操作面板 -->
      <view class="action">
        <view class="item arrow" @tap="openSkuPopup(SkuMode.BOTH)">
          <text class="label">选择</text>
          <text class="text ellipsis"> {{ selectText ? selectText : '请选择商品规格' }} </text>
        </view>
        <view class="item arrow" @tap="openPopup(PopupType.ADDRESS)">
          <text class="label">送至</text>
          <text class="text ellipsis"> 请选择收获地址 </text>
        </view>
        <view class="item arrow" @tap="openPopup(PopupType.SERVICE)">
          <text class="label">服务</text>
          <text class="text ellipsis"> 无忧退 快速退款 免费包邮 </text>
        </view>
      </view>
    </view>

    <!-- 商品详情 -->
    <view class="detail panel">
      <view class="title">
        <text>详情</text>
      </view>
      <view class="content">
        <view class="properties">
          <!-- 属性详情 -->
          <view class="item" v-for="item in goodsDetail?.details?.properties" :key="item.name">
            <text class="label">{{ item.name }}</text>
            <text class="value">{{ item.value }}</text>
          </view>
        </view>
        <!-- 图片详情 -->
        <image
          v-for="pic in goodsDetail?.details?.pictures"
          mode="widthFix"
          :src="pic"
          :key="pic"
        ></image>
      </view>
    </view>

    <!-- 同类推荐 -->
    <view class="similar panel">
      <view class="title">
        <text>同类推荐</text>
      </view>
      <view class="content">
        <navigator
          v-for="item in goodsDetail.similarProducts"
          :key="item.id"
          class="goods"
          hover-class="none"
          :url="`/pages/goods/goods?id=${item.id}`"
        >
          <image class="image" mode="aspectFill" :src="item.picture"></image>
          <view class="name ellipsis">{{ item.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ item.price }}</text>
          </view>
        </navigator>
      </view>
    </view>
  </scroll-view>

  <!-- 用户操作 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="icons">
      <button class="icons-button"><text class="icon-heart"></text>收藏</button>
      <button class="icons-button" open-type="contact">
        <text class="icon-handset"></text>客服
      </button>
      <navigator class="icons-button" url="/pages/cart/cartNormal">
        <text class="icon-cart"></text>购物车
      </navigator>
    </view>
    <view class="buttons">
      <view class="addcart" @tap="openSkuPopup(SkuMode.CART)"> 加入购物车 </view>
      <view class="buynow" @tap="openSkuPopup(SkuMode.BUY)"> 立即购买 </view>
    </view>
  </view>

  <uni-popup ref="popupRef">
    <servicePopup @close="closePopup" v-if="popupName === PopupType.SERVICE" />
    <addressPopup @close="closePopup" v-if="popupName === PopupType.ADDRESS" />
  </uni-popup>
</template>

<script setup lang="ts">
import { postMemberCartApi } from '@/services/cart'
import { computed, onMounted, ref } from 'vue'
import { getGoodsDetailApi } from '@/services/goods'
import servicePopup from './servicePopup.vue'
import addressPopup from './addressPopup.vue'

/**
 * sku相关字段
 */
// sku弹窗实例
const skuPopupRef = ref()
const selectText = computed(() => {
  return skuPopupRef.value && skuPopupRef.value.selectArr.join(' ').trim()
})

// 是否打开SKU弹窗
const isShowSku = ref(false)
enum SkuMode {
  BOTH = 1,
  CART = 2,
  BUY = 3,
}
// SKU弹窗模式
const skuMode = ref<SkuMode>(SkuMode.BOTH)
// 打开sku弹窗模式方法
function openSkuPopup(mode: SkuMode) {
  isShowSku.value = true
  skuMode.value = mode
}
// 后端返回的商品信息
const goodsInfo = ref({})

/**
 * sku相关方法
 */
// 打开sku弹窗
function onOpenSkuPopup() {}
// 关闭sku弹窗
function onCloseSkuPopup() {}

// 添加到购物车
async function onAddCart(e: any) {
  console.log('添加购物车---', e)
  const res = await postMemberCartApi({
    skuId: e.goods_id,
    count: e.buy_num,
  })
  console.log('加入购物车请求---', res)
  if (res && res.code === '1') {
    uni.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true,
    })
    isShowSku.value = false
  }
}
// 立即购买
function onBuyNow(e: any) {
  console.log('立即购买---', e)
  uni.navigateTo({ url: `/pagesOrder/create/create?skuId=${e._id}&count=${e.buy_num}` })
}

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const query = defineProps({
  id: {
    type: String,
    required: true,
  },
})

// 当前主图索引
const curMainPic = ref<number>(1)
// 切换主图索引
function changeMainPic(event: any) {
  curMainPic.value = event.detail.current + 1
}
// 点击主图
function tapMainPic(pic: string) {
  uni.previewImage({
    current: pic,
    urls: goodsDetail.value.mainPictures || [],
  })
}

// 商品详情数据
const goodsDetail = ref<any>({})
// 获取商品详情数据
async function getGoodsDetailData() {
  const res = await getGoodsDetailApi(query.id)
  console.log('商品详情数据==', res)
  if (res && res.code === '1') {
    goodsDetail.value = res.result || {}

    // 组装sku数据
    const sku_list =
      goodsDetail.value.skus &&
      goodsDetail.value.skus.map((item: any) => {
        let obj = {
          _id: item.id,
          goods_id: item.id,
          goods_name: '',
          image: item.picture,
          price: item.price,
          stock: item.inventory,
          sku_name_arr: item.specs.map((sub: any) => sub.valueName),
        }
        return obj
      })
    console.log('组装sku_list---', sku_list)

    const spec_list =
      goodsDetail.value.specs &&
      goodsDetail.value.specs.map((item: any) => {
        let obj = {
          name: item.name,
          list:
            item.values &&
            item.values.map((sub: any) => {
              return {
                name: sub.name,
              }
            }),
        }
        return obj
      })
    console.log('组装spec_list---', spec_list)

    goodsInfo.value = {
      _id: goodsDetail.value.id,
      name: goodsDetail.value.name,
      goods_thumb: goodsDetail.value.details.pictures[0],
      sku_list: sku_list,
      spec_list: spec_list,
    }
  }
}

enum PopupType {
  ADDRESS = 'address',
  SERVICE = 'service',
}
const popupName = ref<PopupType | null>(null)
function openPopup(type: PopupType) {
  popupName.value = type
  popupRef.value?.open('bottom')
}
function closePopup() {
  popupRef.value?.close()
  // popupName.value = null
}
const popupRef = ref<{
  open: (type?: UniHelper.UniPopupType) => void
  close: () => void
}>()

onMounted(() => {
  getGoodsDetailData()
})
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.viewport {
  background-color: #f4f4f4;
}

.panel {
  margin-top: 20rpx;
  background-color: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90rpx;
    line-height: 1;
    padding: 30rpx 60rpx 30rpx 6rpx;
    position: relative;
    text {
      padding-left: 10rpx;
      font-size: 28rpx;
      color: #333;
      font-weight: 600;
      border-left: 4rpx solid #27ba9b;
    }
    navigator {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.arrow {
  &::after {
    position: absolute;
    top: 50%;
    right: 30rpx;
    content: '\e6c2';
    color: #ccc;
    font-family: 'erabbit' !important;
    font-size: 32rpx;
    transform: translateY(-50%);
  }
}

/* 商品信息 */
.goods {
  background-color: #fff;
  .preview {
    height: 750rpx;
    position: relative;
    .image {
      width: 750rpx;
      height: 750rpx;
    }
    .indicator {
      height: 40rpx;
      padding: 0 24rpx;
      line-height: 40rpx;
      border-radius: 30rpx;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 30rpx;
      right: 30rpx;
      .current {
        font-size: 26rpx;
      }
      .split {
        font-size: 24rpx;
        margin: 0 1rpx 0 2rpx;
      }
      .total {
        font-size: 24rpx;
      }
    }
  }
  .meta {
    position: relative;
    border-bottom: 1rpx solid #eaeaea;
    .price {
      height: 130rpx;
      padding: 25rpx 30rpx 0;
      color: #fff;
      font-size: 34rpx;
      box-sizing: border-box;
      background-color: #35c8a9;
    }
    .number {
      font-size: 56rpx;
    }
    .brand {
      width: 160rpx;
      height: 80rpx;
      overflow: hidden;
      position: absolute;
      top: 26rpx;
      right: 30rpx;
    }
    .name {
      max-height: 88rpx;
      line-height: 1.4;
      margin: 20rpx;
      font-size: 32rpx;
      color: #333;
    }
    .desc {
      line-height: 1;
      padding: 0 20rpx 30rpx;
      font-size: 24rpx;
      color: #cf4444;
    }
  }
  .action {
    padding-left: 20rpx;
    .item {
      height: 90rpx;
      padding-right: 60rpx;
      border-bottom: 1rpx solid #eaeaea;
      font-size: 26rpx;
      color: #333;
      position: relative;
      display: flex;
      align-items: center;
      &:last-child {
        border-bottom: 0 none;
      }
    }
    .label {
      width: 60rpx;
      color: #898b94;
      margin: 0 16rpx 0 10rpx;
    }
    .text {
      flex: 1;
      -webkit-line-clamp: 1;
    }
  }
}

/* 商品详情 */
.detail {
  padding-left: 20rpx;
  .content {
    margin-left: -20rpx;
    .image {
      width: 100%;
    }
  }
  .properties {
    padding: 0 20rpx;
    margin-bottom: 30rpx;
    .item {
      display: flex;
      line-height: 2;
      padding: 10rpx;
      font-size: 26rpx;
      color: #333;
      border-bottom: 1rpx dashed #ccc;
    }
    .label {
      width: 200rpx;
    }
    .value {
      flex: 1;
    }
  }
}

/* 同类推荐 */
.similar {
  .content {
    padding: 0 20rpx 200rpx;
    background-color: #f4f4f4;
    display: flex;
    flex-wrap: wrap;
    .goods {
      width: 340rpx;
      padding: 24rpx 20rpx 20rpx;
      margin: 20rpx 7rpx;
      border-radius: 10rpx;
      background-color: #fff;
    }
    .image {
      width: 300rpx;
      height: 260rpx;
    }
    .name {
      height: 80rpx;
      margin: 10rpx 0;
      font-size: 26rpx;
      color: #262626;
    }
    .price {
      line-height: 1;
      font-size: 20rpx;
      color: #cf4444;
    }
    .number {
      font-size: 26rpx;
      margin-left: 2rpx;
    }
  }
  navigator {
    &:nth-child(even) {
      margin-right: 0;
    }
  }
}

/* 底部工具栏 */
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx var(--window-bottom);
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
  .buttons {
    display: flex;
    & > view {
      width: 220rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
    }
    .addcart {
      background-color: #ffa868;
    }
    .buynow,
    .payment {
      background-color: #27ba9b;
      margin-left: 20rpx;
    }
  }
  .icons {
    padding-right: 10rpx;
    display: flex;
    align-items: center;
    flex: 1;
    .icons-button {
      flex: 1;
      text-align: center;
      line-height: 1.4;
      padding: 0;
      margin: 0;
      border-radius: 0;
      font-size: 20rpx;
      color: #333;
      background-color: #fff;
      &::after {
        border: none;
      }
    }
    text {
      display: block;
      font-size: 34rpx;
    }
  }
}
</style>
