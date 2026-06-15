import { Box, Typography } from "@mui/material";
import BreadCrumbs from "../../../../Shared/BreadCrumbs/BreadCrumbs";

export default function RoomDetails() {
  return (
    <>
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
          sx={{ fontWeight: 700, color: "#152C5B", textAlign: "center", flex: 1 }}
        >
          Room Details
        </Typography>
      </Box>
    </>
  )
}
