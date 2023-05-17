import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()

export default () => {
  let isPhone = width.value < 640
  let isTablet = width.value >= 640 && width.value < 1024
  let isLaptop = width.value >= 1024 && width.value < 1920
  let isBigDisplay = width.value >= 1920

  return {
    isPhone,
    isTablet,
    isLaptop,
    isBigDisplay,
  }
}
