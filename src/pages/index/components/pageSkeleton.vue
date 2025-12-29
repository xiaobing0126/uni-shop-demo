<!--
此文件为开发者工具生成，生成时间: 2025/12/18上午10:28:51
使用方法：
在 /Users/xiaobingzi/Desktop/Project/heima-shop/dist/dev/mp-weixin/pages/index/index.wxml 引入模板

```
<import src="index.skeleton.wxml"/>
<template is="skeleton" wx:if="{{loading}}" />
```

在 /Users/xiaobingzi/Desktop/Project/heima-shop/dist/dev/mp-weixin/pages/index/index.wxss 中引入样式
```
@import "./index.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
-->

<template name="skeleton">
  <view style="width: 100%; height: 160px">
    <view is="components/XtxSwpier">
      <view class="carousel XtxSwpier--carousel data-v-2669579d XtxSwpier--data-v-2669579d">
        <swiper
          circular="true"
          class="data-v-2669579d XtxSwpier--data-v-2669579d"
          interval="3000"
          current="0"
          autoplay="false"
        >
          <swiper-item
            class="data-v-2669579d XtxSwpier--data-v-2669579d"
            style="
              position: absolute;
              width: 100%;
              height: 100%;
              transform: translate(0%, 0px) translateZ(0px);
            "
          >
            <navigator
              class="navigator XtxSwpier--navigator data-v-2669579d XtxSwpier--data-v-2669579d"
              hover-class="none"
            >
              <image
                class="image XtxSwpier--image data-v-2669579d XtxSwpier--data-v-2669579d sk-image"
                mode="aspectFill"
              ></image>
            </navigator>
          </swiper-item>
        </swiper>
        <view class="indicator XtxSwpier--indicator data-v-2669579d XtxSwpier--data-v-2669579d">
          <view class="dot XtxSwpier--dot data-v-2669579d XtxSwpier--data-v-2669579d"></view>
          <view
            class="dot XtxSwpier--dot data-v-2669579d XtxSwpier--data-v-2669579d active XtxSwpier--active"
          ></view>
          <view class="dot XtxSwpier--dot data-v-2669579d XtxSwpier--data-v-2669579d"></view>
          <view class="dot XtxSwpier--dot data-v-2669579d XtxSwpier--data-v-2669579d"></view>
          <view class="dot XtxSwpier--dot data-v-2669579d XtxSwpier--data-v-2669579d"></view>
        </view>
      </view>
    </view>
  </view>
  <view is="pages/index/components/categoryPanel">
    <view class="category categoryPanel--category">
      <navigator class="category-items categoryPanel--category-items" hover-class="none">
        <view class="category-item categoryPanel--category-item">
          <image class="icon categoryPanel--icon sk-image"></image>
          <text class="text categoryPanel--text sk-transparent sk-text-14-2857-27 sk-text"
            >居家</text
          >
        </view>
      </navigator>
      <navigator class="category-items categoryPanel--category-items" hover-class="none">
        <view class="category-item categoryPanel--category-item">
          <image class="icon categoryPanel--icon sk-image"></image>
          <text class="text categoryPanel--text sk-transparent sk-text-14-2857-458 sk-text"
            >锦鲤</text
          >
        </view>
      </navigator>
      <navigator class="category-items categoryPanel--category-items" hover-class="none">
        <view class="category-item categoryPanel--category-item">
          <image class="icon categoryPanel--icon sk-image"></image>
          <text class="text categoryPanel--text sk-transparent sk-text-14-2857-314 sk-text"
            >服饰</text
          >
        </view>
      </navigator>
      <navigator class="category-items categoryPanel--category-items" hover-class="none">
        <view class="category-item categoryPanel--category-item">
          <image class="icon categoryPanel--icon sk-image"></image>
          <text class="text categoryPanel--text sk-transparent sk-text-14-2857-841 sk-text"
            >母婴</text
          >
        </view>
      </navigator>
      <navigator class="category-items categoryPanel--category-items" hover-class="none">
        <view class="category-item categoryPanel--category-item">
          <image class="icon categoryPanel--icon sk-image"></image>
          <text class="text categoryPanel--text sk-transparent sk-text-14-2857-207 sk-text"
            >个护</text
          >
        </view>
      </navigator>
      <navigator class="category-items categoryPanel--category-items" hover-class="none">
        <view class="category-item categoryPanel--category-item">
          <image class="icon categoryPanel--icon sk-image"></image>
          <text class="text categoryPanel--text sk-transparent sk-text-14-2857-428 sk-text"
            >严选</text
          >
        </view>
      </navigator>
      <navigator class="category-items categoryPanel--category-items" hover-class="none">
        <view class="category-item categoryPanel--category-item">
          <image class="icon categoryPanel--icon sk-image"></image>
          <text class="text categoryPanel--text sk-transparent sk-text-14-2857-43 sk-text"
            >数码</text
          >
        </view>
      </navigator>
      <navigator class="category-items categoryPanel--category-items" hover-class="none">
        <view class="category-item categoryPanel--category-item">
          <image class="icon categoryPanel--icon sk-image"></image>
          <text class="text categoryPanel--text sk-transparent sk-text-14-2857-899 sk-text"
            >运动</text
          >
        </view>
      </navigator>
      <navigator class="category-items categoryPanel--category-items" hover-class="none">
        <view class="category-item categoryPanel--category-item">
          <image class="icon categoryPanel--icon sk-image"></image>
          <text class="text categoryPanel--text sk-transparent sk-text-14-2857-935 sk-text"
            >杂项</text
          >
        </view>
      </navigator>
      <navigator class="category-items categoryPanel--category-items" hover-class="none">
        <view class="category-item categoryPanel--category-item">
          <image class="icon categoryPanel--icon sk-image"></image>
          <text class="text categoryPanel--text sk-transparent sk-text-14-2857-462 sk-text"
            >品牌</text
          >
        </view>
      </navigator>
    </view>
  </view>
  <view is="pages/index/components/hotPanel">
    <view class="panel hotPanel--panel hot hotPanel--hot">
      <view class="item hotPanel--item">
        <view class="title hotPanel--title">
          <text class="title-text hotPanel--title-text sk-transparent sk-text-14-2857-930 sk-text"
            >特惠推荐</text
          >
          <text class="title-desc hotPanel--title-desc sk-transparent sk-text-14-2857-952 sk-text"
            >精选全攻略</text
          >
        </view>
        <navigator class="cards hotPanel--cards" hover-class="none">
          <image class="image hotPanel--image sk-image" mode="aspectFit"></image>
          <image class="image hotPanel--image sk-image" mode="aspectFit"></image>
        </navigator>
      </view>
      <view class="item hotPanel--item">
        <view class="title hotPanel--title">
          <text class="title-text hotPanel--title-text sk-transparent sk-text-14-2857-721 sk-text"
            >爆款推荐</text
          >
          <text class="title-desc hotPanel--title-desc sk-transparent sk-text-14-2857-204 sk-text"
            >最受欢迎</text
          >
        </view>
        <navigator class="cards hotPanel--cards" hover-class="none">
          <image class="image hotPanel--image sk-image" mode="aspectFit"></image>
          <image class="image hotPanel--image sk-image" mode="aspectFit"></image>
        </navigator>
      </view>
      <view class="item hotPanel--item">
        <view class="title hotPanel--title">
          <text class="title-text hotPanel--title-text sk-transparent sk-text-14-2857-726 sk-text"
            >一站买全</text
          >
          <text class="title-desc hotPanel--title-desc sk-transparent sk-text-14-2857-543 sk-text"
            >精心优选</text
          >
        </view>
        <navigator class="cards hotPanel--cards" hover-class="none">
          <image class="image hotPanel--image sk-image" mode="aspectFit"></image>
          <image class="image hotPanel--image sk-image" mode="aspectFit"></image>
        </navigator>
      </view>
      <view class="item hotPanel--item">
        <view class="title hotPanel--title">
          <text class="title-text hotPanel--title-text sk-transparent sk-text-14-2857-149 sk-text"
            >新鲜好物</text
          >
          <text class="title-desc hotPanel--title-desc sk-transparent sk-text-14-2857-816 sk-text"
            >生活加分项</text
          >
        </view>
        <navigator class="cards hotPanel--cards" hover-class="none">
          <image class="image hotPanel--image sk-image" mode="aspectFit"></image>
          <image class="image hotPanel--image sk-image" mode="aspectFit"></image>
        </navigator>
      </view>
    </view>
  </view>
  <view is="components/XtxGuess" class="r r">
    <view class="caption XtxGuess--caption data-v-e94a02da XtxGuess--data-v-e94a02da">
      <text
        class="text XtxGuess--text data-v-e94a02da XtxGuess--data-v-e94a02da sk-transparent sk-text-0-0000-787 sk-text sk-pseudo sk-pseudo-circle"
        >猜你喜欢</text
      >
    </view>
  </view>
</template>

<style>
/*
此文件为开发者工具生成，生成时间: 2025/12/26上午9:05:43

在 /Users/xiaobingzi/Desktop/Project/heima-shop/dist/dev/mp-weixin/pages/index/index.wxss 中引入样式
```
@import "./index.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
.sk-transparent {
  color: transparent !important;
}
.sk-text-6-2500-957 {
  background-image: linear-gradient(
    transparent 6.25%,
    #eeeeee 0%,
    #eeeeee 93.75%,
    transparent 0%
  ) !important;
  background-size: 100% 27.907rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-799 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}
.sk-text-14-2857-27 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-458 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-314 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-841 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-207 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-428 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-43 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-899 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-935 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-462 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-930 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-952 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-721 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-204 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-726 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-543 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-149 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-816 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-0-0000-787 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 31.3953rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>

<!--由于H5端是单页面陆游，默认scoped隔离样式-->
<!--App端默认是webview渲染，也会默认隔离-->
<!--从而导致骨架屏样式不生效-->
<style lang="scss">
/* #ifdef H5 || APP-PLUS */
@import '../styles/categoryPanel.scss';
@import '../styles/hotPanel.scss';
/* #endif */
</style>
