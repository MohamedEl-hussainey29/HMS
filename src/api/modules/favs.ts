import axiosClient from "../axiosClient";

interface PaginationParams {
    page: number;
    size: number;
}

export const getUserFavorites = (params?: PaginationParams) => {
    return axiosClient.get('/portal/favorite-rooms', { params });
};

export const addToFavorites = (roomId: string) => {
    return axiosClient.post('/portal/favorite-rooms', { roomId });
};

export const deleteFromFavorites = (favId: string, roomId: string) => {
    return axiosClient.delete(`portal/favorite-rooms/${favId}`, {
        data: { roomId }
    })
}