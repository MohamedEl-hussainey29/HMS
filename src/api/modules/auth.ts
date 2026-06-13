
import type { changePasswordFormValues } from "../../modules/Authentication/ChangePassword/ChangePassword";
import type { ForgetPasswordFormData } from "../../modules/Authentication/ForgetPassword/ForgetPassword";
import type { LoginFormValues } from "../../modules/Authentication/Login/Login";
import type { ResetPasswordFormData } from "../../modules/Authentication/ResetPassword/ResetPassword";
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

export const ForgetPassword = (data: ForgetPasswordFormData) => {
    return axiosClient.post("/portal/users/forgot-password", data);
}

export const ResetPassword = (data: ResetPasswordFormData) => {
    return axiosClient.post("/portal/users/reset-password", data);
}

export const getProfile = (id: string) => {
    return axiosClient.get(`/admin/users/${id}`);
}