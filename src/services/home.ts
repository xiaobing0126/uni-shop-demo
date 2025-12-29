import { http } from '@/utils/http'

/**
 * 获取首页轮播图数据
 * distributionSite:广告区域展示位置 1 为首页（默认值）2 为商品分类页
 */
export const getHomeBannerApi = (distributionSite: number = 1) => {
  return http({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}

/**
 * 获取首页分类导航数据
 */
export const getHomeCategoryApi = () => {
  return http({
    method: 'GET',
    url: '/home/category/mutli',
  })
}

/**
 * 获取首页热门推荐数据
 */
export const getHomeHotApi = () => {
  return http({
    method: 'GET',
    url: '/home/hot/mutli',
  })
}

/*
 * 获取首页热门推荐数据
 */
export const getHomeGuessLikeApi = (params?: any) => {
  return http({
    method: 'GET',
    url: '/home/goods/guessLike',
    data: {
      ...params,
    },
  })
}
