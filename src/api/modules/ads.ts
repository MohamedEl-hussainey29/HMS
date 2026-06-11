import axiosClient from "../axiosClient";

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