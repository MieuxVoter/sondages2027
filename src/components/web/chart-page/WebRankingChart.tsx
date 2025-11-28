import type { FC } from "react"
import { MjRankingChart } from "../../chart/echart/mj-ranking-chart/MjRankingChart"
import { WebJmChart } from "./WebJmChart"

export const WebRankingChart: FC = () => {
    return (
        <WebJmChart>
            <MjRankingChart height="600px" />
        </WebJmChart>
    )
}

