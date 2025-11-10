import type { FC } from "react"
import { WebJmChart } from "./WebJmChart"
import { MjTimeMeritGrid } from "../../chart/echart/mj-time-merit-chart/MjTimeMeritGrid"

export const WebTimeMeritGrid: FC = () => {
    return (
        <WebJmChart>
            <MjTimeMeritGrid />
        </WebJmChart>
    )
}