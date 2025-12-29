import { http } from '@/utils/http'
/**
 * 获取分类列表数据
 **/
export const getCategoryTopApi = () => {
  return http({
    method: 'GET',
    url: '/category/top',
  })
}
