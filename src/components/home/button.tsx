import Image from "next/image"
import style from "./button.module.css"
import { DM_Sans } from 'next/font/google'

const dmsans = DM_Sans(
    {
        subsets: ["latin"],
        weight: "600",
    }
)

export function Button({ icon, text }: { icon?: string, text: string }) {
    return (
        <button className={style.button + " " + dmsans.className}>
            {icon && <div className={style.buttonItem}>
                <Image src={icon} alt=''/>
            </div>}
            <p className={style.buttonItem}>
                {text}
            </p>
        </button>
    )
}