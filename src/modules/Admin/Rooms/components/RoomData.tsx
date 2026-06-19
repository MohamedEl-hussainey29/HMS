/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { useEffect, useState } from "react";
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

export default function RoomFormPage() {
  const { id } = useParams();
  const isEditMode = !!id;
  const [submitLoading , setSubmitLoading] = useState(false);

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

  const token = localStorage.getItem("token");

  // ---------------- FACILITIES ----------------
  async function getFacilities() {
    const res = await axios.get(
      "https://upskilling-egypt.com:3000/api/v0/admin/room-facilities",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setFacilities(res.data.data.facilities);
  }

  // ---------------- ROOM DATA (EDIT ONLY) ----------------
  async function getRoomData() {
    if (!id) return;

    const res = await axios.get(
      `https://upskilling-egypt.com:3000/api/v0/admin/rooms/${id}`,
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

  // ---------------- FORM DATA ----------------
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

  // ---------------- SUBMIT ----------------
  async function onSubmit(data: RoomForm) {
    setSubmitLoading(true);
    try {
      const formData = appendFormData(data);

      if (isEditMode) {
        await axios.put(
          `https://upskilling-egypt.com:3000/api/v0/admin/rooms/${id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Room updated successfully");
      } else {
        await axios.post(
          "https://upskilling-egypt.com:3000/api/v0/admin/rooms",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Room created successfully");
      }

      navigate("/dashboard/rooms");
    } catch (error: any) {
      console.log(error?.response?.data);
    }finally{
      setSubmitLoading(false);
    }
  }

  // ---------------- INIT ----------------
  useEffect(() => {
    getFacilities();
    if (isEditMode) getRoomData();
  }, [id]);

  return (
    <Box sx={{p: 5}}>
      <Paper sx={{ maxWidth: 800, mx: "auto", p: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            placeholder="Enter room number (e.g. 101)"
            {...register("roomNumber")}
          />

          <TextField
            fullWidth
            margin="normal"
            placeholder="Enter price"
            {...register("price")}
          />

          <TextField
            fullWidth
            margin="normal"
            placeholder="Enter discount"
            {...register("discount")}
          />

          <TextField
            fullWidth
            margin="normal"
            placeholder="Enter capacity (e.g. 2 persons)"
            {...register("capacity")}
          />

          {/* FACILITIES */}
          <Controller
            name="facilities"
            control={control}
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

          {/* UPLOAD */}
          <Box
            
            sx={{ cursor: "pointer" , mt: 4, p:5 , border: "2px dashed #ccc" , textAlign: "center" }}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <CloudUploadOutlinedIcon sx={{ fontSize: 50, color: "#009247" }} />
            <Typography sx={{mt:2}}>
              Drag & Drop or Click to Upload Images
            </Typography>

            <input
              id="fileInput"
              type="file"
              hidden
              multiple
              {...register("imgs")}
            />
          </Box>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }} disabled={submitLoading}>
            {submitLoading? 
              (
                <Box sx={{ display: 'flex' }}>
                <CircularProgress aria-label="Loading…" />
              </Box>
              )
            :
            isEditMode ? "Update Room" : "Create Room"
          }
            
          </Button>
        </form>
      </Paper>
    </Box>
  );
}