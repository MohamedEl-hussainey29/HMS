/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Typography } from "@mui/material";
import BreadCrumbs from "../../../Shared/BreadCrumbs/BreadCrumbs";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import Spinner from "../../../Shared/Spinner/Spinner";
import RoomCard from "../../../Shared/RoomCard/RoomCard";
import noImage from "../../../../assets/images/noImage.png";
import { useFavorites } from "../../../../context/FavoritesContext";

export default function FavList() {
  const { loading: authLoading }: any = useContext(AuthContext);
  const { favoriteRooms, isLoading } = useFavorites();

  const showSpinner = authLoading || isLoading;

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
        {showSpinner && <Spinner />}

        {!showSpinner && (
          <>
            {favoriteRooms.length > 0 ? (
              <Grid container spacing={4}>
                {favoriteRooms.map((roomItem: any) => (
                  <Grid key={roomItem._id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <RoomCard room={roomItem} height={220} />
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
                  sx={{ width: 160, height: "auto", mb: 2, opacity: 0.8 }}
                />

                <Typography variant="h6" sx={{ color: "#152C5B", fontWeight: 600 }}>
                  No Favorites Yet
                </Typography>

                <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5 }}>
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