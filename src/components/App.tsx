import { useIsMobile } from '../hooks/useIsMobile'
import { Web } from './web/Web'
import { Mobile } from './mobile/Mobile'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { useEffect } from 'react'
import { loadMajorityJugmentData } from '../store/jm-slice/jm-slice'

export function App() {
  const dispatch = useDispatch<AppDispatch>()
  const jmData = useSelector((state: RootState) => state.majorityJudgment.jmData)

  useEffect(() => {
    // Ne charger que si les données ne sont pas déjà présentes
    if (!jmData) {
      console.log('Dispatch loadMajorityJugmentData from Majoritaire')
      dispatch(loadMajorityJugmentData())
    }
  }, [dispatch, jmData])
  const isMobile = useIsMobile()

  return isMobile ? <Mobile /> : <Web />
}