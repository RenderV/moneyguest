import {TitledCard} from "./card";
import styles from "./minimalisticBarGraph.module.css"
import { DM_Sans } from 'next/font/google'
import { Key } from "react";

type barDataType = {
    label: string,
    value: number,
    id: Key
}

export default function MinimalisticBarGraph({ title, data, loadingAnimation = 0 }: { title: string, data: barDataType[], loadingAnimation?: number }) {
    const viewBox = 250;
    const barMaxHeight = 0.6 * viewBox;
    const ytpadding = 0.09 * viewBox;
    const xlpadding = 1
    const gap = viewBox / (data.length - 1)
    const width = 8

    const allValues = data.map((d) => d.value)
    const max = Math.max(...allValues)
    const normalizedValues = allValues.map((v) => v / max)


    return (
        <TitledCard title={title}>
            <div className={styles.container}>
                <svg className={styles.svg} viewBox={`0 0 ${viewBox} ${viewBox}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                    {normalizedValues.map((v, i) => {
                        const x = i * gap + xlpadding
                        const y0 = ytpadding + (barMaxHeight * (1 - v))
                        const y1 = barMaxHeight + ytpadding
                        const path = `M ${x} ${y0} L ${x} ${y1}`
                        const grayLine = `M ${x} ${ytpadding} L ${x} ${y1}`

                        return (
                            <g key={data[i].id}>
                                <path d={grayLine} strokeWidth={width} stroke="#323238" strokeLinecap="round" opacity="50%"/>
                                <path d={path} strokeWidth={width} stroke="#0ACF83" strokeLinecap="round" strokeDasharray={y1 - y0} strokeDashoffset="0">
                                    <animate
                                        attributeName="stroke-dashoffset"
                                        values={`${y0 - y1};0`}
                                        dur={`${v * loadingAnimation}s`}
                                        calcMode="ease-in-out"
                                        repeatCount={1} />
                                </path>
                                <text x={x} y={ytpadding + barMaxHeight + 10} className={styles.text} style={{ fontSize: '14' }} fill="currentColor" dy="0.71em">{data[i].label}</text>
                            </g>
                        )
                    })}
                </svg>
            </div>
        </TitledCard>
    )
}