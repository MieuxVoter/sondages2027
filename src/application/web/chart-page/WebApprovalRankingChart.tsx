import type { FC } from "react"
import { ApprovalRankingChart } from "../../chart/echart/approval-ranking-chart/ApprovalRankingChart"
import { WebApprovalChart } from "./WebApprovalChart"

export const WebApprovalRankingChart: FC = () => {
    return (
        <WebApprovalChart>
            <ApprovalRankingChart />
        </WebApprovalChart>
    )
}
