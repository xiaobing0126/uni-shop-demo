<template>
  <view class="viewport">
    <view class="logo">
      <image
        src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/logo_icon.png"
      ></image>
    </view>
    <view class="login">
      <!-- #ifdef H5 -->
      <!-- 网页端表单登录 -->
      <input class="input" type="text" placeholder="请输入用户名/手机号码" />
      <input class="input" type="text" password placeholder="请输入密码" />
      <button class="button phone">登录</button>
      <!-- #endif -->

      <!-- #ifdef MP-WEIXIN -->
      <!-- 小程序端授权登录 -->
      <button class="button phone" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
        <text class="icon icon-phone"></text>
        手机号快捷登录
      </button>
      <!-- #endif -->

      <view class="extra">
        <view class="caption">
          <text>其他登录方式</text>
        </view>
        <view class="options">
          <!-- 通用模拟登录 -->
          <button @tap="mockLogin">
            <text class="icon icon-phone">模拟快捷登录</text>
          </button>
        </view>
      </view>
      <view class="tips">登录/注册即视为你同意《服务条款》和《小兔鲜儿隐私协议》</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { loginApi, mockLoginApi } from '@/services/login'
import { useMemberStore } from '@/stores'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 模拟登录
async function mockLogin() {
  const res = await mockLoginApi({
    phoneNumber: '13307000798',
  })
  console.log('模拟登录结果==', res)
  uni.showToast({
    title: '模拟登录成功',
    icon: 'success',
  })
  // 保存用户信息到pinia
  useMemberStore().setProfile(res.result)
  // 跳转到tabbar只能这个方法
  setTimeout(() => {
    uni.switchTab({ url: '/pages/my/my' })
  }, 500)
}

// 登录
async function login() {
  const res = await loginApi({
    mobile: '13811111111',
    code: '246810',
  })
  console.log('登录结果：', res)
}

// 获取code
let code = ref('')
function getWxCode() {
  uni.login({
    provider: 'weixin',
    success: (loginRes) => {
      console.log('获取登录code==', loginRes.code)
      code.value = loginRes.code
    },
    fail: (err) => {
      console.error('获取登录code失败==', err)
    },
  })
}

// 获取手机号
function onGetPhoneNumber(e: any) {
  console.log('获取手机号信息==', e)
  if (e.detail.errMsg === 'getPhoneNumber:ok') {
    // 用户允许授权
    const encryptedData = e.detail.encryptedData
    const iv = e.detail.iv
    // 调用登录接口
    loginApi({
      code: code.value,
      encryptedData,
      iv,
    }).then((res) => {
      console.log('登录结果==', res)
    })
  } else {
    // 用户拒绝授权
    uni.showToast({
      title: '登录失败，未授权获取手机号',
      icon: 'none',
    })
  }
}

onLoad(() => {
  getWxCode()
})
</script>

<style lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  flex: 1;
  text-align: center;
  image {
    width: 220rpx;
    height: 220rpx;
    margin-top: 15vh;
  }
}

.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .input {
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    border: 1px solid #ddd;
    padding-left: 30rpx;
    margin-bottom: 20rpx;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    color: #fff;
    .icon {
      font-size: 40rpx;
      margin-right: 6rpx;
    }
  }

  .phone {
    background-color: #28bb9c;
  }

  .wechat {
    background-color: #06c05f;
  }

  .extra {
    flex: 1;
    padding: 70rpx 70rpx 0;
    .caption {
      width: 440rpx;
      line-height: 1;
      border-top: 1rpx solid #ddd;
      font-size: 26rpx;
      color: #999;
      position: relative;
      text {
        transform: translate(-40%);
        background-color: #fff;
        position: absolute;
        top: -12rpx;
        left: 50%;
      }
    }

    .options {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70rpx;
      button {
        padding: 0;
        background-color: transparent;
      }
    }

    .icon {
      font-size: 24rpx;
      color: #444;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::before {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 6rpx;
        font-size: 40rpx;
        border: 1rpx solid #444;
        border-radius: 50%;
      }
    }
    .icon-weixin::before {
      border-color: #06c05f;
      color: #06c05f;
    }
  }
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>
