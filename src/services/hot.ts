import { http } from '@/utils/http'

/**
 * 获取首页热门推荐数据
 */
export const getHotRecommendApi = (url: string, params?: any) => {
  return http({
    method: 'GET',
    url: url,
    data: {
      ...params,
    },
  })
}
