import axiosClient from "../axiosClient";


interface PaginationParams {
  page: number;
  size: number;
}
export interface CreateBookingData {
  startDate: string;
  endDate: string;
  room: string;
  totalPrice: number;
}

export const getAllBookings = (params?: PaginationParams) => {
  return axiosClient.get('/admin/booking', {
    params: {
      page: params?.page,
      size: params?.size
    }
  });
};

export const DeleteBooking = (id: string) => {
  return axiosClient.delete(`/admin/booking/${id}`)
}

export const CreateBooking = (data: CreateBookingData) => {
  return axiosClient.post(`/portal/booking`, data)
}

