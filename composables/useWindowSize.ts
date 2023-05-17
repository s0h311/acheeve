import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()

export default function useScreenSize() {
  const isPhone = ref(false)
  const isTablet = ref(false)
  const isLaptop = ref(false)
  const isBigDisplay = ref(false)

  const checkScreenSize = () => {
    isPhone.value = width.value < 640
    isTablet.value = width.value >= 640 && width.value < 1024
    isLaptop.value = width.value >= 1024 && width.value < 1920
    isBigDisplay.value = width.value >= 1920
  }

  checkScreenSize()

  return {
    isPhone,
    isTablet,
    isLaptop,
    isBigDisplay,
  }
}
