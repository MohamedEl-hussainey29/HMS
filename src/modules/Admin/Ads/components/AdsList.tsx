import { useCallback, useState } from "react";
import DataTable, {
  type TableColumn,
} from "../../../Shared/DataTable/DataTable";
import { AdsAPI } from "../../../../api";
import useGetData from "../../../../hooks/useGetData";
import RowActions from "../../../Shared/RowActions/RowActions";
import { Box, Button, Grid, Typography } from "@mui/material";
import Filters from "../../../Shared/Filters/Filters";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../../Shared/DeleteConfirmation/DeleteConfirmation";
import ViewDetails from "../../../Shared/ViewDetails/ViewDetails";
import AdsData from "./AdsData";

export interface Ad {
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
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [deleteLoading, setDaleteLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openForm, setOpenForm] = useState(false);

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

  const { data, isLoading, error, refetch } = useGetData<AdsResponse>(
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
      toast.error("something went wrong");
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
      id: "roomImage",
      label: "Room Image",
      render: (ad) => (
        <img
          src={ad.room.images[0]}
          alt="room"
          style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: '10%' }}
        />
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
      align: "center",
      render: (ad) => `${ad.room.discount}%`,
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
      render: (ad) => (ad.isActive ? "Active" : "InActive"),
    },
    {
      id: "options",
      label: "",
      align: "right",
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
          <Filters showSearch />
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
          displayName={selectedAd?.room.roomNumber.toString()}
        />

        {/* view */}
        <ViewDetails 
        open={openView}
        handleClose={() => setOpenView(false)}
        title="Ad Details"
        fields={[
          {
            label: 'Room Number',
            value:selectedAd?.room.roomNumber
          },
          {
            label: 'ID',
            value:selectedAd?._id
          },
           {
            label: 'isActive',
            value:selectedAd?.isActive ? 'Active' : 'InActive'
          },
          {
            label: 'Price',
            value:selectedAd?.room.price
          },
          {
            label: 'Capacity',
            value:selectedAd?.room.capacity
          },
          {
            label: 'Discount',
            value:`${selectedAd?.room.discount}%`
          }
        ]}
        />

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
