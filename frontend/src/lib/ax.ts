import axios from "axios";
import { getCurrentUserServer } from "./sutils";
import { isTokenValid } from "./actions/auth";
import { cookies } from "next/headers";

export default function createAxiosInstance() {
    const user = getCurrentUserServer();
    if(!user) {
        throw new Error("User not found");
    }

    const token = user.accessToken;

    const ax = axios.create({
        baseURL: "http://backend:8000/api/",
        timeout: 30000,
        timeoutErrorMessage: "Time out!",
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return ax
}