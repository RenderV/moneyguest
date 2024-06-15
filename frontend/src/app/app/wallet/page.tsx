import Image from "next/image"
import inIcon from "/public/income.svg"
import outIcon from "/public/outcome.svg"
import dollar from "/public/dollar.svg"
import BudgetMeter from "@/components/home/budgetMeter"
import Velocimeter from "@/components/home/velocimeter"
import MinimalisticBarGraph from "@/components/home/minimalisticBarGraph"
import MainTable from "@/components/home/mainTable"

export default function Page() {
    const value = 200
    return (
        <div className="flex flex-col">
            <h1 className="text-3xl text-primary font-bold mt-8 ml-5 block">Carteira</h1>
            <div className="flex flex-row mt-4 mx-3 justify-between gap-8 flex-wrap">
                <div className="min-w-24 bg-blackwhite flex-1 h-28 rounded-xl ml-2 flex justify-center items-center">
                    <div className="text-white w-full flex items-center justify-center">
                        <div className="w-4/5">
                            <div className="flex flex-row justify-between">
                                <p className="d-block">Entradas</p>
                                <Image src={inIcon} alt="Incomes" width={32} height={32} />
                            </div>
                            <p className="font-bold text-xl">{value.toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</p>
                        </div>
                    </div>
                </div>


                <div className="bg-blackwhite flex-1 h-28 rounded-xl ml-2 flex justify-center items-center">
                    <div className="text-white w-full flex items-center justify-center">
                        <div className="w-4/5">
                            <div className="flex flex-row justify-between">
                                <p className="d-block">Saídas</p>
                                <Image src={outIcon} alt="Incomes" width={32} height={32} />
                            </div>
                            <p className="font-bold text-xl">{value.toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-primary flex-1 h-28 rounded-xl ml-2 flex justify-center items-center">
                    <div className="text-white w-full flex items-center justify-center">
                        <div className="w-4/5">
                            <div className="flex flex-row justify-between">
                                <p className="d-block">Saldo Atual</p>
                                <Image src={dollar} alt="Incomes" width={32} height={32} />
                            </div>
                            <p className="font-bold text-xl">{value.toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex flex-row mt-4 mx-3 justify-between flex-wrap mx-5 gap-4">
                <MainTable />
            </div>

            <div className="flex flex-row mt-4 mx-3 justify-between flex-wrap h-[300px] mx-5 gap-4">
                <div className="h-full aspect-square">
                    <BudgetMeter percent={0.7} title="Limite de Gastos" loadingAnimation={0.7} />
                </div>
                <div className="h-full aspect-square">
                    <MinimalisticBarGraph data={[
                        { label: "jun", value: 99, id: 1 },
                        { label: "jul", value: 50, id: 2 },
                        { label: "ago", value: 50, id: 4 },
                        { label: "set", value: 20, id: 5 },
                        { label: "out", value: 100, id: 6 },
                        { label: "nov", value: 33, id: 7 },
                        { label: "dez", value: 59, id: 8 },
                    ]} title="Ganhos Mensais" loadingAnimation={0.7} />
                </div>
                <div className="h-full aspect-square">
                    <Velocimeter percent={0.9} title="Meta" />
                </div>
            </div>

        </div>
    )
}