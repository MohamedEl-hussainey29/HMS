/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
  InputLabel,
  CircularProgress,
  Skeleton,
  IconButton,
  Grid,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FacilitiesAPI, RoomsAPI } from "../../../../api";

interface Facility {
  _id: string;
  name: string;
}

interface RoomForm {
  roomNumber: string;
  price: string;
  discount: string;
  capacity: string;
  facilities: string[];
}

export default function RoomData() {
  const { id } = useParams();
  const isEditMode = !!id;

  const [submitLoading, setSubmitLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEditMode);
  const [facilities, setFacilities] = useState<Facility[]>([]);

  // existing images already saved on the room (edit mode only)
  const [existingImgs, setExistingImgs] = useState<string[]>([]);
  // newly selected files awaiting upload, with local object URLs for preview
  const [newImgPreviews, setNewImgPreviews] = useState<{ file: File; url: string }[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, control, reset } = useForm<RoomForm>({
    defaultValues: {
      roomNumber: "",
      price: "",
      discount: "",
      capacity: "",
      facilities: [],
    },
  });

  const navigate = useNavigate();

  // shared styling: no border, light gray fill, black placeholder
  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#F7F7F7",
      "& fieldset": { border: "none" },
      "&:hover fieldset": { border: "none" },
      "&.Mui-focused fieldset": { border: "none" },
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#000",
      opacity: 1,
    },
  };

  // ── FACILITIES ──────────────────────────────────────────────
  async function getFacilities() {
    const res = await FacilitiesAPI.getAllFacilities({ page: 1, size: 100 });
    setFacilities(res.data.data.facilities);
  }

  // ── ROOM DATA (edit only) ────────────────────────────────────
  async function getRoomData() {
    if (!id) return;
    setPageLoading(true);
    try {
      const res = await RoomsAPI.getRoomDetails(id);
      const room = res.data.data.room;
      // API field is "images", not "imgs"
      if (room.images?.length) setExistingImgs(room.images);
      reset({
        roomNumber: room.roomNumber,
        price: String(room.price),
        discount: String(room.discount),
        capacity: String(room.capacity),
        facilities: room.facilities.map((f: any) => f._id),
      });
    } finally {
      setPageLoading(false);
    }
  }

  // ── IMAGE SELECTION ──────────────────────────────────────────
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setNewImgPreviews((prev) => [...prev, ...previews]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeNewImage(index: number) {
    setNewImgPreviews((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  }

  function removeExistingImage(index: number) {
    setExistingImgs((prev) => prev.filter((_, i) => i !== index));
  }

  useEffect(() => {
    return () => {
      newImgPreviews.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, []);

  async function urlToFile(url: string): Promise<File> {
    let res: Response;
    try {
      res = await fetch(url);
    } catch {
      throw new Error(`Could not re-fetch existing image (network/CORS issue): ${url}`);
    }
    if (!res.ok) {
      throw new Error(`Could not re-fetch existing image (status ${res.status}): ${url}`);
    }
    const blob = await res.blob();
    const filename = url.split("/").pop() || "image.jpg";
    return new File([blob], filename, { type: blob.type || "image/jpeg" });
  }

  // ── BUILD FORM DATA ──────────────────────────────────────────
  async function buildFormData(data: RoomForm) {
    const formData = new FormData();

    formData.append("roomNumber", data.roomNumber);
    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("capacity", data.capacity);

    data.facilities.forEach((facility) => {
      formData.append("facilities", facility);
    });

    if (isEditMode && existingImgs.length) {
      const keptFiles = await Promise.all(existingImgs.map(urlToFile));
      keptFiles.forEach((file) => formData.append("imgs", file));
    }

    // newly selected files
    newImgPreviews.forEach(({ file }) => {
      formData.append("imgs", file);
    });

    return formData;
  }

  async function onSubmit(data: RoomForm) {
    setSubmitLoading(true);
    try {
      const formData = await buildFormData(data);
      if (isEditMode) {
        await RoomsAPI.UpdateRoom(formData, id);
        toast.success("Room updated successfully");
      } else {
        await RoomsAPI.createRoom(formData);
        toast.success("Room created successfully");
      }
      navigate("/dashboard/rooms");
    } catch (error: any) {
      if (error instanceof Error && error.message.startsWith("Could not re-fetch existing image")) {
        console.error(error.message);
        toast.error("Couldn't reload one of the existing images. Please try again or remove it.");
      } else {
        console.error(error?.response?.data);
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitLoading(false);
    }
  }

  useEffect(() => {
    getFacilities();
    if (isEditMode) getRoomData();
  }, [id]);

  const allPreviews = [
    ...existingImgs.map((url) => ({ url, isNew: false })),
    ...newImgPreviews.map(({ url }) => ({ url, isNew: true })),
  ];

  return (
    <Box sx={{ p: 5 }}>
      <Paper sx={{ maxWidth: 800, mx: "auto", p: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 2 }}>
            {pageLoading ? (
              <Skeleton sx={{ py: 3 }} />
            ) : (
              <TextField fullWidth placeholder="Room Number" sx={fieldSx} {...register("roomNumber")} />
            )}
          </Box>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              {pageLoading ? (
                <Skeleton sx={{ py: 3 }} />
              ) : (
                <TextField fullWidth placeholder="Price" sx={fieldSx} {...register("price")} />
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              {pageLoading ? (
                <Skeleton sx={{ py: 3 }} />
              ) : (
                <TextField fullWidth placeholder="Capacity" sx={fieldSx} {...register("capacity")} />
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              {pageLoading ? (
                <Skeleton sx={{ py: 3 }} />
              ) : (
                <TextField fullWidth placeholder="Discount" sx={fieldSx} {...register("discount")} />
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              {pageLoading ? (
                <Skeleton sx={{ py: 3 }} />
              ) : (
                <Controller
                  name="facilities"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth sx={fieldSx}>
                      <InputLabel>Facilities</InputLabel>
                      <Select
                        multiple
                        value={field.value || []}
                        onChange={(e) => field.onChange(e.target.value as string[])}
                        input={<OutlinedInput label="Facilities" />}
                        renderValue={(selected) => (
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {(selected as string[]).map((value) => {
                              const fac = facilities.find((f) => f._id === value);
                              return <Chip key={value} label={fac?.name || value} size="small" />;
                            })}
                          </Box>
                        )}
                      >
                        {facilities.map((f) => (
                          <MenuItem key={f._id} value={f._id}>
                            {f.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              )}
            </Grid>
          </Grid>

          {pageLoading ? (
            <Skeleton variant="rounded" height={140} sx={{ borderRadius: 2 }} />
          ) : (
            <Box
              sx={{
                cursor: "pointer",
                p: 4,
                border: "2px dashed #203FC7",
                borderRadius: 2,
                textAlign: "center",
                backgroundColor: "#e5f5fb",
                transition: "background-color 0.2s",
                "&:hover": { backgroundColor: "#b1e8fd" },
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <CloudUploadOutlinedIcon sx={{ fontSize: 40, color: "#203FC7" }} />
              <Typography sx={{ mt: 1, color: "#555" }}>
                Drag & Drop or{" "}
                <Box component="span" sx={{ color: "#203FC7", fontWeight: 500, textDecoration: "underline" }}>
                  Choose Room Images
                </Box>{" "}
                to Upload
              </Typography>
              <input
                ref={fileInputRef}
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </Box>
          )}

          {!pageLoading && allPreviews.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" sx={{ color: "#888", mb: 1, display: "block" }}>
                {newImgPreviews.length > 0
                  ? `${newImgPreviews.length} new image(s) selected · ${existingImgs.length} existing`
                  : `${existingImgs.length} existing image(s)`}
              </Typography>

              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                {allPreviews.map(({ url, isNew }, i) => (
                  <Box key={`${isNew ? "new" : "existing"}-${i}`} sx={{ position: "relative", width: 90, height: 90 }}>
                    <Box
                      component="img"
                      src={url}
                      alt={`img-${i}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 1.5,
                        border: isNew ? "2px solid #009247" : "1px solid #d0e8d8",
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() =>
                        isNew
                          ? removeNewImage(newImgPreviews.findIndex((p) => p.url === url))
                          : removeExistingImage(existingImgs.indexOf(url))
                      }
                      sx={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        bgcolor: "white",
                        border: "1px solid #ccc",
                        width: 22,
                        height: 22,
                        "&:hover": { bgcolor: "#fee2e2" },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 13 }} />
                    </IconButton>
                    {isNew && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          bgcolor: "rgba(0,146,71,0.75)",
                          color: "white",
                          fontSize: 10,
                          textAlign: "center",
                          borderRadius: "0 0 6px 6px",
                          py: 0.2,
                        }}
                      >
                        New
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              py: 1.5,
              bgcolor: "#203FC7",
              fontWeight: 600,
              fontSize: "1rem",
            }}
            disabled={submitLoading || pageLoading}
          >
            {submitLoading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} aria-label="Loading…" />
            ) : isEditMode ? (
              "Update Room"
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
