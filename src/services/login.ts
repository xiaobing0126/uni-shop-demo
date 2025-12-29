import type { LoginResult } from '@/types/member'
import { http } from '@/utils/http'

/**
 *  @description:小程序登陆接口
 */
export function loginApi(data: any) {
  return http({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}

/**
 * 由于个人开发者账号权限问题，无法使用微信登录接口
 * 该接口仅作演示使用
 */
export function mockLoginApi(data: any) {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data,
  })
}
