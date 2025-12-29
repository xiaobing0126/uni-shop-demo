import { http } from '@/utils/http'

/**
 * 生产环境微信支付
 */
export const getPayWxPayMiniPayApi = (orderId: string) => {
  return http({
    method: 'GET',
    url: '/pay/wxPay/miniPay',
    data: {
      orderId: orderId,
    },
  })
}

/**
 * 模拟环境微信支付
 */
export const getPayMockApi = (orderId: string) => {
  return http({
    method: 'GET',
    url: '/pay/mock',
    data: {
      orderId: orderId,
    },
  })
}
