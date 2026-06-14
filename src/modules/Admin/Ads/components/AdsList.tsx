/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import DataTable, {
  type TableColumn,
} from "../../../Shared/DataTable/DataTable";
import { AdsAPI } from "../../../../api";
import useGetData from "../../../../hooks/useGetData";
import RowActions from "../../../Shared/RowActions/RowActions";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import Filters from "../../../Shared/Filters/Filters";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../../Shared/DeleteConfirmation/DeleteConfirmation";
import ViewDetails from "../../../Shared/ViewDetails/ViewDetails";
import AdsData from "./AdsData";
import axios, { type AxiosResponse } from "axios";
import noImage from "../../../../assets/images/noImage.png"
import { DataFilter } from "../../../../context/FiltersContext";
import useFilters from "../../../../hooks/useFilters";

export interface Ad {
  _id: string;
  isActive: boolean;
  room: {
    _id: string;
    roomNumber: string;
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
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [deleteLoading, setDaleteLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const { search , isActive } = DataFilter();
  const ActiveFilters = !!(search || isActive !== null);

  const handleOpenDelete = (ad: Ad) => {
    setSelectedAd(ad);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenForm = () => {
    setSelectedAd(null);
    setOpenForm(true);
  }
  const handleCloseForm = () => {
    setOpenForm(false);
  }

  const fetchAds = useCallback(() => {
    return AdsAPI.getAllAds({
      page: page + 1,
      size: rowsPerPage,
    });
  }, [page, rowsPerPage]);

  const { data: ads, isLoading, error, refetch } = useGetData<AdsResponse>(
    fetchAds,
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

  const handleViewAds = (ad: Ad) => {
    setSelectedAd(ad);
    setOpenView(true);
  };

  const handleEditAds = (ad: Ad) => {
    setSelectedAd(ad);
    setOpenForm(true);
  };

  const handleDeleteAds = async (id: string) => {
    setDaleteLoading(true);
    try {
      await AdsAPI.deleteAd(id);
      toast.success("Ad is deleted successfully");
      refetch();
      handleCloseDelete();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    } finally {
      setDaleteLoading(false);
    }
  };

  const columns: TableColumn<Ad>[] = [
    {
      id: "roomNumber",
      label: "Room Number",

      render: (ad) => ad.room.roomNumber,
    },
    {
      id: "images",
      label: "Image",
      align: "center",
      render: (ad) =>
        ad.room.images[0] ? (
          <Box
            component="img"
            src={ad.room.images[0]}
            alt={ad.room.roomNumber}
            sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: "8px" }}
          />
        ) : (
          <Box
            component="img"
            src={noImage}
            alt={ad.room.roomNumber}
            sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: "8px" }}
          />
        ),
    },
    {
      id: "price",
      label: "Price ($)",
      render: (ad) => ad.room.price,
    },
    {
      id: "discount",
      label: "Discount (%)",
      align: "center",
      render: (ad) => ad.room.discount,
    },
    {
      id: "capacity",
      label: "Capacity",
      align: "center",
      render: (ad) => ad.room.capacity,
    },
    {
      id: "active",
      label: "Active",
      align: "center",
      render: (ad) => (
        <Chip
          label={ad.isActive? "Active" : "In Active"}
          size="small"
          sx={{
            fontWeight: 600,
            bgcolor: ad.isActive ? "#E8F5E9" : "#FFF3E0",
            color: ad.isActive ? "#2E7D32" : "#ed0202",
          }}
        />
      ),
    },
    {
      id: "options",
      label: "",
      align: "center",
      render: (ad) => (
        <RowActions
          showView
          showEdit
          showDelete
          onView={() => handleViewAds(ad)}
          onEdit={() => handleEditAds(ad)}
          onDelete={() => handleOpenDelete(ad)}
        />
      ),
    },
  ];

  // Full fetch (all Ads) used only when filters are active
    const fetchAllAds = useCallback((): Promise<AxiosResponse<AdsResponse>> => {
      if (!ActiveFilters) {
        return Promise.resolve({
          data: { data: { ads: [], totalCount: 0 } },
        } as unknown as AxiosResponse<AdsResponse>);
      }
      return AdsAPI.getAllAds({
        page: 1,
        size: ads?.data?.totalCount || 1000,
      });
    }, [ActiveFilters, ads?.data?.totalCount]);
  
    const { data: allData, isLoading: filterLoading } = useGetData<AdsResponse>(
      fetchAllAds,
      [ActiveFilters, ads?.data?.totalCount, search , isActive],
    );
  
    const filteredFacilities = useFilters(allData?.data?.ads ?? [], {
      searchFields: (ad) => [ad.room.roomNumber],
      isActiveField: (ad) => ad.isActive
    });
  
    useEffect(() => {
      setPage(0);
    }, [search , isActive]);
  
    const paginatedFiltered = filteredFacilities.slice(
      page * rowsPerPage, //start
      page * rowsPerPage + rowsPerPage, //end
    );
  
    const rows = ActiveFilters ? paginatedFiltered : ads?.data?.ads ?? [];
    const count = ActiveFilters ? filteredFacilities.length : ads?.data?.totalCount ?? 0;
    const loading = ActiveFilters ? filterLoading : isLoading;

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
                onClick={handleOpenForm}
              >
                Add New Ads
              </Button>
            </Grid>
          </Grid>
        </Box>
        <AdsData open={openForm} handleClose={handleCloseForm} refetchData={refetch} ad={selectedAd}/>

        {/* Filters */}
        <Box sx={{ mb: 2 }}>
          <Filters showSearch showIsActive />
        </Box>

        {/* Error */}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* delete */}
        <DeleteConfirmation
          isLoading={deleteLoading}
          open={openDelete}
          handleClose={handleCloseDelete}
          onDelete={handleDeleteAds}
          item="Ad"
          itemData={selectedAd}
          displayName={`Ad for Room: ${selectedAd?.room.roomNumber}`}
        />

        {/* view */}
        <ViewDetails 
        open={openView}
        handleClose={() => setOpenView(false)}
        title="Ad Details"
        fields={[
          { label: 'ID', value:selectedAd?._id },
          { label: 'Room Number', value:selectedAd?.room.roomNumber },
          { label: "Images",  images: selectedAd?.room?.images ?? []  },
          { label: 'isActive', value:selectedAd?.isActive ? 'Active' : 'InActive' },
          { label: 'Price ($)', value:selectedAd?.room.price },
          { label: 'Capacity', value:selectedAd?.room.capacity },
          { label: 'Discount (%)', value: selectedAd?.room.discount }
        ]}
        />

        <DataTable
          item="Ads"
          columns={columns}
          rows={rows}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          loading={loading}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
}
