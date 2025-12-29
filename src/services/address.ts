import { http } from '@/utils/http'
/**
 * 新建收货地址
 */
export const postMemberAddressApi = (data: any) => {
  return http({
    method: 'POST',
    url: '/member/address',
    data,
  })
}

/**
 * 获取收货地址列表
 */
export const getMemberAddressApi = () => {
  return http({
    method: 'GET',
    url: '/member/address',
  })
}

/**
 * 获取地址详情
 */
export const getMemberAddressByIdApi = (id: string | number) => {
  return http({
    method: 'GET',
    url: `/member/address/${id}`,
    data: {
      id,
    },
  })
}

/**
 * 删除收货地址
 */
export const deleteMemberAddressByIdApi = (id: string | number) => {
  return http({
    method: 'DELETE',
    url: `/member/address/${id}`,
    data: {
      id,
    },
  })
}
