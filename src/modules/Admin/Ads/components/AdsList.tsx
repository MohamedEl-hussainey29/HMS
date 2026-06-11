import { useCallback, useState } from "react";
import DataTable, {
  type TableColumn,
} from "../../../Shared/DataTable/DataTable";
import { AdsAPI } from "../../../../api";
import useGetData from "../../../../hooks/useGetData";
import RowActions from "../../../Shared/RowActions/RowActions";
import { Box, Button, Grid, Typography } from "@mui/material";
import Filters from "../../../Shared/Filters/Filters";

interface Ad {
  _id: string;
  isActive: boolean;
  room: {
    _id: string;
    roomNumber: number;
    price: number;
    capacity: number;
    discount: number;
    images: string[];
  };
  createdBy: {
    _id: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface AdsResponse {
  data: {
    ads: Ad[];
    totalCount: number;
  };
}

export default function AdsList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchAds = useCallback(() => {
    return AdsAPI.getAllAds({
      page: page + 1,
      size: rowsPerPage,
    });
  }, [page, rowsPerPage]);

  const { data, isLoading, error } = useGetData<AdsResponse>(
    fetchAds, 
    [page,
    rowsPerPage]
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

  const handleViewAds = (ad: Ad) => {
    console.log("View Ad", ad);
  };

  const handleEditAds = (ad: Ad) => {
    console.log("Edit Ad", ad);
  };

  const handleDeleteAds = (ad: Ad) => {
    console.log("Delete Ad", ad);
  };

  const columns: TableColumn<Ad>[] = [
    {
      id: "roomNumber",
      label: "room Number",
      render: (ad) => ad.room.roomNumber,
    },
    {
      id: "roomImage",
      label: "room Image",
      render: (ad) => (
        <img src={ad.room.images[0]} 
        alt="room" style={{width: '70px', height: '70px', objectFit: 'cover'}} />
      ),
    },
    {
      id: "price",
      label: "Price",
      render: (ad) => ad.room.price,
    },
    {
      id: "discount",
      label: "Discount",
      render: (ad) => ad.room.discount,
    },
    {
      id: "capacity",
      label: "Capacity",
      render: (ad) => ad.room.capacity,
    },
    {
      id: "active",
      label: "Active",
      render: (ad) => ad.isActive ? 'Active' : 'InActive',
    },
    {
      id: "options",
      label: "",
      render: (ad) => (
        <RowActions
          showView
          showEdit
          showDelete
          onView={() => handleViewAds(ad)}
          onEdit={() => handleEditAds(ad)}
          onDelete={() => handleDeleteAds(ad)}
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
              <Typography variant="h6">Ads Table Details</Typography>
              <Typography color="text.secondary">
                You can check all details
              </Typography>
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                display: "flex",
                justifyContent: { xs: "stretch", md: "flex-end" },
              }}
            >
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  maxWidth: { md: 220 },
                  bgcolor: "#203FC7",
                  textTransform: "capitalize",
                }}
              >
                Add New Ads
              </Button>
            </Grid>
          </Grid>
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

        <DataTable
          item="item"
          columns={columns}
          rows={data?.data?.ads ?? []}
          count={data?.data?.totalCount ?? 0}
          page={page}
          rowsPerPage={rowsPerPage}
          loading={isLoading}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
}
