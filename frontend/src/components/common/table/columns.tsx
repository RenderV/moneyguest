"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Transaction } from "@/lib/actions/transactions"

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "payment",
    header: "Método de Pagamento",
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
