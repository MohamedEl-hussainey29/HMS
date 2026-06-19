import { Box, Container, Grid, Typography } from "@mui/material";
import BreadCrumbs from "../../../../Shared/BreadCrumbs/BreadCrumbs";
import { useParams, useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { RoomsAPI } from "../../../../../api";
import useGetData from "../../../../../hooks/useGetData";
import type { RoomDetailsResponse } from "./Types/types";
import RoomGallery from "./components/RoomGallery";
import RoomInfo from "./components/RoomInfo";
import BookingCard from "./components/BookingCard";
import Reviews from "./components/Reviews";
import Comments from "./components/Comments";
import Divider from "@mui/material/Divider";

export default function RoomDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const fetchRoomDetails = useCallback(async () => {
    if (!id) {
      throw new Error("Missing parameters");
    }

    const response = await RoomsAPI.getRoomDetails(id);

    return response;
  }, [id]);

  const { data } = useGetData<RoomDetailsResponse>(fetchRoomDetails, [id]);
  const room = data?.data.room;

  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 4,
            py: 2,
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
            Room - {room?.roomNumber}
          </Typography>
        </Box>

        <RoomGallery images={room?.images ?? []} />

        <Grid container sx={{ mt: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            {room && <RoomInfo facilities={room.facilities} />}
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            {room && (
              <BookingCard
                price={room.price}
                discount={room.discount}
                startDate={startDate!}
                endDate={endDate!}
              />
            )}
          </Grid>
        </Grid>

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

            <Grid sx={{ mt: { md: 4 } }} size={{ xs: 12, md: 5 }}>
              <Comments roomId={id} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
