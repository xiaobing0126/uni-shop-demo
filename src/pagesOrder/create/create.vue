<template>
  <scroll-view scroll-y class="viewport">
    <!-- 收货地址 -->
    <navigator
      v-if="selectedAddress"
      class="shipment"
      hover-class="none"
      url="/pagesMember/address/address?from=order"
    >
      <view class="user"> {{ selectedAddress.receiver }} {{ selectedAddress.contact }} </view>
      <view class="address">
        {{ selectedAddress.fullLocation }} {{ selectedAddress.address }}
      </view>
      <text class="icon icon-right"></text>
    </navigator>
    <navigator
      v-else
      class="shipment"
      hover-class="none"
      url="/pagesMember/address/address?from=order"
    >
      <view class="address"> 请选择收货地址 </view>
      <text class="icon icon-right"></text>
    </navigator>

    <!-- 商品信息 -->
    <view class="goods">
      <navigator
        v-for="item in orderInfo.goods"
        :key="item.id"
        :url="`/pages/goods/goods?id=${item.id}`"
        class="item"
        hover-class="none"
      >
        <image class="picture" :src="item.picture" />
        <view class="meta">
          <view class="name ellipsis"> {{ item.name }}</view>
          <view class="attrs">{{ item.attrsText }}</view>
          <view class="prices">
            <view class="pay-price symbol">{{ item.payPrice }}</view>
            <view class="price symbol">{{ item.price }}</view>
          </view>
          <view class="count">x{{ item.count }}</view>
        </view>
      </navigator>
    </view>

    <!-- 配送及支付方式 -->
    <view class="related">
      <view class="item">
        <text class="text">配送时间</text>
        <picker :range="deliveryList" range-key="text" @change="onChangeDelivery">
          <view class="icon-fonts picker">{{ activeDelivery.text }}</view>
        </picker>
      </view>
      <view class="item">
        <text class="text">订单备注</text>
        <input
          class="input"
          :cursor-spacing="30"
          placeholder="选题，建议留言前先与商家沟通确认"
          v-model="buyerMessage"
        />
      </view>
    </view>

    <!-- 支付金额 -->
    <view class="settlement">
      <view class="item">
        <text class="text">商品总价: </text>
        <text class="number symbol">{{ priceInfo.shopPrice }}</text>
      </view>
      <view class="item">
        <text class="text">运费: </text>
        <text class="number symbol">{{ priceInfo.transPrice }}</text>
      </view>
    </view>
  </scroll-view>

  <!-- 吸底工具栏 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="total-pay symbol">
      <text class="number">{{ priceInfo.allPrice }}</text>
    </view>
    <view
      @tap="onSubmitOrder"
      class="button"
      :class="{ disabled: !(selectedAddress && selectedAddress.id) }"
    >
      提交订单
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { getMemberOrderPreApi, getMemberOrderPreNowAPI, postMeberOrderApi } from '@/services/order'
import { onLoad } from '@dcloudio/uni-app'
import { useAddressStore } from '@/stores/modules/address'

// 页面参数
const query = defineProps<{
  skuId?: string
  count?: string
  orderId?: string
}>()

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 订单备注
const buyerMessage = ref('')
// 配送时间
const deliveryList = ref([
  { type: 1, text: '时间不限 (周一至周日)' },
  { type: 2, text: '工作日送 (周一至周五)' },
  { type: 3, text: '周末配送 (周六至周日)' },
])
// 当前配送时间下标
const activeIndex = ref(0)
// 当前配送时间
const activeDelivery = computed(() => deliveryList.value[activeIndex.value])
// 修改配送时间
const onChangeDelivery: UniHelper.SelectorPickerOnChange = (ev) => {
  activeIndex.value = ev.detail.value
}

const priceInfo = reactive({
  allPrice: '', // 总价
  transPrice: '0.00', // 运费
  shopPrice: '', // 商品总价
})
const orderInfo = ref<any>({})

// 请求订单数据
async function getMemberOrderData() {
  if (query.count && query.skuId) {
    const res = await getMemberOrderPreNowAPI({
      count: query.count,
      skuId: query.skuId,
    })
    orderInfo.value = res.result
  } else if (query.orderId) {
    // // 再次购买
    // const res = await getMemberOrderRepurchaseByIdAPI(query.orderId)
    // orderInfo.value = res.result
  } else {
    getMemberOrderPreData()
  }
  const price = orderInfo.value.goods.reduce((cur: any, item: any) => {
    console.log('---', cur, item)
    const curPrice = Number(item.payPrice) * Number(item.count)
    return cur + curPrice
  }, 0)
  priceInfo.shopPrice = price.toFixed(2)
  priceInfo.allPrice = (Number(priceInfo.shopPrice) + Number(priceInfo.transPrice)).toFixed(2)
}

