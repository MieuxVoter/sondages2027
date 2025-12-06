import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { useEffect } from 'react'
import { loadMajorityJugmentData } from '../store/jm-slice/jm-slice'
import { loadApprovalData } from '../store/approval-slice/approval-slice'
import { loadSmpData } from '../store/smp-slice/smp-slice'
import { Layout } from './share/layout/Layout'
import { Outlet } from '@tanstack/react-router'

export function App() {
  const dispatch = useDispatch<AppDispatch>()
  const jmData = useSelector((state: RootState) => state.majorityJudgment.survey)
  const approvalData = useSelector((state: RootState) => state.approval.survey)
  const smpData = useSelector((state: RootState) => state.smp.survey)

  useEffect(() => {
    // Ne charger que si les données ne sont pas déjà présentes
    if (!jmData) {
      dispatch(loadMajorityJugmentData())
    }
    if (!approvalData) {
      dispatch(loadApprovalData())
    }
    if (!smpData) {
      dispatch(loadSmpData())
    }
  }, [dispatch, jmData, approvalData, smpData])

  return (
    <Layout>
      {jmData && approvalData && smpData && <Outlet />}
    </Layout>
  )
}