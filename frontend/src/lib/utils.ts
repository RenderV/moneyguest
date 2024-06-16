import { User } from "@/app/types/user";
import { type ClassValue, clsx } from "clsx"
import { getCookie } from "cookies-next";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentUserClient(): User | null{
  const currentUser = getCookie("currentUser");
  if(currentUser) {
    return JSON.parse(currentUser);
  }
  return null;
}
