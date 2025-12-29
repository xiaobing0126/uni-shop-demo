import { http } from '@/utils/http'

/**
 * 获取商品详情
 **/
export function getGoodsDetailApi(id: number | string) {
  return http({
    method: 'GET',
    url: `/goods`,
    data: { id },
  })
}
