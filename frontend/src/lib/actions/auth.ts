"use server";

import { User } from "@/app/types/user";
import axios from "axios";

const ax = axios.create({
    baseURL: "http://backend:8000/dj-rest-auth/",
    timeout: 30000,
    timeoutErrorMessage: "Time out!",
});

export async function loginService(
    username: string,
    password: string
): Promise<User> {
    return ax
        .post("/login/", {
            username,
            password,
        })
        .then((res) => {
            return {
                username: res.data.user.username,
                email: res.data.user.email,
                firstName: res.data.user.first_name,
                lastName: res.data.user.last_name,
                accessToken: res.data.access,
                pk: res.data.user.pk,
            } as User;
        });
}

export async function registerUser({
    username,
    email,
    password1,
    password2,
}: {
    username: string;
    email: string;
    password1: string;
    password2: string;
}): Promise<User> {
    const res = await ax.post("/registration/", {
        username,
        email,
        password1,
        password2,
    });
    return {
        username: res.data.user.username,
        email: res.data.user.email,
        firstName: res.data.user.first_name,
        lastName: res.data.user.last_name,
        accessToken: res.data.access,
        pk: res.data.user.pk,
    } as User;
}

export async function validateToken(token: string): Promise<boolean> {
    return ax
        .post("/token/verify/", {
            token,
        })
        .then((res) => {
            return res.status === 200;
        });
}
