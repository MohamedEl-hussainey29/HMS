/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Grid, IconButton, InputLabel, TextField, Typography, Divider, CircularProgress } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import headerImg from "../../../../assets/images/banner.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRooms } from "../../../../context/RoomsContext";

export interface HeaderForm {
  startDate: string;
  endDate: string;
  capacity: number;
}

export default function Header() {
  const navigate = useNavigate();
  const { fetchRooms } = useRooms()

  const [capacity, setCapacity] = useState(2);
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  });
  const [submitLoading , setSubmitLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<HeaderForm>();

  // Extract onChange from each register call to merge manually
  const { onChange: onStartDateChange, ...startDateRest } = register("startDate", { required: "Start Date is required!" });
  const { onChange: onEndDateChange, ...endDateRest } = register("endDate", { required: "End Date is required!" });
  const { onChange: onCapacityChange, ...capacityRest } = register("capacity", { required: "Capacity is required!" });

  const updateCapacity = (newValue: number) => {
    const clamped = Math.max(1, newValue);
    setCapacity(clamped);
    // Manually notify RHF with a synthetic event
    onCapacityChange({ target: { name: "capacity", value: clamped } } as any);
  };

  const onSubmit = async(data: HeaderForm) => {
    setSubmitLoading(true)
    try {
      await fetchRooms({startDate: data.startDate,endDate: data.endDate,capacity: data.capacity});
      navigate("/explore-rooms");
    } catch (error) {
      console.log(error)
    }finally{
      setSubmitLoading(false)
    }
  };

  return (
    <Box sx={{mb: 5}}>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: { xs: "wrap", md: "nowrap" },
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* Left Side */}
        <Grid size={{ xs: 12, md: 4 }} sx={{ flexShrink: 0 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#152C5B",
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.6rem" },
              lineHeight: 1.2,
              mb: 1.5,
            }}
          >
            Forget Busy Work,<br />Start Next Vacation
          </Typography>

          <Typography
            sx={{
              color: "#B0B0B0",
              fontSize: { xs: "0.875rem", md: "0.95rem" },
              lineHeight: 1.7,
              mb: 4,
              maxWidth: 360,
            }}
          >
            We provide what you need to enjoy your holiday with family. Time to
            make another memorable moments.
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#14183E", mb: 1.5 }}>
              Start Booking
            </Typography>

            {/* Pick a Date */}
            <InputLabel sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#14183E", mb: 0.75 }}>
              Pick a Date
            </InputLabel>
            <Box
              sx={{
                display: "flex",
                alignItems: "stretch",
                border: "1px solid #E5E5E5",
                borderRadius: "8px",
                overflow: "hidden",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  bgcolor: "#3252DF",
                  px: 1.8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <CalendarMonthIcon sx={{ color: "#fff", fontSize: "1.4rem" }} />
              </Box>
              {/* startDate */}
              <TextField
                type="date"
                value={startDate}
                variant="standard"
                slotProps={{ input: { disableUnderline: true } }}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  "& input": {
                    px: 1.5,
                    py: 1.3,
                    fontSize: { xs: "0.78rem", md: "0.88rem" },
                    color: "#14183E",
                    width: "100%",
                  },
                }}
                error={!!errors?.startDate}
                helperText={errors?.startDate?.message}
                {...startDateRest}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  onStartDateChange(e);
                }}
              />

              <Divider orientation="vertical" variant="middle" flexItem />
              {/* endDate */}
              <TextField
                type="date"
                value={endDate}
                variant="standard"
                slotProps={{ input: { disableUnderline: true } }}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  "& input": {
                    px: 1.5,
                    py: 1.3,
                    fontSize: { xs: "0.78rem", md: "0.88rem" },
                    color: "#14183E",
                    width: "100%",
                  },
                }}
                error={!!errors?.endDate}
                helperText={errors?.endDate?.message}
                {...endDateRest}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  onEndDateChange(e);
                }}
              />
            </Box>

            {/* Capacity */}
            <InputLabel
              htmlFor="capacity"
              sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#14183E", mb: 0.75 }}
            >
              Capacity
            </InputLabel>
            <Box
              sx={{
                display: "flex",
                alignItems: "stretch",
                border: "1px solid #E5E5E5",
                borderRadius: "8px",
                overflow: "hidden",
                mb: 3,
              }}
            >
              <IconButton
                onClick={() => updateCapacity(capacity - 1)}
                sx={{
                  bgcolor: "#E74C3C",
                  borderRadius: 0,
                  px: 2,
                  py: 1,
                  "&:hover": { bgcolor: "#d94f4f" },
                }}
              >
                <RemoveIcon sx={{ color: "#fff", fontSize: "1.1rem" }} />
              </IconButton>

              <TextField
                id="capacity"
                type="number"
                value={capacity}
                variant="standard"
                slotProps={{
                  input: { disableUnderline: true },
                  htmlInput: { min: 1, style: { textAlign: "center" } },
                }}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  "& input": {
                    py: 1.3,
                    fontSize: "0.88rem",
                    color: "#14183E",
                    textAlign: "center",
                  },
                  "& input[type=number]::-webkit-outer-spin-button": { display: "none" },
                  "& input[type=number]::-webkit-inner-spin-button": { display: "none" },
                  "& input[type=number]": { MozAppearance: "textfield" },
                }}
                error={!!errors?.capacity}
                helperText={errors?.capacity?.message}
                {...capacityRest}
                onChange={(e) => {
                  setCapacity(Math.max(1, Number(e.target.value)));
                  onCapacityChange(e);
                }}
              />

              <IconButton
                onClick={() => updateCapacity(capacity + 1)}
                sx={{
                  bgcolor: "#1ABC9C",
                  borderRadius: 0,
                  px: 2,
                  py: 1,
                  "&:hover": { bgcolor: "#36b560" },
                }}
              >
                <AddIcon sx={{ color: "#fff", fontSize: "1.1rem" }} />
              </IconButton>
            </Box>
            <Button
              type="submit"
              variant="contained"
              disabled={submitLoading}
              sx={{
                bgcolor: "#3252DF",
                textTransform: "capitalize",
                borderRadius: "8px",
                mt: 2,
                px: 10,
                py: 1,
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: "none",
                width: { xs: "100%", sm: "auto" },
                "&:hover": { bgcolor: "#2641c0" },
                "&.Mui-disabled": {
                  bgcolor: "#3252DF",
                  color: "#fff",
                },
              }}
            >
              {submitLoading ? 
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress aria-label="Loading…" size="30px" sx={{color:'#FFF', mr: 1}}/> exploring...
                </Box>
                : "explore"
              }
            </Button>
          </Box>
        </Grid>

        {/* Right Side – Image */}
        <Grid size={{ xs: 12, md: 4 }} sx={{ display: { xs: "flex", md: "block" }, justifyContent: "center" }}>
          <Box
            component="img"
            src={headerImg}
            alt="header image"
            sx={{height: { xs: "260px", sm: "340px", md: "460px" },objectFit: "cover"}}
          />
        </Grid>
      </Grid>
    </Box>
  );
}