'use client'
import * as React from "react"

import { cn } from "@/lib/utils"
import searchIcon from "/public/search.svg"
import filterIcon from "/public/filtro.svg"
import plusIcon from "/public/plussign.svg"
import Image from "next/image"
import { Button } from "../common/button"
import { DataTable } from "../common/table/data-table"
import { columns } from "../common/table/columns"
import dynamic from "next/dynamic"
import { getTransactions, Transaction } from "@/lib/actions/transactions"
import { useRouter } from "next/navigation"
const SpendingPopup = dynamic(() => import('@/components/home/newSpending'), { ssr: false })

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

export default function MainTable() {
    const [popupOpen, setPopupOpen] = React.useState(false)
    const [data, setData] = React.useState<Transaction[]>([])
    const [search, setSearch] = React.useState("")
    const router = useRouter()

    const displayedData = data.filter((value) => {
        return JSON.stringify(value).toLowerCase().includes(search.toLowerCase())
    })

    React.useEffect(() => {
        getTransactions().then((value: Transaction[]) => {
            const parsedData = value.map((value) => {
                value.date = new Date(value.date).toLocaleString()
                return value
            })
            setData(parsedData)
        })
    }, [])

    const onSubmitSuccess = (transaction: Transaction) => {
        transaction.date = new Date(transaction.date).toLocaleString()
        setData((data) => [transaction, ...data])
        router.refresh()
        
    }

    return (
        <>
            <div className="w-full bg-blackwhite rounded-xl h-12 flex flex-row items-center">
                <Image className="ml-2" src={searchIcon} alt="Search" width={20} height={20} />
                <Input value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className="flex flex-col w-full drop-shadow-md rounded-xl h-[500px] bg-white">
                <div className="w-full flex flex-row">
                    <h1 className="font-medium text-2xl ml-3 mt-3 text-nowrap w-max">Últimas Transações</h1>
                    <div className="flex flex-row w-full justify-end h-10 gap-2 mt-4 mr-3">
                        <Button onClick={() => setPopupOpen(true)}>
                            <Image className="mr-2" src={plusIcon} alt="Filter" width={20} height={20} />
                            Nova Transação
                        </Button>
                    </div>
                </div>
                <div className="container mx-auto mt-2 max-w-full overflow-y-auto">
                    <DataTable columns={columns} data={displayedData} />
                </div>
            </div>
            <SpendingPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} onSubmitSuccess={onSubmitSuccess}/>
        </>
    )
}