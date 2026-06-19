/* eslint-disable react-hooks/exhaustive-deps */
import { useRooms } from "../../../../../context/RoomsContext";
import { Box, Grid, Typography } from "@mui/material";
import RoomCard from "../../../../Shared/RoomCard/RoomCard";
import BreadCrumbs from "../../../../Shared/BreadCrumbs/BreadCrumbs";
import { useEffect } from "react";
import Spinner from "../../../../Shared/Spinner/Spinner";

export default function ExploreRooms() {
  const { rooms, totalCount, isLoading ,fetchRooms } = useRooms();

  useEffect(() => {
    sessionStorage.setItem("onExploreRooms", "true");

    const savedFilters = sessionStorage.getItem("roomFilters");
    if (!savedFilters) {
      fetchRooms({size: totalCount , page: 1});
    }

    return () => {
      sessionStorage.removeItem("onExploreRooms");
      sessionStorage.removeItem("roomFilters"); 
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 4,
          py: 2,
          mb: 5
        }}
      >
        <BreadCrumbs />
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#152C5B", textAlign: "center", flex: 1 }}
        >
          Explore All Rooms
        </Typography>
      </Box>
      <Box>
        {isLoading ? (
          <Spinner/>
        ): <Box sx={{px: 6}}>
            <Typography sx={{color: "#152C5B", fontSize:'24px', fontWeight: 500}}>All Rooms ({totalCount})</Typography>
            <Grid container spacing={3} sx={{mt: 2}}>
              {rooms.map((room) => (
                <Grid key={room._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <RoomCard room={room} />
                </Grid>
              ))}
            </Grid>
          </Box>
        }
        
      </Box>
    </>
  );
}