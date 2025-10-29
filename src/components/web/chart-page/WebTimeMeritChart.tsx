import type { FC } from "react"
import { JmTimeMeritChart } from "../../chart/echart/JmTimeMerit"
import { WebJmChart } from "./WebJmChart"

export const WebTimeMeritChart: FC = () => {
    return (
        <WebJmChart>
            <JmTimeMeritChart />
        </WebJmChart>
    )
}