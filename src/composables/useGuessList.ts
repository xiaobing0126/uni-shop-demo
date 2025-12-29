import { ref } from 'vue'

/**
 * 猜你喜欢组件的函数暴露
 */
export const useGuessList = () => {
  const guessRef = ref()

  const onScrollToLower = () => {
    guessRef.value.getMore()
  }
  return {
    guessRef,
    onScrollToLower,
  }
}
