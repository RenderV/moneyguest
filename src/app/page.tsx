import Image from "next/image";
import styles from "./page.module.css";
import MinimalisticBarGraph from "../components/home/minimalisticBarGraph";
import BudgetMeter from "../components/home/budgetMeter";
import Velocimeter from "../components/home/velocimeter";
import { Button } from "../components/home/button";
import plus from "../../public/plussign.svg"
import filtro from "../../public/filtro.svg"
import { Transactions } from "../components/home/maintable";

const mockupData = [
    { label: "jun", value: 99, id: 1 },
    { label: "jul", value: 50, id: 2 },
    { label: "ago", value: 50, id: 4 },
    { label: "set", value: 20, id: 5 },
    { label: "out", value: 100, id: 6 },
    { label: "nov", value: 33, id: 7 },
    { label: "dez", value: 59, id: 8 },
]


export default function Home() {
  const loadingAnimation = 0.7
  return (
    <main>
      <div style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
        {/* <BudgetMeter  percent={0.7} title="Limite de Gastos" loadingAnimation={loadingAnimation} /> */}
        {/* <MinimalisticBarGraph data={mockupData} title="Ganhos Mensais" loadingAnimation={loadingAnimation} /> */}
        {/* <Velocimeter percent={0.9} title="Meta" /> */}
        {/* <Button text="Filtrar" icon={filtro}/> */}
        {/* <Button text="Nova Transação" icon={plus}/> */}
        {/* <Transactions/> */}
      </div>
    </main>
  );
}