import { useEffect, useState } from 'react'

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      const isMobileDevice = mobileRegex.test(userAgent)
      const isSmallScreen = window.innerWidth <= 1000

      setIsMobile(isMobileDevice || isSmallScreen)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)

    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return isMobile
}