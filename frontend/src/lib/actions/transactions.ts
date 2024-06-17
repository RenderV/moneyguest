"use server"

import createAxiosInstance from "../ax"

export async function getTransactions() {
    const ax = createAxiosInstance()
    const res = await ax.get("/transactions/")
    if (res.status > 400) {
        throw new Error("Failed to fetch transactions")
    }
    return res.data
}

export type Transaction = {
    name: string
    value: number
    person: string
    payment: string
    id: number
    date: string
}

export async function createTransaction({
    name,
    value,
    person,
    payment,
    date
}: {
    name: string
    value: number
    person: string
    payment: string
    date?: string
}): Promise<Transaction> {
    const ax = createAxiosInstance()

    const payload: {
        name: string
        value: number
        person: string
        payment: string
        date?: string
    } = {
        name,
        value,
        person,
        payment,
    }

    if(date){
        payload["date"] = date
    }

    const res = await ax.post("/transactions/", payload)
    return {
        name: res.data.name,
        value: res.data.value,
        person: res.data.person,
        payment: res.data.payment,
        id: res.data.id,
        date: res.data.date,
    }
}

export async function getStats(){
    const ax = createAxiosInstance()
    const res = await ax.get("/transactions/get_stats/")
    return {
        total: res.data.total as number,
        positive: res.data.positive as number,
        negative: res.data.negative as number
    }
}

type MonthlyBalance = {
    "month": string,
    "year": number,
    "balance": number
}
export async function getMonthlyBalance(){
    const ax = createAxiosInstance()
    const res = await ax.get("/transactions/get_monthly_balance/")
    return res.data as MonthlyBalance[]
}

type DashboardData = {
    spendings: number,
    limit: number,
    goal: number,
    percent_limit: number | null,
    percent_goal: number | null,
}

export async function getDashboardData(){
    const ax = createAxiosInstance()
    const res = await ax.get("/transactions/get_limit_percent/")
    return res.data as DashboardData
}

export async function getSettings(){
    const ax = createAxiosInstance()
    const res = await ax.get("/settings/")
    return {
        limit: res.data.spending_limit as number,
        goal: res.data.spending_goal as number
    }
}

export async function updateSettings({
    limit,
    goal,
}: {
    limit: number
    goal: number
}) {
    const ax = createAxiosInstance()
    await ax.post("/settings/", {
        spending_limit: limit,
        spending_goal: goal,
    })
}