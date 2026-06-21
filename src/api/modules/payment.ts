import axiosClient from "../axiosClient";

export const PayBooking = (id: string, data: { token: string }) => {
    return axiosClient.post(`/portal/booking/${id}/pay`, data);
};