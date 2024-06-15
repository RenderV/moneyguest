"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Transaction = {
    name: string,
    payment: "Débito" | "Crédito" | "Pix" | "Boleto",
    value: number,
    date: string,
    person: string,
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "payment",
    header: "Cartão",
  },
  {
    accessorKey: "value",
    header: "Valor",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "person",
    header: "Pessoa",
  }
]
