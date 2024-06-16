import { redirect } from "next/navigation";

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
  redirect("/login")
}