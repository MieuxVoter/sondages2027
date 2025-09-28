import { useIsMobile } from '../hooks/useIsMobile'
import { AppWeb } from './web/App-web'
import { Mobile } from './mobile/Mobile'

export function App() {
  const isMobile = useIsMobile()

  return isMobile ? <Mobile /> : <AppWeb />
}