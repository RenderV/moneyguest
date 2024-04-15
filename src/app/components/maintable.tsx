import { HTMLAttributes } from 'react';
import { SimpleCard } from "./card"
import style from "./maintable.module.css"

interface SimpleCardProps extends HTMLAttributes<HTMLDivElement> {
}

export function Transactions({...props}: SimpleCardProps){
    const overWritingStyle: React.CSSProperties = {
        width: "60%",
        height: "300px"
    }

    return(
        <SimpleCard className={style.mano} style={overWritingStyle}>
            <div className={style.autoplay}>
                <div className={style.ultima}>teste</div>
                <div className={style.ultima2}>teste</div>
            </div>
        </SimpleCard>
    )
}
