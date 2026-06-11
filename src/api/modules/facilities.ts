import axiosClient from "../axiosClient";

interface PaginationParams {
  page: number;
  size: number;
}

export const getAllFacilities = (params?: PaginationParams) => {
  return axiosClient.get('/admin/room-facilities', {
    params: {
      page: params?.page,
      size: params?.size
    }
  });
};