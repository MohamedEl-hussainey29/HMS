/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
import noImage from "../../../assets/images/Screenshot 2026-06-17 024622.png";
import { toast } from "react-toastify";
import { favsAPI } from "../../../api";
import { useFavorites } from "../../../context/FavoritesContext";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import AuthRequiredDialog from "../AuthRequiredDialog/AuthRequiredDialog";

export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  images: string[];
  facilities?: { _id: string; name: string }[];
  createdBy?: { _id: string; userName: string };
  createdAt?: string;
  updatedAt?: string;
}

interface RoomCardProps {
  room: Room;
  height?: number | string;
  showDiscount?: boolean;
}

export default function RoomCard({ room, height = 220, showDiscount = false }: RoomCardProps) {
  const navigate = useNavigate();
  const { userData }: any = useContext(AuthContext);
  const { isFavorite, toggleFavorite, refetchFavorites } = useFavorites();
  const localIsFav = isFavorite(room._id);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!room?._id) return;

    if (!userData) {
      setAuthDialogOpen(true);
      return;
    }

    const previousState = localIsFav;
    const nextState = !previousState;

    toggleFavorite(room._id, nextState);

    try {
      if (previousState) {
        await favsAPI.deleteFromFavorites(room._id, room._id);
        toast.success("Removed from favorites");
      } else {
        await favsAPI.addToFavorites(room._id);
        toast.success("Added to favorites! ❤️");
      }
      refetchFavorites();
    } catch (err: any) {
      toggleFavorite(room._id, previousState); 
      toast.error(err.response?.data?.message || "Connection error, try again");
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        height: "100%",
        "&:hover .hover-overlay": { opacity: 1 },
      }}
    >
      <Box
        component="img"
        src={room.images && room.images.length !== 0 ? room.images[0] : noImage}
        alt={`Room ${room.roomNumber}`}
        sx={{ width: "100%", height, objectFit: "cover", display: "block" }}
      />

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
        <IconButton sx={{ color: "#FFF" }} onClick={() => navigate(`/room-details/${room._id}`)}>
          <VisibilityOutlinedIcon fontSize="large" />
        </IconButton>

        <IconButton
          sx={{ color: localIsFav ? "#FF498B" : "#FFF", transition: "all 0.2s ease" }}
          onClick={handleFavoriteClick}
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
          width: "50%",
          display: "flex",
          justifyContent: "center",
          py: 1.5,
          borderBottomLeftRadius: "15px",
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {showDiscount ? `${room.discount}% Off` : `$${room.price} per night`}
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
      <AuthRequiredDialog
        open={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        action="add rooms to favorites"
      />
    </Box>
  );
}