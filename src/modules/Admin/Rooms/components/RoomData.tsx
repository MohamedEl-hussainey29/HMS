
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  imgs: FileList;
}

export default function RoomData() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RoomForm>();

  const [facilities, setFacilities] = useState<Facility[]>([]);
  const navigate = useNavigate();

  async function getFacilities() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/admin/room-facilities",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
console.log(response.data.data.facilities);
      setFacilities(response.data.data.facilities);
    } catch (error) {
      console.log(error);
    }
  }

  function appendFormData(data: RoomForm) {
    const formData = new FormData();

    formData.append("roomNumber", data.roomNumber);
    formData.append("price", data.price);
    formData.append("capacity", data.capacity);
    formData.append("discount", data.discount);

    data.facilities.forEach((facility) => {
      formData.append("facilities", facility);
    });

    for (let i = 0; i < data.imgs.length; i++) {
      formData.append("imgs", data.imgs[i]);
    }

    return formData;
  }

  async function onSubmit(data: RoomForm) {
    try {
      const newData = appendFormData(data);

      const token = localStorage.getItem("token");

      await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/admin/rooms",
        newData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Room created successfully");
      navigate("/dashboard/rooms");
    } catch (error: any) {
      console.log(error.response?.data);
    }
  }

  useEffect(() => {
    getFacilities();
  }, []);

  return (
    <Box p={5}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 800,
          mx: "auto",
          p: 4,
          borderRadius: 3,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Room Number"
            margin="normal"
            {...register("roomNumber", {
              required: "Room Number is required",
            })}
            error={!!errors.roomNumber}
            helperText={errors.roomNumber?.message}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price"
                margin="normal"
                {...register("price", {
                  required: "Price is required",
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />

              <TextField
                fullWidth
                label="Discount"
                margin="normal"
                {...register("discount", {
                  required: "Discount is required",
                })}
                error={!!errors.discount}
                helperText={errors.discount?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Capacity"
                margin="normal"
                {...register("capacity", {
                  required: "Capacity is required",
                })}
                error={!!errors.capacity}
                helperText={errors.capacity?.message}
              />

              <Controller
                name="facilities"
                control={control}
                rules={{ required: "Facilities are required" }}
                render={({ field }) => (
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Facilities</InputLabel>

                    <Select
                      multiple
                      value={field.value || []}
                      onChange={(e) =>
                        field.onChange(e.target.value as string[])
                      }
                      input={<OutlinedInput label="Facilities" />}
                      renderValue={(selected) => (
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                          }}
                        >
                          {(selected as string[]).map((value) => {
                            const facility = facilities.find(
                              (f) => f._id === value
                            );

                            return (
                              <Chip
                                key={value}
                                label={facility?.name || value}
                              />
                            );
                          })}
                        </Box>
                      )}
                    >
                      {facilities.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>

          <Box
            mt={4}
            p={5}
            border="2px dashed #ccc"
            borderRadius={2}
            textAlign="center"
            sx={{ cursor: "pointer" }}
            onClick={() =>
              document.getElementById("fileInput")?.click()
            }
          >
            <CloudUploadOutlinedIcon
              sx={{ fontSize: 50, color: "#009247" }}
            />

            <Typography mt={2}>
              Drag & Drop or Choose Room Images to Upload
            </Typography>

            <input
              id="fileInput"
              type="file"
              hidden
              multiple
              {...register("imgs", {
                required: "Images are required",
              })}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{
              mt: 4,
              py: 1.5,
              fontWeight: "bold",
            }}
          >
            Save
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

