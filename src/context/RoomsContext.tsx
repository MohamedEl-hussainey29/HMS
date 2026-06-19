/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import {createContext, useState, useContext, useEffect, useCallback, type ReactNode} from "react";
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
  totalCount: number;
  fetchRooms: (filters?: GetRoomsParams) => Promise<void>;
}

export const RoomsContext = createContext<RoomsContextType | null>(null);

export function RoomsProvider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [activeFilters, setActiveFilters] = useState<GetRoomsParams | undefined>(() => {
    const onExploreRooms = sessionStorage.getItem("onExploreRooms");
    const savedFilters = sessionStorage.getItem("roomFilters");

    if (onExploreRooms && savedFilters) {
      try {
        return JSON.parse(savedFilters);
      } catch {
        return undefined;
      }
    }
    return undefined;
  });

  const fetchRooms = useCallback(
    async (filters?: GetRoomsParams) => {
      try {
        setIsLoading(true);
        setActiveFilters(filters);

        if (filters) {
          sessionStorage.setItem("roomFilters", JSON.stringify(filters));
        } else {
          sessionStorage.removeItem("roomFilters");
        }

        const { data } = await RoomsAPI.getAllRoomsByUser(filters);
        setRooms(data?.data?.rooms ?? []);
        setTotalCount(data?.data?.totalCount ?? 0);

      } catch {
        setRooms([]);
        setTotalCount(0);
      } finally {
        setIsLoading(false);
      }
    },[]
  );

  useEffect(() => {
    fetchRooms(activeFilters);
  }, []);

  return (
    <RoomsContext.Provider value={{rooms, totalCount, fetchRooms, isLoading}}>{children}</RoomsContext.Provider>
  );
}

export const useRooms = () => {
  const context = useContext(RoomsContext);

  if (!context) {
    throw new Error(
      "useRooms must be used within a RoomsProvider"
    );
  }

  return context;
};