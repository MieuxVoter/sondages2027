import { useIsMobile } from '../share/hooks/useIsMobile'
import { MobMajoritaire } from './mobile/MobMajoritaire'
import { WebMajoritaire } from './web/WebMajoritaire'

export function Majoritaire() {
  const isMobile = useIsMobile()

  return isMobile ? <MobMajoritaire /> : <WebMajoritaire />
}
