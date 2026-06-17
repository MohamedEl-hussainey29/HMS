/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, type ReactNode, useEffect } from "react";
import type { GetRoomsParams } from "../api/modules/rooms";
import { RoomsAPI } from "../api";

export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: { _id: string; name: string }[];
  createdBy: {
    _id: string;
    userName: string;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface RoomsContextType {
  rooms: Room[];
  isLoading: boolean;
  fetchRooms: (filters?: GetRoomsParams) => Promise<void>;
}

export const RoomsContext = createContext<RoomsContextType | null>(null);

export function RoomsProvider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [activeFilters, setActiveFilters] = useState<GetRoomsParams | undefined>(() => {
  const onExploreRooms = sessionStorage.getItem("onExploreRooms");
  const saved = sessionStorage.getItem("roomFilters");
  return (onExploreRooms && saved) ? JSON.parse(saved) : undefined;
});

const fetchRooms = async (filters?: GetRoomsParams) => {
  setIsLoading(true);
  setActiveFilters(filters);

  if (filters) {
    sessionStorage.setItem("roomFilters", JSON.stringify(filters));
  } else {
    sessionStorage.removeItem("roomFilters");
  }
  const { data } = await RoomsAPI.getAllRoomsByUser(filters);
  setRooms(data.data.rooms ?? []);
  setIsLoading(false);
};

useEffect(() => {
  fetchRooms(activeFilters);
}, []);
  return (
    <RoomsContext.Provider value={{ rooms, fetchRooms, isLoading }}>
      {children}
    </RoomsContext.Provider>
  );
}

export const useRooms = () => {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error("useRooms must be used within a RoomsProvider");
  }
  return context;
};