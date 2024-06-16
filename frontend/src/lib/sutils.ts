import { User } from "@/app/types/user";
import { cookies } from "next/headers";

export function getCurrentUserServer(): User | null {
  const currentUser = cookies().get("currentUser");
  if(currentUser) {
    return JSON.parse(currentUser.value);
  }
  return null
}