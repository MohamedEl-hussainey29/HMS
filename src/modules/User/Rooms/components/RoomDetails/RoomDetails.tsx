import { Box, Container, Grid, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import { useCallback, useContext } from "react";

import BreadCrumbs from "../../../../Shared/BreadCrumbs/BreadCrumbs";
import Spinner from "../../../../Shared/Spinner/Spinner";
import RoomGallery from "./components/RoomGallery";
import RoomInfo from "./components/RoomInfo";
import BookingCard from "./components/BookingCard";
import Reviews from "./components/Reviews";
import Comments from "./components/Comments";

import { RoomsAPI } from "../../../../../api";
import useGetData from "../../../../../hooks/useGetData";
import { AuthContext } from "../../../../../context/AuthContext";

import type { RoomDetailsResponse } from "./Types/types";

export default function RoomDetails() {
  const { id } = useParams();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within AuthContextProvider");
  }

  const { userData } = authContext;

  const fetchRoomDetails = useCallback(async () => {
    if (!id) {
      throw new Error("Missing room id");
    }

    return await RoomsAPI.getRoomDetails(id);
  }, [id]);

  const { data, isLoading } = useGetData<RoomDetailsResponse>(
    fetchRoomDetails,
    [id]
  );

  const room = data?.data.room;

  return (
    <Container>
      <Box sx={{ py: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: {
              xs: "center",
              md: "flex-start",
            },
            mb: { xs: 2, md: 0 },
          }}
        >
          <BreadCrumbs />
        </Box>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          color: "#152C5B",
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        Room - {room?.roomNumber}
      </Typography>
    </Box>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <RoomGallery images={room?.images ?? []} />

          <Grid container sx={{ mt: 6 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              {room && <RoomInfo facilities={room.facilities} />}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {room && (
                <BookingCard
                  roomId={room._id}
                  price={room.price}
                  discount={room.discount}
                />
              )}
            </Grid>
          </Grid>

          {userData && id && (
            <Box sx={{ mt: 5 }}>
              <Grid container spacing={1}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Reviews roomId={id} />
                </Grid>

                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ bgcolor: "#3252DF" }}
                />

                <Grid
                  size={{ xs: 12, md: 5 }}
                  sx={{ mt: { xs: 2, md: 4 } }}
                >
                  <Comments roomId={id} />
                </Grid>
              </Grid>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}