import axiosClient from "../axiosClient";

interface PaginationParams {
  page: number;
  size: number;
}

export const getAllUsers = (params?: PaginationParams) => {
  return axiosClient.get('/admin/users', {
    params: {
      page: params?.page,
      size: params?.size
    }
  });
};

