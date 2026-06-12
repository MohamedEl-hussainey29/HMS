import { useCallback, useState } from "react";
import { RoomsAPI } from "../../../../api";
import useGetData from "../../../../hooks/useGetData";
import { toast } from "react-toastify";
import axios from "axios";
import type { TableColumn } from "../../../Shared/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import RowActions from "../../../Shared/RowActions/RowActions";
import { Box, Button, Grid, Typography } from "@mui/material";
import Filters from "../../../Shared/Filters/Filters";
import DataTable from "../../../Shared/DataTable/DataTable";
import DeleteConfirmation from "../../../Shared/DeleteConfirmation/DeleteConfirmation";
import ViewDetails from "../../../Shared/ViewDetails/ViewDetails";

export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities:[{
    _id: string;
    name: string;
  }];
  createdBy: {
    _id: string;
    userName: string;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface RoomsResponse {
  data: {
    rooms: Room[];
    totalCount: number;
  };
}

export default function RoomsList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [deleteLoading , setDeleteLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);

  const handleOpenDelete = (room: Room) => {
    setSelectedRoom(room);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const fetchRooms = useCallback(() => {
    return RoomsAPI.getAllRooms({
      page: page + 1,
      size: rowsPerPage,
    });
  }, [page, rowsPerPage]);

  const { data, isLoading, error , refetch } = useGetData<RoomsResponse>(
    fetchRooms,
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

  const handleViewRoom = (room: Room) => {
    setSelectedRoom(room);
    setOpenView(true);
  };

  const handleEditRoom = (room: Room) => {
    navigate(`/dashboard/room-data/${room._id}`)
  };

  const handleDeleteRoom = async(id: string) => {
      setDeleteLoading(true);
      try {
        await RoomsAPI.DeleteRoom(id);
        toast.success("Room is deleted successfully");
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

    const columns: TableColumn<Room>[] = [
        {
          id: "roomNumber",
          label: "Room Number",
          render: (room) => room.roomNumber,
        },
        {
          id: "images",
          label: "Image",
          align: "center",
          render: (room) =>
            room.images?.[0] ? (
              <Box
                component="img"
                src={room.images[0]}
                alt={room.roomNumber}
                sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: "8px" }}
              />
            ) : (
              "N/A"
            ),
        },
        {
          id: "price",
          label: "Price ($)",
          align: "center",
          render: (room) => room.price,
        },
        {
          id: "discount",
          label: "Discount (%)",
          align: "center",
          render: (room) => room.discount,
        },
        {
          id: "facilities",
          label: "Facilities",
          align: "center",
          render: (room) => room.facilities?.[0]?.name ?? "N/A"
        },
        {
          id: "updatedAt",
          label: "Modification Date",
          align: "center",
          render: (room) => new Date(room.updatedAt).toLocaleDateString(),
        },
        {
          id: "options",
          label: "",
          align: "center",
          render: (room) => (
            <RowActions
              showView
              showEdit
              showDelete
              onView={() => handleViewRoom(room)}
              onEdit={() => handleEditRoom(room)}
              onDelete={() => handleOpenDelete(room)}
            />
          ),
        },
      ];


  return (
    <>
      <Box sx={{ width: "100%", mt: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6">Rooms Table Details</Typography>
              <Typography color="text.secondary">You can check all details</Typography>
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{display: "flex", justifyContent: {xs: "stretch",md: "flex-end"}}}
            >
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{maxWidth: { md: 220 },bgcolor: "#203FC7",textTransform: "capitalize"}}
                onClick={()=>navigate("/dashboard/room-data")}
              >
                Add New Room
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* Filters */}
      <Box sx={{ mb: 2 }}>
        <Filters showSearch showFacility />
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
        rows={data?.data?.rooms ?? []}
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
        onDelete={handleDeleteRoom}
        item="Room"
        itemData={selectedRoom}
      />

      <ViewDetails
        open={openView}
        handleClose={() => setOpenView(false)}
        title="Room Details"
        fields={[
          {
            label: "Name",
            value: selectedRoom?.roomNumber,
          },
          {
            label: "ID",
            value: selectedRoom?._id,
          },
          {
            label: "Images",
            images: selectedRoom?.images ?? [],
          },
          {
            label: "Facilities",
            list: selectedRoom?.facilities?.map((f) => f.name) ?? [],
          },
          {
            label: "Capacity",
            value: selectedRoom?.capacity,
          },
          {
            label: "Price ($)",
            value: selectedRoom?.price,
          },
          {
            label: "Discount (%)",
            value: selectedRoom?.discount,
          },
          {
            label: "Created By (UserName)",
            value:
              selectedRoom?.createdBy?.userName,
          },
          {
            label: "Created By (ID)",
            value:
              selectedRoom?.createdBy?._id,
          },
          {
            label: "Created At",
            value: selectedRoom?.createdAt
              ? new Date(
                  selectedRoom.createdAt
                ).toLocaleDateString()
              : "",
          },
          {
            label: "Modified At",
            value: selectedRoom?.updatedAt
              ? new Date(
                  selectedRoom.updatedAt
                ).toLocaleDateString()
              : "",
          },
        ]}
      />
    </>
  )
}
