/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Typography } from "@mui/material";
import BreadCrumbs from "../../../Shared/BreadCrumbs/BreadCrumbs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { favsAPI } from "../../../../api";
import Spinner from "../../../Shared/Spinner/Spinner";
import RoomCard from "../../../Shared/RoomCard/RoomCard";
import noImage from "../../../../assets/images/noImage.png";
import { toast } from "react-toastify";

export default function FavList() {
  const { userData }: any = useContext(AuthContext);

  const [favoriteRoomsList, setFavoriteRoomsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // 1️⃣ دالة جلب البيانات الصريحة والمباشرة
  const fetchFavorites = async () => {
    if (!userData) return;

    setIsLoading(true);
    try {
      const res = await favsAPI.getUserFavorites({
        page: 1,
        size: 100,
      });

      const favoriteItem =
        res?.data?.data?.favoriteRooms?.[0] ??
        res?.data?.favoriteRooms?.[0];

      setFavoriteRoomsList(favoriteItem?.rooms ?? []);
      setError(false);
    } catch (err: any) {
      console.error(err);
      setFavoriteRoomsList([]);
      setError(true);

      // مش هنظهر توست لو المشكلة Timeout عشان الشاشة تفضل نظيفة
      if (!err.message?.includes("timeout")) {
        toast.error(
          err.response?.data?.message || "Failed to fetch favorites"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 2️⃣ بينادي الدالة مرة واحدة فقط وبشكل صريح أول ما الـ User داتا تجهز
  useEffect(() => {
    if (userData) {
      fetchFavorites();
    }
  }, [userData]); 

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justify: "space-between",
          px: 4,
          py: 2,
          mb: 4,
        }}
      >
        <BreadCrumbs />

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#152C5B",
            textAlign: "center",
            flex: 1,
          }}
        >
          Your Favorites
        </Typography>
      </Box>

      <Box sx={{ px: 4, pb: 6 }}>
        {isLoading && <Spinner />}

        {!isLoading && !error && (
          <>
            {favoriteRoomsList.length > 0 ? (
              <Grid container spacing={4}>
                {favoriteRoomsList.map((roomItem: any) => (
                  <Grid key={roomItem._id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <RoomCard
                      room={roomItem}
                      isFavorite={true} // طالما هنا يبقى القلب أحمر دائماً
                      refetchFavorites={fetchFavorites} // 🔄 التحديث اللحظي عند الحذف
                      height={220}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justify: "center",
                  py: 8,
                  bgcolor: "#fff",
                  borderRadius: "12px",
                  border: "1px dashed #E0E0E0",
                  mt: 2,
                }}
              >
                <Box
                  component="img"
                  src={noImage}
                  alt="No Favorites"
                  sx={{
                    width: 160,
                    height: "auto",
                    mb: 2,
                    opacity: 0.8,
                  }}
                />

                <Typography
                  variant="h6"
                  sx={{
                    color: "#152C5B",
                    fontWeight: 600,
                  }}
                >
                  No Favorites Yet
                </Typography>

                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{ mt: 0.5 }}
                >
                  Your favorite rooms will appear here once you add them.
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
}