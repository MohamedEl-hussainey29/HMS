/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRooms } from "../../../../../context/RoomsContext";
import { Box, Grid, Typography } from "@mui/material";
import RoomCard from "../../../../Shared/RoomCard/RoomCard";
import BreadCrumbs from "../../../../Shared/BreadCrumbs/BreadCrumbs";
import Spinner from "../../../../Shared/Spinner/Spinner";
import Pagination from "../../../../Shared/Pagination/Pagination";

const ROOMS_PER_PAGE = 12;

function getSavedFilters() {
  const saved = sessionStorage.getItem("roomFilters");
  if (!saved) return undefined;
  try {
    return JSON.parse(saved);
  } catch {
    return undefined;
  }
}

export default function ExploreRooms() {
  const { rooms, totalCount, isLoading, fetchRooms } = useRooms();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    sessionStorage.setItem("onExploreRooms", "true");
    return () => {
      sessionStorage.removeItem("onExploreRooms");
    };
  }, []);

  useEffect(() => {
    const savedFilters = getSavedFilters();
    fetchRooms({
      ...savedFilters,
      size: ROOMS_PER_PAGE,
      page: currentPage,
    });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 4,
          py: 2,
          mb: 5,
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
          <Spinner />
        ) : (
          <Box sx={{ px: 6 }}>
            <Typography sx={{ color: "#152C5B", fontSize: "24px", fontWeight: 500 }}>
              All Rooms ({totalCount})
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {rooms.map((room) => (
                <Grid key={room._id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <RoomCard room={room} />
                </Grid>
              ))}
            </Grid>

            <Pagination
              totalItems={totalCount}
              itemsPerPage={ROOMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </Box>
        )}
      </Box>
    </>
  );
}