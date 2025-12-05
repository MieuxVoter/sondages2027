import type { FC } from "react"
import { ApprovalRateChart } from "../../chart/echart/approval-rate-chart/ApprovalRateChart"
import { WebApprovalChart } from "./WebApprovalChart"

export const WebApprovalRateChart: FC = () => {
    return (
        <WebApprovalChart>
            <ApprovalRateChart />
        </WebApprovalChart>
    )
}
