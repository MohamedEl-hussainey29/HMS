import axiosClient from "../axiosClient";


interface PaginationParams {
  page: number;
  size: number;
}

export const getAllRooms = (params?: PaginationParams) => {
  return axiosClient.get('/admin/rooms', {
    params: {
      page: params?.page,
      size: params?.size
    }
  });
};

export const DeleteRoom = (id: string) => {
  return axiosClient.delete(`/admin/rooms/${id}`)
}