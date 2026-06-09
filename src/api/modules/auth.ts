
import type { changePasswordFormValues } from "../../modules/Authentication/ChangePassword/ChangePassword";
import type { LoginFormValues } from "../../modules/Authentication/Login/Login";
import axiosClient from "../axiosClient";

export const Login = (data: LoginFormValues) => {
    return axiosClient.post("/admin/users/login", data);
}


export const Register = (data: FormData) => {
    return axiosClient.post("/portal/users", data);
}

export const changePassword = (data: changePasswordFormValues) => {
    return axiosClient.post("/admin/users/change-password", data);
}