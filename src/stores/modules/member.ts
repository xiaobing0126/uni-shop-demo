/* eslint-disable no-debugger */
import { defineStore, mapActions } from 'pinia'
import { ref } from 'vue'

// 定义 Store
// export const useMemberStore = defineStore(
//   'member',
//   () => {
//     // 会员信息
//     const profile = ref<any>()

//     // 保存会员信息，登录时使用
//     const setProfile = (val: any) => {
//       profile.value = val
//     }

//     // 清理会员信息，退出时使用
//     const clearProfile = () => {
//       profile.value = undefined
//     }

//     // 记得 return
//     return {
//       profile,
//       setProfile,
//       clearProfile,
//     }
//   },
//   // TODO: 持久化
//   {
//     // 网页端配置
//     // persist: true,
//     // 小程序端配置-数据持久化
//     persist: {
//       storage: {
//         getItem: (key: string) => {
//           return uni.getStorageSync(key)
//         },
//         setItem: (key: string, value: string) => {
//           return uni.setStorageSync(key, value)
//         },
//       },
//     },
//   },
// )

// 定义 Store - 选项式写法
export const useMemberStore = defineStore('member', {
  state: () => ({ profile: null as any }),
  actions: {
    setProfile(val: any) {
      console.log('setProfile', val)
      this.profile = val
    },
    clearProfile() {
      this.profile = null
    },
  },
  persist: {
    storage: {
      getItem: (key: string) => {
        return uni.getStorageSync(key)
      },
      setItem: (key: string, value: string) => {
        return uni.setStorageSync(key, value)
      },
    },
  },
})
