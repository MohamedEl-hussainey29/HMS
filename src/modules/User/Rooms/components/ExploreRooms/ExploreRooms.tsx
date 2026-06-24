/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRooms } from "../../../../../context/RoomsContext";
import { Box, Grid, Typography } from "@mui/material";
import RoomCard from "../../../../Shared/RoomCard/RoomCard";
import BreadCrumbs from "../../../../Shared/BreadCrumbs/BreadCrumbs";
import Spinner from "../../../../Shared/Spinner/Spinner";
import Pagination from "../../../../Shared/Pagination/Pagination";
import NoData from "../../../../Shared/NoData/NoData";

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
            {rooms.length > 0 ?(
              <>
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
              </>
            )
            : (
              <NoData item="Available Rooms"/>
            )
          }
          </Box>
        )}
      </Box>
    </>
  );
}