import type { FC } from "react"
import { JmMeritChart } from "../../chart/echart/JmMeritChart"
import { WebJmChart } from "./WebJmChart"

export const WebMeritChart: FC = () => {
    return (
        <WebJmChart>
            <JmMeritChart />
        </WebJmChart>
    )
}