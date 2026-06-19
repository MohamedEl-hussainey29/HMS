import axiosClient from "../axiosClient";


interface PaginationParams {
  page: number;
  size: number;
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