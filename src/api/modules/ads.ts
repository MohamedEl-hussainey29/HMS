import axiosClient from "../axiosClient";

export interface CreateAdData {
  room: string;
  discount: number;
  isActive: boolean;
}

export interface UpdateAdData {
  discount: number;
  isActive: boolean;
}

interface PaginationParams {
  page: number;
  size: number;
}

export const getAllAds = (params?: PaginationParams) => {
    return axiosClient.get('/admin/ads', 
        {params: {
           page : params?.page,
           size : params?.size
        }

        }
    );
}

export const deleteAd = (id: string) => {
    return axiosClient.delete(`/admin/ads/${id}`)
}

export const createAd = (data: CreateAdData) => {
  return axiosClient.post("/admin/ads", data);
};

export const UpdateAd = (id: string, data: UpdateAdData) => {
  return axiosClient.put(`/admin/ads/${id}`, data);
};