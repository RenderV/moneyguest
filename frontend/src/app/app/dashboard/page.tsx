import BudgetMeter from "@/components/home/budgetMeter";
import MinimalisticBarGraph from "@/components/home/minimalisticBarGraph";
import Velocimeter from "@/components/home/velocimeter";
import { getDashboardData, getMonthlyBalance } from "@/lib/actions/transactions";

export default async function Page() {
    const monthlyBalance = await getMonthlyBalance()
    const limitData = await getDashboardData()
    const barGraphData = monthlyBalance.map((value) => {
        return {
            label: value.month,
            value: value.balance === null ? 0 : value.balance,
            id: value.year
        }
    })
    return (
        <>
            <h1 className="text-3xl text-primary font-bold mt-8 ml-5 block">Dashboard</h1>
            <div className="gap-12 flex flex-row mt-4 mx-3 flex-wrap h-[300px] mx-5 gap-4">
                <div className="h-full aspect-square">
                    <BudgetMeter percent={limitData.percent_limit || 0} title="Limite de Gastos" loadingAnimation={0.7} />
                </div>
                <div className="h-full aspect-square">
                    <MinimalisticBarGraph data={barGraphData} title="Ganhos Mensais" loadingAnimation={0.7} />
                </div>
                <div className="h-full aspect-square">
                    <Velocimeter percent={limitData.percent_goal || 0} title="Meta" />
                </div>
            </div>

        </>
    )
}