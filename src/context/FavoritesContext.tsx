/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useContext as useReactContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { favsAPI } from "../api";

interface FavoritesContextType {
  favoriteRooms: any[];
  favoriteIds: Set<string>;
  isFavorite: (roomId: string) => boolean;
  toggleFavorite: (roomId: string, nextState: boolean) => void;
  refetchFavorites: () => Promise<void>;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { userData }: any = useReactContext(AuthContext);
  const [favoriteRooms, setFavoriteRooms] = useState<any[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (!userData) {
      setFavoriteRooms([]);
      setFavoriteIds(new Set());
      return;
    }
    setIsLoading(true);
    try {
      const res = await favsAPI.getUserFavorites({ page: 1, size: 100 });
      const favoriteItem = res?.data?.data?.favoriteRooms?.[0] ?? res?.data?.favoriteRooms?.[0];
      const rooms = favoriteItem?.rooms ?? [];
      setFavoriteRooms(rooms);
      setFavoriteIds(new Set(rooms.map((r: any) => r._id)));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    fetchFavorites();
  }, [userData]);

  const isFavorite = useCallback(
    (roomId: string) => favoriteIds.has(roomId),
    [favoriteIds]
  );

  const toggleFavorite = useCallback((roomId: string, nextState: boolean) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (nextState) next.add(roomId);
      else next.delete(roomId);
      return next;
    });

    setFavoriteRooms((prev) => {
      if (nextState) {
        
        return prev;
      }
      return prev.filter((room) => room._id !== roomId);
    });
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteRooms,
        favoriteIds,
        isFavorite,
        toggleFavorite,
        refetchFavorites: fetchFavorites,
        isLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
}