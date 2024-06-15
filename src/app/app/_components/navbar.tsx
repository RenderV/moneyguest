"use client"
import Image, { StaticImageData } from "next/image";
import styles from "./navbar.module.css";

import logoIco from "/public/Logo.svg"
import cashIcon from "/public/cash.svg"
import profileIcon from "/public/profile.svg"
import walletIcon from "/public/wallet.svg"
import settingIcon from "/public/settings.svg"
import exitIcon from "/public/exit.svg"
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavItem({ href, icon, text }: {
    href: string,
    icon: StaticImageData,
    text: string,
}) {
    const pathname = usePathname()
    const opacity = pathname !== href ? "opacity-60" : ""
    return (
        <Link className={`flex gap-2 transition transition-opacity ${opacity}`} href={href}>
            <Image src={icon} alt="" />
            <p className="inter-font text-white font-bold">{text}</p>
        </Link>
    )
}

export default function Navbar() {

    return (
        <div className={styles.nav}>

            <Link className={styles.logo} href={"/"}>
                <Image src={logoIco} alt="Logo" />
            </Link>

            <div className="text-white flex flex-col gap-9 inter-font my-12 w-10/12">
                <NavItem href={"/app/wallet"} icon={cashIcon} text={"Carteira"} />
                <NavItem href={"/app/dashboard"} icon={walletIcon} text={"Dashboard"} />
            </div>

            <div className="text-white mt-auto h-1/4 w-10/12 border-t-2 border-zinc-700">
                <div className="flex flex-row mt-5">
                    <div className="w-14">
                        <Image src={profileIcon} alt="profile" />
                    </div>
                    <div className="w-10 text-xs text-nowrap my-auto">
                        <p className="text-sm font-bold text-primary">Cesar Augusto</p>
                        <p>cesaraugusto@gmail.com</p>
                    </div>
                </div>
                <Link href="/settings">
                    <div className="mt-5 gap-2 flex flex-row text-sm">
                        <Image src={settingIcon} alt="Settings" />
                        Configurações
                    </div>
                </Link>
                <Link href="/signout">
                    <div className="mt-4 gap-2 flex flex-row text-sm">
                        <Image src={exitIcon} alt="Exit" />
                        Sair
                    </div>
                </Link>
            </div>
        </div>
    )
}