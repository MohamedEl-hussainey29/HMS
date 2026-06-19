import type { CreateCommentRequest, CreateReviewRequest} from "../../modules/User/Rooms/components/RoomDetails/Types/types";
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

// user
export interface RoomDetailsParams{
    startDate: string,
    endDate: string
}

export const getRoomDetails = (id: string, params:RoomDetailsParams) => {
       return axiosClient.get(`/portal/rooms/${id}`, {params})
}

// user => review
export const createReview = (data: CreateReviewRequest) => {
       return axiosClient.post(`/portal/room-reviews`, data);
}

// user => comment
export const createComment = (data: CreateCommentRequest) => {
       return axiosClient.post(`/portal/room-comments`, data);
}

