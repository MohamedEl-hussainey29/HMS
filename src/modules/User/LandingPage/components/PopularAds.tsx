import { Box, Typography } from "@mui/material";
import { useCallback } from "react";
import { AdsAPI } from "../../../../api";
import useGetData from "../../../../hooks/useGetData";
import type { AdsResponse } from "../../../Admin/Ads/components/AdsList";
import RoomCard from "../../../Shared/RoomCard/RoomCard";
import Spinner from "../../../Shared/Spinner/Spinner";

export default function PopularAds() {

    const fetchAds = useCallback(() => {
        return AdsAPI.getAllAds({page: 1,size: 5});
      }, []);
    const { data: ads, isLoading, error } = useGetData<AdsResponse>(fetchAds,[]);

    const displayedAds = ads?.data?.ads ?? [];
    const count = displayedAds.length;
    const isBigLayout = count === 5 || count === 3; // only these get the big first card

    const getGridConfig = () => {
        switch (count) {
            case 5:
            case 3:
            return {
                gridTemplateColumns: { xs: "1fr", md: "0.8fr 1fr" }, // 👈 only 2 columns
                gridTemplateRows: { md: "220px 220px" },
            };
            case 4:
            case 2:
            return {
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gridTemplateRows: { md: "auto" },
            };
            case 1:
            return {
                gridTemplateColumns: "1fr",
                gridTemplateRows: "auto",
            };
            default:
            return {};
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
            if (index === 0) return { gridRow: { md: "1 / 3" }, gridColumn: { md: "1" } }; // big card spans both rows
            if (index === 1) return { gridRow: { md: "1" }, gridColumn: { md: "2" } };      // top right
            if (index === 2) return { gridRow: { md: "2" }, gridColumn: { md: "2" } };      // bottom right
        }
        return {};
    };

  return (
    <>
    {displayedAds.length != 0 &&
        <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "1.2rem", color: "#152C5B", mb: 2 }}>
                Most popular ads
            </Typography>

            {isLoading && <Spinner/>}

            {error && <Box>Something went wrong</Box>}

            {!isLoading && !error && (
                <Box sx={{ display: "grid", gap: "12px", ...getGridConfig() }}>
                    {displayedAds.map((ad, index) => {
                    const isBigCard = index === 0 && isBigLayout;
                    return (
                        <Box
                        key={ad._id}
                        sx={{
                            ...getItemSx(index),
                            display: "flex",
                            flexDirection: "column",
                        }}
                        >
                        <RoomCard
                            room={ad.room}
                            height={isBigCard ? "100%" : 220}
                        />
                        </Box>
                    );
                    })}
                </Box>
            )}
        </Box>
    }
        
    </>
  )
}
