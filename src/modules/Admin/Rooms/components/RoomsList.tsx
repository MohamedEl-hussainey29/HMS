/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import { FacilitiesAPI, RoomsAPI } from "../../../../api";
import useGetData from "../../../../hooks/useGetData";
import { toast } from "react-toastify";
import axios from "axios";
import type { AxiosResponse } from "axios";
import type { TableColumn } from "../../../Shared/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import RowActions from "../../../Shared/RowActions/RowActions";
import { Box, Button, Grid, Typography } from "@mui/material";
import Filters from "../../../Shared/Filters/Filters";
import DataTable from "../../../Shared/DataTable/DataTable";
import DeleteConfirmation from "../../../Shared/DeleteConfirmation/DeleteConfirmation";
import ViewDetails from "../../../Shared/ViewDetails/ViewDetails";
import useFilters from "../../../../hooks/useFilters";
import { DataFilter } from "../../../../context/FiltersContext";
import type { FacilitiesResponse } from "../../Facilities/components/FacilitiesList";

export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: { _id: string; name: string }[];
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
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);

  const { search, facility } = DataFilter();
  const ActiveFilters = !!(search || facility);

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

  const { data: rooms, isLoading, error, refetch } = useGetData<RoomsResponse>(
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
    navigate(`/dashboard/room-data/${room._id}`);
  };

  const handleDeleteRoom = async (id: string) => {
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
    } finally {
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
      render: (room) => room.facilities?.[0]?.name ?? "N/A",
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

  const fetchFacilities = useCallback(() => {
    return FacilitiesAPI.getAllFacilities({
      page: 1,
      size: 100,
    });
  }, []);

  const {data: facilitiesFilter} = useGetData<FacilitiesResponse>(fetchFacilities, []);

  // Full fetch (all rooms) used only when filters are active
  const fetchAllRooms = useCallback((): Promise<AxiosResponse<RoomsResponse>> => {
    if (!ActiveFilters) {
      return Promise.resolve({
        data: { data: { rooms: [], totalCount: 0 } },
      } as unknown as AxiosResponse<RoomsResponse>);
    }
    return RoomsAPI.getAllRooms({
      page: 1,
      size: rooms?.data?.totalCount || 1000,
    });
  }, [ActiveFilters, rooms?.data?.totalCount]);

  const { data: allData, isLoading: filterLoading } = useGetData<RoomsResponse>(
    fetchAllRooms,
    [ActiveFilters, rooms?.data?.totalCount, search, facility],
  );

  const filteredRooms = useFilters(allData?.data?.rooms ?? [], {
    searchFields: (room) => [room.roomNumber],
    facilityField: (room) => room.facilities?.map((f) => f.name) ?? [],
  });

  useEffect(() => {
    setPage(0);
  }, [search, facility]);

  const paginatedFiltered = filteredRooms.slice(
    page * rowsPerPage, //start
    page * rowsPerPage + rowsPerPage, //end
  );

  const rows = ActiveFilters ? paginatedFiltered : rooms?.data?.rooms ?? [];
  const count = ActiveFilters ? filteredRooms.length : rooms?.data?.totalCount ?? 0;
  const loading = ActiveFilters ? filterLoading : isLoading;

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
              sx={{ display: "flex", justifyContent: { xs: "stretch", md: "flex-end" } }}
            >
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ maxWidth: { md: 220 }, bgcolor: "#203FC7", textTransform: "capitalize" }}
                onClick={() => navigate("/dashboard/room-data")}
              >
                Add New Room
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 2 }}>
        <Filters
          showSearch
          showFacility
          facilities={facilitiesFilter?.data?.facilities?.map((f) => f.name) ?? []}
        />
      </Box>

      {/* Error */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Table */}
      <DataTable
        item="Rooms"
        columns={columns}
        rows={rows}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        loading={loading}
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
          { label: "Name", value: selectedRoom?.roomNumber },
          { label: "ID", value: selectedRoom?._id },
          { label: "Images", images: selectedRoom?.images ?? [] },
          { label: "Facilities", list: selectedRoom?.facilities?.map((f) => f.name) ?? [] },
          { label: "Capacity", value: selectedRoom?.capacity },
          { label: "Price ($)", value: selectedRoom?.price },
          { label: "Discount (%)", value: selectedRoom?.discount },
          { label: "Created By (UserName)", value: selectedRoom?.createdBy?.userName },
          { label: "Created By (ID)", value: selectedRoom?.createdBy?._id },
          {
            label: "Created At",
            value: selectedRoom?.createdAt
              ? new Date(selectedRoom.createdAt).toLocaleDateString()
              : "",
          },
          {
            label: "Modified At",
            value: selectedRoom?.updatedAt
              ? new Date(selectedRoom.updatedAt).toLocaleDateString()
              : "",
          },
        ]}
      />
    </>
  );
}