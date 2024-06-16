import axios from "axios";
import { getCurrentUserServer } from "./sutils";
import { isTokenValid } from "./actions/auth";
import { cookies } from "next/headers";

export default function createAxiosInstance() {
    const user = getCurrentUserServer();
    const cookieStore = cookies();
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

    ax.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                const token = getCurrentUserServer()?.accessToken;
                if(!token) {
                    return Promise.reject(error);
                }
                const validToken = await isTokenValid(token);
                if(!validToken)
                    cookies().delete("currentUser");
            }
            return Promise.reject(error);
        }
    );
    return ax
}