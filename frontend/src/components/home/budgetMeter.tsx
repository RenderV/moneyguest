import {TitledCard} from "./card";
import styles from "./budgetMeter.module.css"

type pointType = { x: number, y: number }

function linspace(start: number, stop: number, num: number, endpoint = true) {
    const div = endpoint ? (num - 1) : num;
    const step = (stop - start) / div;
    return Array.from({ length: num }, (_, i) => start + step * i);
}

function genPoint(centerX: number, centerY: number, degree: number, radius: number): pointType {
    const radPerDeg = Math.PI / 180;
    const x = centerX - (radius * Math.cos(degree * radPerDeg));
    const y = centerY - (radius * Math.sin(degree * radPerDeg));
    return { x, y }
}

function drawArc(res: number, start: number, stop: number, cx: number, cy: number, r: number) {
    const dlist = linspace(start, stop, res)
    const circle = dlist.map((d) => {
        return genPoint(cx, cy, d, r)
    })
    return circle
}

function circleToPath(circle: pointType[]): string {
    const path = circle.map((p, i) => {
        return `${i == 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    })
    return path.join(' ')
}


export default function BudgetMeter({ percent = 1, title, loadingAnimation=0 }: { percent?: number, loadingAnimation?: number, title: string }) {
    const viewBoxSize = 250
    const radius = 80
    const perimeter = 2*Math.PI*radius*percent

    var progress, endColor
    if (percent <= 1) {
        progress = 270 * percent
        endColor = "#0ACF83"
    }
    else {
        progress = 360
        endColor = "#F75B99"
    }

    const res = Math.max(Math.min(50 * percent, 50), 3)
    const arc = drawArc(res, -45, -45 + progress, viewBoxSize / 2, viewBoxSize / 2, radius)

    const path = circleToPath(arc)

    return (
        <TitledCard title={title}>
            <div className={styles.container}>
                <svg width="280" height="280" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_7_739)">
                        <path d={path} stroke="url(#paint0_linear_7_739)" strokeWidth="35" strokeLinecap="round" strokeDasharray={perimeter}>
                        { loadingAnimation &&
                            <animate
                                attributeName="stroke-dashoffset"
                                values={`${perimeter};0`}
                                dur={`${loadingAnimation}s`}
                                calcMode="spline"
                                keySplines="0.67 0.13, 0.64, 0.9;"
                                repeatCount={1} />
                        }
                        </path>
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_7_739" x1="199.589" y1="58.0363" x2="36.1681" y2="65" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F75A68" />
                            <stop offset="1.5" stopColor={endColor} />
                        </linearGradient>
                    </defs>
                </svg>
                <p className={styles.text}>{(percent * 100).toFixed(0)}%</p>
            </div>
        </TitledCard>
    )
}