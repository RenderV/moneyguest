import BudgetMeter from "@/components/home/budgetMeter";
import MinimalisticBarGraph from "@/components/home/minimalisticBarGraph";
import Velocimeter from "@/components/home/velocimeter";

export default function Page() {
    return (
        <>
            <h1 className="text-3xl text-primary font-bold mt-8 ml-5 block">Dashboard</h1>
            <div className="flex flex-row mt-4 mx-3 flex-wrap h-[300px] mx-5 gap-4">
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

        </>
    )
}