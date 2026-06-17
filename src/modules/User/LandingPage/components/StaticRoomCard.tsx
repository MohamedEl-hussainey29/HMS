import { Box, Typography } from "@mui/material";

interface StaticHousesInterface {
  house: {
    title: string;
    subTitle: string;
    image: string;
  };
}

export default function StaticRoomCard({house}: StaticHousesInterface) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        border: "0",
        position: "relative",
        height: "100%",
        "&:hover .hover-overlay": { opacity: 1 },
      }}
    >
      <Box
        component="img"
        src={house.image}
        alt={house.title}
        sx={{width: "100%", height: 200, objectFit: "cover", display: "block",borderRadius: 2,mb: 2}}
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          bgcolor: "#FF498B",
          color: "#fff",
          px: 3,
          py: 1.5,
          borderBottomLeftRadius: "15px"
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>Popular Choice</Typography>
      </Box>
      <Typography variant="body1" sx={{ color: "#152C5B", fontWeight: 500 }}>
        {house.title}
      </Typography>
      <Typography variant="body2" sx={{ color: "#B0B0B0" }}>
        {house.subTitle}
      </Typography>
    </Box>
  )
}
