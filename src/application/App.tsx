import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useIsMobile } from '../share/hooks/useIsMobile'
import { loadApprovalData } from '../store/approval-slice/approval-slice'
import { loadMajorityJugmentData } from '../store/jm-slice/jm-slice'
import type { AppDispatch, RootState } from '../store/store'
import { Mobile } from './mobile/Mobile'
import { Web } from './web/Web'

export function App() {
  const dispatch = useDispatch<AppDispatch>()
  const jmData = useSelector((state: RootState) => state.majorityJudgment.survey)
  const approvalData = useSelector((state: RootState) => state.approval.survey)

  useEffect(() => {
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