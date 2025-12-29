import type { addressItem } from '@/types/address'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddressStore = defineStore('address', () => {
  // 定义地址
  const curAddress = ref<addressItem>()

  // 改变地址
  const setAddress = (val: addressItem) => {
    curAddress.value = val
  }

  return {
    curAddress,
    setAddress,
  }
})
