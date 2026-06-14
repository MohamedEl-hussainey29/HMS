import axiosClient from "../axiosClient";

export const charts = () => {
    return axiosClient.get('/admin/dashboard')
}