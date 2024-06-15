import * as React from "react"

import { cn } from "@/lib/utils"
import searchIcon from "/public/search.svg"
import filterIcon from "/public/filtro.svg"
import plusIcon from "/public/plussign.svg"
import Image from "next/image"
import { Button } from "../common/button"
import { DataTable } from "../common/table/data-table"
import { columns, Transaction } from "../common/table/columns"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                placeholder={"Busque uma transação"}
                type={type}
                className={cn(
                    "flex text-white font-medium h-6 w-full outline-none rounded-md border-input bg-blackwhite px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }

async function getData(): Promise<Transaction[]> {
    return [
        {
            name: "Groceries",
            payment: "Débito",
            value: 150.00,
            date: "2024-01-15",
            person: "Alice",
        },
        {
            name: "Electricity Bill",
            payment: "Boleto",
            value: 200.00,
            date: "2024-01-10",
            person: "Bob",
        },
        {
            name: "Online Shopping",
            payment: "Crédito",
            value: 300.00,
            date: "2024-01-12",
            person: "Charlie",
        },
        {
            name: "Rent",
            payment: "Pix",
            value: 1200.00,
            date: "2024-01-01",
            person: "Diana",
        },
        {
            name: "Gym Membership",
            payment: "Débito",
            value: 75.00,
            date: "2024-01-05",
            person: "Eve",
        },
        {
            name: "Restaurant",
            payment: "Crédito",
            value: 250.00,
            date: "2024-01-08",
            person: "Frank",
        },
        {
            name: "Internet Bill",
            payment: "Boleto",
            value: 100.00,
            date: "2024-01-03",
            person: "Grace",
        },
        {
            name: "Book Purchase",
            payment: "Pix",
            value: 60.00,
            date: "2024-01-20",
            person: "Hank",
        },
        {
            name: "Car Fuel",
            payment: "Débito",
            value: 90.00,
            date: "2024-01-25",
            person: "Ivy",
        },
        {
            name: "Concert Ticket",
            payment: "Crédito",
            value: 150.00,
            date: "2024-01-18",
            person: "Jack",
        }
    ]
}

export default async function MainTable() {
    const data = await getData()
    return (
        <>
            <div className="w-full bg-blackwhite rounded-xl h-12 flex flex-row items-center">
                <Image className="ml-2" src={searchIcon} alt="Search" width={20} height={20} />
                <Input />
            </div>
            <div className="flex flex-col w-full drop-shadow-md rounded-xl h-[500px] bg-white">
                <div className="w-full flex flex-row">
                    <h1 className="font-medium text-2xl ml-3 mt-3 text-nowrap w-max">Últimas Transações</h1>
                    {/* <Button className="m-10" icon={filterIcon} text="mano"/> */}
                    <div className="flex flex-row w-full justify-end h-10 gap-2 mt-4 mr-3">
                        {/* <Button>
                            <Image className="mr-2" src={filterIcon} alt="Filter" width={20} height={20} />
                            Filtrar
                        </Button> */}
                        <Button>
                            <Image className="mr-2" src={plusIcon} alt="Filter" width={20} height={20} />
                            Nova Transação
                        </Button>
                    </div>
                </div>
                <div className="container mx-auto mt-2 max-w-full overflow-y-auto">
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </>
    )
}