import axiosClient from "../axiosClient";


interface PaginationParams {
  page?: number;
  size?: number;
}
export interface GetRoomsParams extends PaginationParams {
  startDate?: string;
  endDate?: string;
  capacity?: number;
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

export const getAllRoomsByUser = (params?: GetRoomsParams) => {
  return axiosClient.get('/portal/rooms/available', {
    params: {
      page: params?.page,
      size: params?.size,
      startDate: params?.startDate,
      endDate: params?.endDate,
      capacity: params?.capacity,
    }
  });
};