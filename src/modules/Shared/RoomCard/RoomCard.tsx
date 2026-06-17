import { Box, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
import noImage from "../../../assets/images/Screenshot 2026-06-17 024622.png"

export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: { _id: string; name: string }[];
  createdBy: { _id: string; userName: string };
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        border: "0",
        position: "relative",
        cursor: "pointer",
        "&:hover .hover-overlay": { opacity: 1 },
      }}
    >
      <Box
        component="img"
        src={room.images.length != 0 ? room.images[0] : noImage}
        alt={`Room ${room.roomNumber}`}
        sx={{width: "100%", height: 220, objectFit: "cover", display: "block"}}
      />

      {/* Hover overlay */}
      <Box
        className="hover-overlay"
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.3)",
          opacity: 0,
          transition: "opacity 0.25s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <IconButton
          sx={{
            color: "#FFF",
            transition: "all 0.2s ease",
          }}
          onClick={()=> navigate(`/room-details/${room._id}`)}
        >
          <VisibilityOutlinedIcon fontSize="large" />
        </IconButton>

        <IconButton
          sx={{
            color: "#FFF",
            transition: "all 0.2s ease",
          }}
        >
          <FavoriteIcon fontSize="large" />
        </IconButton>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          bgcolor: "#FF498B",
          color: "#fff",
          px: 3,
          py: 1.5,
          borderBottomLeftRadius: "15px",
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          ${room.price} per night
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          px: 1.5,
          py: 1,
          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
        }}
      >
        <Typography variant="body1" sx={{ color: "#fff", fontWeight: 500 }}>
          Room {room.roomNumber}
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
          Capacity: {room.capacity}
        </Typography>
      </Box>
    </Box>
  );
}