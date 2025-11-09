import type { FC } from "react"
import { MjTimeMeritChart } from "../../chart/echart/mj-time-merit-chart/MjTimeMerit"
import { WebJmChart } from "./WebJmChart"

export const WebTimeMeritChart: FC = () => {
    return (
        <WebJmChart>
            <MjTimeMeritChart />
        </WebJmChart>
    )
}