import type { FacilityFormValues } from "../../modules/Admin/Facilities/components/FacilityData";
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

export const CreateFacility = (data: FacilityFormValues) => {
  return axiosClient.post("/admin/room-facilities",data)
}

export const UpdateFacility = (id: string ,data: FacilityFormValues) => {
  return axiosClient.put(`/admin/room-facilities/${id}`, data)
}

export const DeleteFacility = (id: string) => {
  return axiosClient.delete(`/admin/room-facilities/${id}`)
}