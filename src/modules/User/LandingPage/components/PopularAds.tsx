/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { AdsAPI, favsAPI } from "../../../../api";
import useGetData from "../../../../hooks/useGetData";
import type { AdsResponse } from "../../../Admin/Ads/components/AdsList";
import RoomCard from "../../../Shared/RoomCard/RoomCard";
import Spinner from "../../../Shared/Spinner/Spinner";
import { AuthContext } from "../../../../context/AuthContext";

export default function PopularAds() {
    const { userData }: any = useContext(AuthContext);
    const [favIds, setFavIds] = useState<string[]>([]);

    const fetchAds = useCallback(() => {
        return AdsAPI.getAllAdsByUser({ page: 1, size: 5 });
    }, []);

    const { data: ads, isLoading, error } = useGetData<AdsResponse>(
        fetchAds,
        [userData],
        !!userData
    );

    const fetchFavoriteIds = async () => {
        if (!userData) return;
        try {
            const res = await favsAPI.getUserFavorites({ page: 1, size: 100 });
            const favoriteItem = res?.data?.data?.favoriteRooms?.[0] ?? res?.data?.favoriteRooms?.[0];
            const rooms = favoriteItem?.rooms ?? [];
            setFavIds(rooms.map((r: any) => r._id));
        } catch (err) {
            console.error("Error fetching favorite IDs:", err);
        }
    };

    useEffect(() => {
        if (userData) {
            fetchFavoriteIds();
        }
    }, [userData]);

    const handleLocalToggle = (roomId: string, isFav: boolean) => {
        if (isFav) {
            setFavIds((prev) => [...prev, roomId]);
        } else {
            setFavIds((prev) => prev.filter((id) => id !== roomId)); 
        }
    };

    const displayedAds = ads?.data?.ads ?? [];
    const count = displayedAds.length;
    const isBigLayout = count === 5 || count === 3;

    const getGridConfig = () => {
        switch (count) {
            case 5: return { gridTemplateColumns: { xs: "1fr", md: "0.8fr 1fr 1fr" }, gridTemplateRows: { md: "220px 220px" } };
            case 3: return { gridTemplateColumns: { xs: "1fr", md: "0.8fr 1fr" }, gridTemplateRows: { md: "220px 220px" } };
            case 4:
            case 2: return { gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gridTemplateRows: { md: "auto" } };
            case 1: return { gridTemplateColumns: "1fr", gridTemplateRows: "auto" };
            default: return {};
        }
    };

    const getItemSx = (index: number) => {
        if (count === 5) {
            if (index === 0) return { gridRow: { md: "1 / 3" }, gridColumn: { md: "1" } };
            if (index === 1) return { gridRow: { md: "1" }, gridColumn: { md: "2" } };
            if (index === 2) return { gridRow: { md: "1" }, gridColumn: { md: "3" } };
            if (index === 3) return { gridRow: { md: "2" }, gridColumn: { md: "2" } };
            if (index === 4) return { gridRow: { md: "2" }, gridColumn: { md: "3" } };
        }
        if (count === 3) {
            if (index === 0) return { gridRow: { md: "1 / 3" }, gridColumn: { md: "1" } };
            if (index === 1) return { gridRow: { md: "1" }, gridColumn: { md: "2" } };
            if (index === 2) return { gridRow: { md: "2" }, gridColumn: { md: "2" } };
        }
        return {};
    };

    return (
        <>
            {userData && (
                <Box sx={{ mt: 12 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "1.2rem", color: "#152C5B", mb: 2 }}>
                        Most popular ads
                    </Typography>

                    {isLoading && <Spinner />}

                    {!isLoading && !error && displayedAds.length > 0 && (
                        <Box sx={{ display: "grid", gap: "12px", ...getGridConfig() }}>
                            {displayedAds.map((ad, index) => {
                                const isBigCard = index === 0 && isBigLayout;
                                const isRoomFavorite = favIds.includes(ad.room?._id);

                                return (
                                    <Box key={ad._id} sx={{ ...getItemSx(index), display: "flex", flexDirection: "column" }}>
                                        <RoomCard
                                            room={ad.room}
                                            height={isBigCard ? "100%" : 220}
                                            isFavorite={isRoomFavorite}
                                            onToggleSuccess={handleLocalToggle}
                                        />
                                    </Box>
                                );
                            })}
                        </Box>
                    )}
                </Box>
            )}
        </>
    );
}