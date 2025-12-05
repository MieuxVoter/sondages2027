import type { FC } from "react"
import { MjMeritChart } from "../../chart/echart/mj-merit-chart/MjMeritChart"
import { WebJmChart } from "./WebJmChart"

export const WebMeritChart: FC = () => {
    return (
        <WebJmChart>
            <MjMeritChart />
        </WebJmChart>
    )
}