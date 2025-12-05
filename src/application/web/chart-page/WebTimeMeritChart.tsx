import type { FC } from "react"
import { useParams } from "@tanstack/react-router"
import { MjTimeMeritChart } from "../../chart/echart/mj-time-merit-chart/MjTimeMerit"
import { WebJmChart } from "./WebJmChart"

export const WebTimeMeritChart: FC = () => {
    const { candidateId } = useParams({ strict: false })

    return (
        <WebJmChart>
            <MjTimeMeritChart candidateId={candidateId} />
        </WebJmChart>
    )
}