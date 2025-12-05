import { useIsMobile } from '../share/hooks/useIsMobile'
import { MobApprobation } from './mobile/MobApprobation'
import { WebApprobation } from './web/WebApprobation'

export function Approbation() {
  const isMobile = useIsMobile()

  return isMobile ? <MobApprobation /> : <WebApprobation />
}
