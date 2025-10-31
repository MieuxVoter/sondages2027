import type { FC } from "react"
import { MjRankingChart } from "../../chart/echart/ranking-chart/MjRankingChart"
import { WebJmChart } from "./WebJmChart"

export const WebRankingChart: FC = () => {
    return (
        <WebJmChart>
            <MjRankingChart />
        </WebJmChart>
    )
}

