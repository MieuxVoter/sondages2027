import { useIsMobile } from '../hooks/useIsMobile'
import { Web } from './web/Web'
import { Mobile } from './mobile/Mobile'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { useEffect } from 'react'
import { loadMajorityJugmentData } from '../store/jm-slice/jm-slice'
import { loadApprovalData } from '../store/approval-slice/approval-slice'

export function App() {
  const dispatch = useDispatch<AppDispatch>()
  const jmData = useSelector((state: RootState) => state.majorityJudgment.survey)
  const approvalData = useSelector((state: RootState) => state.approval.survey)

  useEffect(() => {
    // Ne charger que si les données ne sont pas déjà présentes
    if (!jmData) {
      dispatch(loadMajorityJugmentData())
    }
    if (!approvalData) {
      dispatch(loadApprovalData())
    }
  }, [dispatch, jmData])
  const isMobile = useIsMobile()
  
  return (
    <>
      {jmData && approvalData && (isMobile ? <Mobile /> : <Web />)}
    </>
  )
}