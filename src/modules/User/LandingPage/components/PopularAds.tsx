import { Box, Typography } from "@mui/material";
import RoomCard from "../../../Shared/RoomCard/RoomCard";
import Spinner from "../../../Shared/Spinner/Spinner";
import type { AdsResponse } from "../../../Admin/Ads/components/AdsList";

interface PopularAdsProps{
    ads?: AdsResponse | null;
    isLoading: boolean;
}


export default function PopularAds({ads , isLoading}: PopularAdsProps) {



    const displayedAds = (ads?.data?.ads ?? []).slice(0, 5);
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
            <Box sx={{ mt: 12 }}>
                <Typography sx={{ fontWeight: 700, fontSize: "1.2rem", color: "#152C5B", mb: 2 }}>
                    Most popular ads
                </Typography>

                {isLoading && <Spinner />}

                {!isLoading && displayedAds.length > 0 && (
                    <Box sx={{ display: "grid", gap: "12px", ...getGridConfig() }}>
                        {displayedAds.map((ad, index) => {
                            const isBigCard = index === 0 && isBigLayout;

                            return (
                                <Box key={ad._id} sx={{ ...getItemSx(index), display: "flex", flexDirection: "column" }}>
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
        </>
    );
}