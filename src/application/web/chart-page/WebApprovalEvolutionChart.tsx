import type { FC } from "react"
import { ApprovalEvolutionChart } from "../../chart/echart/approval-evolution-chart/ApprovalEvolutionChart"
import { WebApprovalChart } from "./WebApprovalChart"

export const WebApprovalEvolutionChart: FC = () => {
    return (
        <WebApprovalChart>
            <ApprovalEvolutionChart />
        </WebApprovalChart>
    )
}
