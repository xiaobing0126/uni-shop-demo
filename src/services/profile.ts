import { http } from '@/utils/http'
import type { UserProfileResult } from '@/types/profile'

/**
 * 获取用户个人信息
 */
export const getMemberProfileApi = () => {
  return http<UserProfileResult>({
    method: 'GET',
    url: '/member/profile',
  })
}

/**
 * 修改个人信息
 */
export const editMemberProfileApi = (data: any) => {
  return http({
    method: 'PUT',
    url: '/member/profile',
    data,
  })
}
