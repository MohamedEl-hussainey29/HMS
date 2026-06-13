import {
  CircularProgress,
  Dialog,
  styled,
  DialogTitle,
  IconButton,
  Box,
  Divider,
  TextField,
} from "@mui/material";
import type { Ad } from "./AdsList";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { AdsAPI, RoomsAPI } from "../../../../api";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import MenuItem from "@mui/material/MenuItem";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface CreateAdData {
  room: string;
  discount: number;
  isActive: boolean;
}

interface UpdateAdData {
  discount: number;
  isActive: boolean;
}

export interface AdFormValues {
  room: string;
  discount: number;
  isActive: boolean;
}

interface AdDataProps {
  open: boolean;
  handleClose: () => void;
  refetchData: () => void;
  ad: Ad | null;
}

interface Room {
  _id: string;
  roomNumber: string;
}

export default function AdsData({
  open,
  handleClose,
  refetchData,
  ad,
}: AdDataProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdFormValues>();

  const submitAd = async (data: AdFormValues) => {
    setSubmitLoading(true);
    try {
      let response;
      if (ad) {
        response = await AdsAPI.UpdateAd(ad._id, {
          discount: data.discount,
          isActive: data.isActive,
        });
      } else {
        response = await AdsAPI.createAd(data);
      }
      toast.success(response?.data?.message);
      refetchData();
      reset();
      handleClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    if (ad) {
      reset({
        room: ad.room._id,
        discount: ad.room.discount,
        isActive: ad.isActive,
      });
    } else {
      reset({
        room: "",
        discount: 0,
        isActive: false,
      });
    }
  }, [ad, reset]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await RoomsAPI.getAllRooms({
          page: 1,
          size: 100,
        });

        setRooms(response.data.data.rooms);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: { sx: { borderRadius: "16px" } },
        }}
      >
        <DialogTitle
          sx={{ p: 2, ml: 3, fontWeight: 700, color: "#494949" }}
          id="customized-dialog-title"
        >
          {ad ? "Edit Ad" : "Add Ad"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          size="small"
          sx={{
            mr: 3,
            position: "absolute",
            right: 20,
            top: 15,
            color: "red",
            border: "2px solid red",
            borderRadius: "50%",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Box
            component="form"
            id="ad-form"
            onSubmit={handleSubmit(submitAd)}
            sx={{ mx: 3 }}
          >
            {!ad && (
              <TextField
                select
                fullWidth
                label="Room"
                defaultValue=""
                sx={{
                  
                  backgroundColor: "#eaeaea",
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                error={!!errors.room}
                helperText={errors.room?.message}
                {...register("room", {
                  required: "Room is required",
                })}
              >
                {rooms.map((room) => (
                  <MenuItem key={room._id} value={room._id}>
                    {room.roomNumber}
                  </MenuItem>
                ))}
              </TextField>
            )}

            <TextField
              type="text"
              label="Discount"
              variant="outlined"
              fullWidth
              sx={{
                my: 3,
                backgroundColor: "#eaeaea",
                borderRadius: "5px",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              error={!!errors?.discount}
              helperText={errors?.discount?.message}
              {...register("discount", {
                required: "Discount is required!",
                valueAsNumber: true,
              })}
            />

            <Controller
              name="isActive"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <TextField
                  select
                  fullWidth
                  label="Status"
                  value={field.value ? "true" : "false"}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </TextField>
              )}
            />
          </Box>
        </DialogContent>
        <Divider sx={{ borderBottomWidth: 2 }} />
        <DialogActions
          sx={{ justifyContent: { xs: "space-evenly", md: "end" } }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{ my: 3, bgcolor: "#b4b4b4", textTransform: "capitalize" }}
            onClick={handleClose}
          >
            cancel
          </Button>
          <Button
            type="submit"
            form="ad-form"
            disabled={submitLoading}
            variant="contained"
            size="large"
            autoFocus
            sx={{
              my: 3,
              mr: 1,
              bgcolor: "#203FC7",
              textTransform: "capitalize",
            }}
          >
            {submitLoading ? (
              <CircularProgress size="30px" aria-label="saving" />
            ) : (
              "save"
            )}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
