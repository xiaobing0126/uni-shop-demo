import { http } from '@/utils/http'
/**
 * 加入购物车
 */
export const postMemberCartApi = (data: any) => {
  return http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}

/**
 * 获取购物车列表
 */
export const getMemberCartApi = () => {
  return http({
    method: 'GET',
    url: '/member/cart',
  })
}

/**
 * 删除单品
 */
export const deleteMemberCartApi = (ids: string[]) => {
  return http({
    method: 'DELETE',
    url: '/member/cart',
    data: {
      ids,
    },
  })
}

/**
 * 修改购物车单品
 */
export const putMemberCartBySkuIdApi = (skuId: string, data: object) => {
  return http({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data,
  })
}

/**
 * 购物车全选/取消全选
 */
export const putMemberCartSelectedApi = (data: object) => {
  return http({
    method: 'PUT',
    url: '/member/cart/selected',
    data,
  })
}
