import { http } from '@/utils/http'
/**
 * 获取预付订单
 */
export const getMemberOrderPreApi = () => {
  return http({
    method: 'GET',
    url: '/member/order/pre',
  })
}

/**
 * 填写订单-获取立即购买订单
 */
export const getMemberOrderPreNowAPI = (data: {
  skuId: string
  count: string
  addressId?: string
}) => {
  return http({
    method: 'GET',
    url: '/member/order/pre/now',
    data,
  })
}

/**
 * 提交订单
 */
export const postMeberOrderApi = (data: any) => {
  return http({
    method: 'POST',
    url: '/member/order',
    data,
  })
}

/**
 * 获取订单详情
 * @param id 订单id
 */
export const getMemberOrderByIdApi = (id: string) => {
  return http({
    method: 'GET',
    url: `/member/order/${id}`,
  })
}
