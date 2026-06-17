/* eslint-disable react-hooks/exhaustive-deps */
import { useRooms } from "../../../../../context/RoomsContext";
import { Box, CircularProgress, circularProgressClasses, Grid, Typography } from "@mui/material";
import RoomCard from "../../../../Shared/RoomCard/RoomCard";
import BreadCrumbs from "../../../../Shared/BreadCrumbs/BreadCrumbs";
import { useEffect } from "react";

export default function ExploreRooms() {
  const { rooms, isLoading ,fetchRooms } = useRooms();

  useEffect(() => {
    sessionStorage.setItem("onExploreRooms", "true");

    const savedFilters = sessionStorage.getItem("roomFilters");
    if (!savedFilters) {
      fetchRooms();
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
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress
              variant="indeterminate"
              disableShrink
              enableTrackSlot
              sx={(theme) => ({
                color: "#1a90ff",
                animationDuration: "550ms",
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: "round",
                },
                [`& .${circularProgressClasses.track}`]: {
                  opacity: 1,
                  stroke: (theme.vars || theme).palette.grey[200],
                  ...theme.applyStyles("dark", {
                    stroke: (theme.vars || theme).palette.grey[800],
                  }),
                },
                ...theme.applyStyles("dark", {
                  color: "#308fe8",
                }),
              })}
              size={40}
              thickness={4}
              aria-label="Loading…"
            />
          </Box>
        ): <Grid container spacing={3}>
            {rooms.map((room) => (
              <Grid key={room._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <RoomCard room={room} />
              </Grid>
            ))}
          </Grid>
        }
        
      </Box>
    </>
  );
}