// 获取预付订单信息
async function getMemberOrderPreData() {
  const res = await getMemberOrderPreApi()
  if (res && res.code === '1') {
    // 后台接口没有这个字段的数据，自己mock
    const goods = {
      goods: [
        {
          id: '1369155873162661889',
          skuId: '1369155873162661889',
          name: '钻石陶瓷涂层多用锅18cm 小奶锅',
          picture:
            'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-05/6fdcac19-dd44-442c-9212-f7ec3cf3ed18.jpg',
          count: 2,
          payPrice: 148.23,
          price: 158,
          attrsText: '蓝色， 日本， 30cm',
        },
        // {
        //   id: '1369155859933827075',
        //   name: '古田糯耳150克',
        //   picture: 'https://yanxuan-item.nosdn.127.net/e8534f5e88af5aa5366786998c84543f.png',
        //   count: 1,
        //   payPrice: 26.02,
        //   price: 28.88,
        //   attrsText: '150克',
        // },
      ],
    }
    orderInfo.value = Object.assign({}, res.result, goods)
    console.log('预付订单数据---', orderInfo.value)
  }
}

const addressStore = useAddressStore()
// 收货地址
const selectedAddress = computed(() => {
  return (
    addressStore.curAddress ||
    (orderInfo.value &&
      orderInfo.value.userAddresses &&
      orderInfo.value.userAddresses.length &&
      orderInfo.value?.userAddresses.find((item: any) => item.isDefault === 1))
  )
})

// 提交订单
function onSubmitOrder() {
  if (!(selectedAddress.value && selectedAddress.value?.id)) {
    return uni.showToast({
      title: '请选择收货地址',
      icon: 'none',
      mask: true,
    })
  }
  postMeberOrderData()
}

/**
 * 付款方式枚举
 */
enum PayTypeEnum {
  ONLINE = 1, // 在线付款
  OFFLINE = 2, // 线下付款
}
/**
 * 支付渠道枚举
 */
enum PayChannelEnum {
  ALIPAY = 1,
  WECHATPAY = 2,
  OFFLINEPAY = '',
}
// 提交订单请求
async function postMeberOrderData() {
  const params = {
    goods: orderInfo.value.goods.map((item: any) => {
      return {
        skuId: item.skuId,
        count: item.count,
      }
    }),
    addressId: selectedAddress.value && selectedAddress.value?.id,
    deliveryTimeType: activeIndex.value,
    buyerMessage: buyerMessage.value,
    payType: PayTypeEnum.ONLINE,
    payChannel: PayChannelEnum.WECHATPAY,
  }
  const res = await postMeberOrderApi(params)
  console.log('提交订单请求---', res)
  if (res && res.code === '1') {
    uni.redirectTo({ url: `/pagesOrder/detail/detail?id=${res.result.id}` })
  }
}

onLoad(() => {
  getMemberOrderData()
})
</script>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: #f4f4f4;
}

.symbol::before {
  content: '¥';
  font-size: 80%;
  margin-right: 5rpx;
}

.shipment {
  margin: 20rpx;
  padding: 30rpx 30rpx 30rpx 84rpx;
  font-size: 26rpx;
  border-radius: 10rpx;
  background: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png)
    20rpx center / 50rpx no-repeat #fff;
  position: relative;

  .icon {
    font-size: 36rpx;
    color: #333;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 20rpx;
  }

  .user {
    color: #333;
    margin-bottom: 5rpx;
  }

  .address {
    color: #666;
  }
}

.goods {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    padding: 30rpx 0;
    border-top: 1rpx solid #eee;

    &:first-child {
      border-top: none;
    }

    .picture {
      width: 170rpx;
      height: 170rpx;
      border-radius: 10rpx;
      margin-right: 20rpx;
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }

    .name {
      height: 80rpx;
      font-size: 26rpx;
      color: #444;
    }

    .attrs {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 6rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .prices {
      display: flex;
      align-items: baseline;
      margin-top: 6rpx;
      font-size: 28rpx;

      .pay-price {
        margin-right: 10rpx;
        color: #cf4444;
      }

      .price {
        font-size: 24rpx;
        color: #999;
        text-decoration: line-through;
      }
    }

    .count {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 26rpx;
      color: #444;
    }
  }
}

.related {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 80rpx;
    font-size: 26rpx;
    color: #333;
  }

  .input {
    flex: 1;
    text-align: right;
    margin: 20rpx 0;
    padding-right: 20rpx;
    font-size: 26rpx;
    color: #999;
  }

  .item .text {
    width: 125rpx;
  }

  .picker {
    color: #666;
  }

  .picker::after {
    content: '\e6c2';
  }
}

/* 结算清单 */
.settlement {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80rpx;
    font-size: 26rpx;
    color: #333;
  }

  .danger {
    color: #cf4444;
  }
}

/* 吸底工具栏 */
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--window-bottom));
  z-index: 1;

  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;

  .total-pay {
    font-size: 40rpx;
    color: #cf4444;

    .decimal {
      font-size: 75%;
    }
  }

  .button {
    width: 220rpx;
    text-align: center;
    line-height: 72rpx;
    font-size: 26rpx;
    color: #fff;
    border-radius: 72rpx;
    background-color: #27ba9b;
  }

  .disabled {
    opacity: 0.6;
  }
}
</style>
