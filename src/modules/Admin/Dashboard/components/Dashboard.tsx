import { Grid } from "@mui/material";
import Banner from "../../../Shared/Banner/Banner";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DomainIcon from "@mui/icons-material/Domain";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ChartsAPI } from "../../../../api";
import { toast } from "react-toastify";

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

export default function Dashboard() {
  const [chartData, setChartData] = useState<ChartsData>({
    rooms: 0,
    facilities: 0,
    bookings: {
      pending: 0,
      completed: 0,
    },
    ads: 0,
    users: {
      user: 0,
      admin: 0,
    },
  });

  const usersData = {
    labels: ["user", "admin"],
    datasets: [
      {
        label: '#',
        data: [chartData.users.user, chartData.users.admin],
        backgroundColor: ["rgba(84, 209, 77, 1)", "rgba(53, 194, 253, 1)"],
        borderColor: ["rgb(90, 223, 83)", "rgb(98, 193, 234)"],
        borderWidth: 1,
      },
    ],
  };
  // const usersOptions = {
  //   responsive: true,
  //   cutout: "90%",
  //   plugins: {
  //     legend: {
  //       display: true,
  //     },
  //   },
  // };

  const roomsData = {
    labels: [
      "rooms",
      "facilities",
      "Booking-pending",
      "Booking-completed",
      "ads",
    ],
    datasets: [
      {
        label: "#",
        data: [
          chartData.rooms,
          chartData.facilities,
          chartData.bookings.pending,
          chartData.bookings.completed,
          chartData.ads,
        ],
        backgroundColor: [
          "#EF4444",
          "#3DBE29",
          "#3D5AFE",
          "#8B5CF6",
          "#F59E0B",
        ],
        borderColor: ["#f87f7f", "#5ad847", "#586ff0", "#a886f8", "#f7b84b"],
        borderWidth: 1,
      },
    ],
  };

  const getChartsInfo = async () => {
    try {
      const response = await ChartsAPI.charts();
      setChartData(response.data.data);
    } catch (error) {
      toast.error("failed to fetch chart info");
    }
  };

  useEffect(() => {
    getChartsInfo();
  }, []);
  return (
    <>
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

      <Grid
        container
        sx={{ display: "flex", justifyContent: 'space-evenly', mt: 5 }}
      >
        <Grid size={6} sx={{ width: "400px" }}>
          <Doughnut data={roomsData} />
        </Grid>

        <Grid size={6} sx={{ width: "390px" }}>
          <Doughnut data={usersData}/>
        </Grid>
      </Grid>
    </>
  );
}
