import type { LoginFormValues } from "../../modules/Authentication/Login/Login";
import axiosClient from "../axiosClient";
import type { registerFormValues } from "../../modules/Authentication/Register/Register";

export const Login = (data: LoginFormValues)=>{
    return axiosClient.post("/admin/users/login",data);
}

export const Register = (data : registerFormValues) => {
    return axiosClient.post('portal/users', data)
}