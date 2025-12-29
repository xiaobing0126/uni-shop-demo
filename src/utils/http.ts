/**
 * 添加拦截器：
拦截 request 请求
拦截 uploadFile 文件上传
TODO:
1.非 http 开头需拼接地址
2.请求超时
3.添加小程序端请求头标识
4.添加 token 请求头标识
 */

import { useMemberStore } from '@/stores'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
uni.addInterceptor('request', {
  invoke(args) {
    // 默认超时时间
    args.timeout = 10000
    // 非 http 开头需拼 接地址
    if (!args.url.startsWith('http')) {
      args.url = baseURL + args.url
    }
    // 添加小程序端请求头标识
    args.header = {
      ...args.header, // 保留原有请求头
      'X-Platform': 'mini-program',
      'source-client': 'miniapp',
    }
    // 添加 token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      args.header.Authorization = token
    }
    console.log('请求参数拦截---:', args)
  },
  success(res) {
    console.log('请求成功---:', res)
  },
  fail(err) {
    console.log('请求失败---:', err)
  },
})

export function http<T = any>(options: UniApp.RequestOptions): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    uni.request({
      ...options,
      success: (res: UniApp.RequestSuccessCallbackResult) => {
        // axios 风格处理返回结果
        const { statusCode, data } = res
        if (statusCode >= 200 && statusCode < 300) {
          resolve(data as T)
        } else if (statusCode === 401) {
          // 统一处理 401 未授权
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.reLaunch({ url: '/pages/login/index' })
          reject(res)
        } else {
          uni.showToast({
            title: (res.data as any)?.msg || '请求出错',
            icon: 'none',
          })
          reject(res)
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none',
        })
        reject(err)
      },
    })
  })
}

// // /Users/xiaobingzi/Desktop/Project/heima-shop/src/utils/http.ts
// // GitHub Copilot

// type Maybe<T> = T | null | undefined

// interface ReqOptions extends UniApp.RequestOptions {
//   showLoading?: boolean
//   needAuth?: boolean
// }

// /**
//  * 简易 uni-app HTTP 公共请求工具
//  * - 自动拼接 baseURL
//  * - 自动带 token（storage: 'token'）
//  * - 支持 showLoading
//  * - 统一处理 401（可根据项目调整）
//  */
// const BASE_URL = 'https://api.example.com' // <- 根据项目修改

// function getToken(): Maybe<string> {
//   try {
//     return uni.getStorageSync('token') || undefined
//   } catch {
//     return undefined
//   }
// }

// function handleUnauthorized(): void {
//   uni.removeStorageSync('token')
//   // 根据项目路由调整：跳转到登录页
//   uni.reLaunch({ url: '/pages/login/index' })
// }

// export function request<T = any>(url: string, options: ReqOptions = {}): Promise<T> {
//   const {
//     method = 'GET',
//     data,
//     header = {},
//     showLoading = false,
//     needAuth = true,
//     ...rest
//   } = options
//   const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`

//   const token = getToken()
//   const finalHeader: Record<string, any> = {
//     'Content-Type': 'application/json',
//     ...header,
//   }
//   if (needAuth && token) {
//     finalHeader['Authorization'] = `Bearer ${token}`
//   }

//   if (showLoading) {
//     uni.showLoading({ title: '加载中...' })
//   }

//   return new Promise<T>((resolve, reject) => {
//     uni.request({
//       url: fullUrl,
//       method,
//       data,
//       header: finalHeader,
//       ...rest,
//       success: (res: UniApp.RequestSuccessCallbackResult) => {
//         const { statusCode, data: resData } = res
//         // 优先处理 HTTP 状态
//         if (statusCode === 401) {
//           handleUnauthorized()
//           reject({ code: 401, message: '未授权' })
//           return
//         }
//         if (statusCode && statusCode >= 200 && statusCode < 300) {
//           // 常见后端返回格式：{ code, message, data }
//           if (resData && typeof resData === 'object' && 'code' in resData) {
//             const anyRes: any = resData
//             if (anyRes.code === 0 || anyRes.code === 200) {
//               resolve(anyRes.data as T)
//             } else if (anyRes.code === 401) {
//               handleUnauthorized()
//               reject(anyRes)
//             } else {
//               // 非成功业务码，reject 以便页面统一处理
//               reject(anyRes)
//             }
//           } else {
//             // 非标准格式，直接返回 body
//             resolve(resData as T)
//           }
//         } else {
//           reject({ statusCode, data: resData })
//         }
//       },
//       fail: (err) => {
//         reject(err)
//       },
//       complete: () => {
//         if (showLoading) uni.hideLoading()
//       },
//     })
//   })
// }

// export function get<T = any>(url: string, params?: any, options: Partial<ReqOptions> = {}) {
//   return request<T>(url, { method: 'GET', data: params, ...options })
// }

// export function post<T = any>(url: string, data?: any, options: Partial<ReqOptions> = {}) {
//   return request<T>(url, { method: 'POST', data, ...options })
// }

// export function put<T = any>(url: string, data?: any, options: Partial<ReqOptions> = {}) {
//   return request<T>(url, { method: 'PUT', data, ...options })
// }

// export function del<T = any>(url: string, data?: any, options: Partial<ReqOptions> = {}) {
//   return request<T>(url, { method: 'DELETE', data, ...options })
// }

// export default {
//   request,
//   get,
//   post,
//   put,
//   del,
// }
