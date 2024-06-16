import { setCookie } from "cookies-next";
import { deleteCookie } from "cookies-next";
import { loginService, registerUser } from "../lib/actions/auth";

export const useLogin = () => {
    const login = async (username: string, password: string) => {
        const user = await loginService(username, password);
        if (user) {
            setCookie("currentUser", JSON.stringify(user));
        }
        return user;
    };

    return { login };
};

export const useLogout = () => {
    const logout = () => {
        deleteCookie("currentUser");
    };
    return { logout };
};

export const useRegister = () => {
    const register = async (
        username: string,
        email: string,
        password1: string,
        password2: string
    ) => {
        const user = await registerUser({
            username,
            email,
            password1,
            password2,
        });
        if (user) {
            setCookie("currentUser", JSON.stringify(user));
        }
        return user;
    };

    return { register };
};
