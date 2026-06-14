import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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
  imgs?: FileList;
}

export default function RoomUpdate() {
  const { register, handleSubmit, control, reset } = useForm<RoomForm>({
    defaultValues: {
      roomNumber: "",
      price: "",
      discount: "",
      capacity: "",
      facilities: [],
    },
  });

  const [facilities, setFacilities] = useState<Facility[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  async function getFacilities() {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://upskilling-egypt.com:3000/api/v0/admin/room-facilities",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setFacilities(res.data.data.facilities);
  }

  async function getRoomData() {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `https://upskilling-egypt.com:3000/api/v0/admin/rooms/6a2ec2e8e7cc1f5aed4cb053`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const room = res.data.data.room;

    reset({
      roomNumber: room.roomNumber,
      price: room.price,
      discount: room.discount,
      capacity: room.capacity,
      facilities: room.facilities.map((f: any) => f._id),
    });
  }

  function appendFormData(data: RoomForm) {
    const formData = new FormData();

    formData.append("roomNumber", data.roomNumber);
    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("capacity", data.capacity);

    data.facilities.forEach((f) => {
      formData.append("facilities", f);
    });

    if (data.imgs) {
      Array.from(data.imgs).forEach((file) => {
        formData.append("imgs", file);
      });
    }

    return formData;
  }

  async function onSubmit(data: RoomForm) {
    const token = localStorage.getItem("token");

    await axios.put(
      `https://upskilling-egypt.com:3000/api/v0/admin/rooms/6a2ec2e8e7cc1f5aed4cb053`,
      appendFormData(data),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success("Room updated successfully");
    navigate("/dashboard/rooms");
  }

  useEffect(() => {
    getFacilities();
    getRoomData();
  }, []);

  return (
    <Box p={5}>
      <Paper sx={{ maxWidth: 800, mx: "auto", p: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth margin="normal" {...register("roomNumber")} />
          <TextField fullWidth margin="normal" {...register("price")} />
          <TextField fullWidth margin="normal" {...register("discount")} />
          <TextField fullWidth margin="normal" {...register("capacity")} />

          <Controller
            name="facilities"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <Select
                  multiple
                  value={field.value ?? []}
                  onChange={(e) =>
                    field.onChange(e.target.value as string[])
                  }
                  input={<OutlinedInput />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => {
                        const fac = facilities.find((f) => f._id === value);
                        return <Chip key={value} label={fac?.name || value} />;
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

          <Box
            mt={4}
            p={5}
            border="2px dashed #ccc"
            textAlign="center"
            sx={{ cursor: "pointer" }}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <CloudUploadOutlinedIcon sx={{ fontSize: 50, color: "#009247" }} />
            <Typography mt={2}>Upload images</Typography>

            <input id="fileInput" type="file" hidden multiple {...register("imgs")} />
          </Box>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }}>
            Update Room
          </Button>
        </form>
      </Paper>
    </Box>
  );
}