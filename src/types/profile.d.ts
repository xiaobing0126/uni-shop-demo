export type UserProfileDetail = {
  account: string
  avatar: string
  birthday: string
  fullLocation: string
  gender: Gender
  id: string
  nickname: string
  profession: string
}

export type UserProfileResult = {
  code: string
  msg: string
  result: UserProfileDetail
}

export type Gender = '男' | '女'
