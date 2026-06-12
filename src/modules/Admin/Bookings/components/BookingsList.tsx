import { useCallback, useState } from "react";
import { BookingsAPI } from "../../../../api";
import useGetData from "../../../../hooks/useGetData";
import { toast } from "react-toastify";
import axios from "axios";
import type { TableColumn } from "../../../Shared/DataTable/DataTable";
import RowActions from "../../../Shared/RowActions/RowActions";
import { Box, Chip, Grid, Typography } from "@mui/material";
import Filters from "../../../Shared/Filters/Filters";
import DataTable from "../../../Shared/DataTable/DataTable";
import DeleteConfirmation from "../../../Shared/DeleteConfirmation/DeleteConfirmation";
import ViewDetails from "../../../Shared/ViewDetails/ViewDetails";

export interface Booking {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: {
      _id: string;
      userName: string
  },
  room: {
      _id: string;
      roomNumber: string
  },
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface BookingsResponse {
  data: {
    booking: Booking[];
    totalCount: number;
  };
}

export default function BookingsList() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [deleteLoading , setDeleteLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);

  const handleOpenDelete = (booking: Booking) => {
    setSelectedBooking(booking);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const fetchBookings = useCallback(() => {
    return BookingsAPI.getAllBookings({
      page: page + 1,
      size: rowsPerPage,
    });
  }, [page, rowsPerPage]);

  const { data, isLoading, error , refetch } = useGetData<BookingsResponse>(
    fetchBookings,
    [page, rowsPerPage],
  );

  const handleChangePage = (_: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setRowsPerPage(Number(event.target.value));
      setPage(0);
    };
  
    const handleViewBooking = (booking: Booking) => {
      setSelectedBooking(booking);
      setOpenView(true);
    };

    const handleDeleteBooking = async(id: string) => {
    setDeleteLoading(true);
    try {
      await BookingsAPI.DeleteBooking(id);
      toast.success("Booking is deleted successfully");
      refetch();
      handleCloseDelete();
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message);
          }
    }finally{
      setDeleteLoading(false);
    }
  };

  const columns: TableColumn<Booking>[] = [
      {
        id: "roomNumber",
        label: "Room Number",
        render: (booking) => booking.room?.roomNumber ?? "N/A",
      },
      {
        id: "status",
        label: "Status",
        align: "center",
        render: (booking) => (
          <Chip
            label={booking.status}
            size="small"
            sx={{
              fontWeight: 600,
              bgcolor: booking.status === "completed" ? "#E8F5E9" : "#FFF3E0",
              color: booking.status === "completed" ? "#2E7D32" : "#ED6C02",
            }}
          />
        ),
      },
      {
        id: "price",
        label: "Price ($)",
        align: "center",
        render: (booking) => booking.totalPrice,
      },
      {
        id: "startDate",
        label: "Start Date",
        align: "center",
        render: (booking) => new Date(booking.startDate).toLocaleDateString(),
      },
      {
        id: "endDate",
        label: "End Date",
        align: "center",
        render: (booking) => new Date(booking.endDate).toLocaleDateString(),
      },
      {
        id: "options",
        label: "",
        align: "center",
        render: (booking) => (
          <RowActions
            showView
            showDelete
            onView={() => handleViewBooking(booking)}
            onDelete={() => handleOpenDelete(booking)}
          />
        ),
      },
    ];

  return (
    <>
      <Box sx={{ width: "100%", mt: 2 }}>
        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6">Bookings Table Details</Typography>
              <Typography color="text.secondary">You can check all details</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 2 }}>
        <Filters showSearch />
      </Box>

      {/* Error */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Table */}
      <DataTable
        columns={columns}
        rows={data?.data?.booking ?? []}
        count={data?.data?.totalCount ?? 0}
        page={page}
        rowsPerPage={rowsPerPage}
        loading={isLoading}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <DeleteConfirmation 
        isLoading={deleteLoading} 
        open={openDelete} 
        handleClose={handleCloseDelete} 
        onDelete={handleDeleteBooking}
        item="Booking"
        itemData={selectedBooking}
      />

      <ViewDetails
        open={openView}
        handleClose={() => setOpenView(false)}
        title="Booking Details"
        fields={[
          {
            label: "Booking ID",
            value: selectedBooking?._id,
          },
          {
            label: "Room Number",
            value: selectedBooking?.room?.roomNumber,
          },
          {
            label: "Room ID",
            value: selectedBooking?.room?._id,
          },
          {
            label: "Status",
            value:
              selectedBooking?.status,
          },
          {
            label: "Price ($)",
            value:
              selectedBooking?.totalPrice,
          },
          {
            label: "Start Date",
            value: selectedBooking?.startDate
              ? new Date(selectedBooking.startDate).toLocaleDateString(): "",
          },
          {
            label: "End Date",
            value: selectedBooking?.endDate
              ? new Date(selectedBooking.endDate).toLocaleDateString(): "",
          }
        ]}
      />
    </>
  )
}
