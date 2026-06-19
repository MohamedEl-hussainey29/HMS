/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { Box, Card, CircularProgress, circularProgressClasses, Grid, Typography } from "@mui/material";
import Banner from "../../../Shared/Banner/Banner";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DomainIcon from "@mui/icons-material/Domain";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ChartsAPI } from "../../../../api";
import { toast } from "react-toastify";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartsData {
  rooms: number;
  facilities: number;
  bookings: {
    pending: number;
    completed: number;
  };
  ads: number;
  users: {
    user: number;
    admin: number;
  };
}

const bookingLegendItems = [
  { label: "pending", color: "#3D5AFE" },
  { label: "completed", color: "#8B5CF6" },
];

const userLegendItems = [
  { label: "User", color: "#54D14D" },
  { label: "Admin", color: "#35C2FD" },
];

export default function Dashboard() {
  const [chartsLoading, setChartsLoading] = useState(false);
  const [chartData, setChartData] = useState<ChartsData>({
    rooms: 0,
    facilities: 0,
    bookings: { pending: 0, completed: 0 },
    ads: 0,
    users: { user: 0, admin: 0 },
  });

  const bookingsData = {
    labels: ["pending", "completed"],
    datasets: [
      {
        label: "#",
        data: [chartData.bookings.pending, chartData.bookings.completed],
        backgroundColor: ["#3D5AFE", "#8B5CF6"],
        borderColor: ["#3D5AFE", "#8B5CF6"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const bookingsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed}`}
      },
    },
  };

  const usersData = {
    labels: ["User", "Admin"],
    datasets: [
      {
        label: "#",
        data: [chartData.users.user, chartData.users.admin],
        backgroundColor: ["#54D14D", "#35C2FD"],
        borderColor: ["#54D14D", "#35C2FD"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const usersOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed}`}
      },
    },
  };

  const getChartsInfo = async () => {
    setChartsLoading(true);
    try {
      const response = await ChartsAPI.charts();
      setChartData(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    } finally {
      setChartsLoading(false);
    }
  };

  useEffect(() => {
    getChartsInfo();
  }, []);

  //still loading cards and charts data
  if (chartsLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height:'100vh' }}>
        <CircularProgress
          variant="indeterminate"
          disableShrink
          enableTrackSlot
          sx={(theme) => ({
            color: "#1a90ff",
            animationDuration: "550ms",
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
            [`& .${circularProgressClasses.track}`]: {
              opacity: 1,
              stroke: (theme.vars || theme).palette.grey[200],
              ...theme.applyStyles("dark", {
                stroke: (theme.vars || theme).palette.grey[800],
              }),
            },
            ...theme.applyStyles("dark", {
              color: "#308fe8",
            }),
          })}
          size={40}
          thickness={4}
          aria-label="Loading…"
        />
      </Box>
    );
  }

  return (
    <>
      {/* ── Stat Cards ── */}
      <Grid
        container
        sx={{ display: "flex", gap: 5, justifyContent: "space-evenly", mt: 5 }}
      >
        <Grid>
          <Banner
            value={chartData.rooms}
            title="Rooms"
            icon={<DashboardIcon sx={{ color: "#203FC7" }} />}
          />
        </Grid>
        <Grid>
          <Banner
            value={chartData.facilities}
            title="Facilities"
            icon={<DomainIcon sx={{ color: "#203FC7" }} />}
          />
        </Grid>
        <Grid>
          <Banner
            value={chartData.ads}
            title="Ads"
            icon={<CalendarMonthIcon sx={{ color: "#203FC7" }} />}
          />
        </Grid>
      </Grid>

      {/* ── Charts ── */}
      <Grid
        container
        sx={{ mt: 10, mb: 5, justifyContent: "end", alignItems: "center" }}
      >
        {/* Bookings chart */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" }, mb: {xs: 3 , md: 0} }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Box sx={{ position: "relative", width: 220, height: 220, flexShrink: 0 }}>
              <Doughnut data={bookingsData} options={bookingsOptions} />
              <Typography
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "text.secondary",
                  pointerEvents: "none",
                }}
              >
                Bookings
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {bookingLegendItems.map((item) => (
                <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 1 }} >
                  <Box sx={{width: 12,height: 12,borderRadius: "3px",bgcolor: item.color,flexShrink: 0}}/>
                  <Typography variant="body2" sx={{ color: "#77838F" }}>{item.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Users Card */}
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}
        >
          <Card
            elevation={0}
            sx={{p: 2.5, borderRadius: 3, border: "0.5px solid", borderColor: "divider", width: "100%", maxWidth: 360}}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Box sx={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
                <Doughnut data={usersData} options={usersOptions} />
                <Typography
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "text.secondary",
                    pointerEvents: "none",
                  }}
                >
                  Users
                </Typography>
              </Box>

              {/* User / Admin rows */}
              <Box sx={{ flex: 1 }}>
                {userLegendItems.map((item, idx) => (
                  <Box
                    key={item.label}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      py: 1,
                      borderBottom: idx < userLegendItems.length - 1 ? "0.5px solid" : "none",
                      borderColor: "divider",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: item.color, }} />
                      <Typography variant="body2">{item.label}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.label === "User" ? chartData.users.user : chartData.users.admin}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
