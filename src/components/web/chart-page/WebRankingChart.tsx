import type { FC } from "react"
import { JmRankingChart } from "../../chart/echart/JmRankingChart"
import { WebJmChart } from "./WebJmChart"

export const WebRankingChart: FC = () => {
    return (
        <WebJmChart>
            <JmRankingChart />
        </WebJmChart>
    )
}

