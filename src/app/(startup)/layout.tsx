import Image from "next/image"
import logo from "/public/logo-welcome.svg"

export default function Page({children}: {
    children?: React.ReactNode
}){
    return(
        <div className="flex flex-row justify-center items-center w-full h-screen bg-blackwhite">
            <div className="text-white flex-1 flex flex-col justify-center items-center w-full h-full">
                <div className="w-[70%]">
                    <Image className="mb-4" src={logo} alt="Logo" width={250}/>
                    <div className="w-full">
                        <h1 className="text-lg font-bold block text-white">Seu parceiro financeiro!</h1>
                        <p>“Economia, frequentemente, não tem relação com o total de dinheiro gasto, mas com a sabedoria empregada ao gastá-lo”</p>
                        <p className="font-bold">-Henry Ford</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 bg-white w-full h-full">
                {children}
            </div>
        </div>
    )
}