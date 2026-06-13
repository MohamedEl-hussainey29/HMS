/* eslint-disable react-hooks/set-state-in-effect */
import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Filters from "../../../Shared/Filters/Filters";
import DataTable, {type TableColumn} from "../../../Shared/DataTable/DataTable";
import RowActions from "../../../Shared/RowActions/RowActions";
import { FacilitiesAPI } from "../../../../api";
import useGetData from "../../../../hooks/useGetData";
import FacilityData from "./FacilityData";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../../Shared/DeleteConfirmation/DeleteConfirmation";
import ViewDetails from "../../../Shared/ViewDetails/ViewDetails";
import axios, { type AxiosResponse } from "axios";
import { DataFilter } from "../../../../context/FiltersContext";
import useFilters from "../../../../hooks/useFilters";

export interface Facility {
  _id: string;
  name: string;
  createdBy: {
    _id: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FacilitiesResponse {
  data: {
    facilities: Facility[];
    totalCount: number;
  };
}

export default function FacilitiesList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [deleteLoading , setDeleteLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);

  const { search } = DataFilter();
  const ActiveFilters = !!(search);


  const handleOpenForm = () => {
    setSelectedFacility(null);
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleOpenDelete = (facility: Facility) => {
    setSelectedFacility(facility);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const fetchFacilities = useCallback(() => {
    return FacilitiesAPI.getAllFacilities({
      page: page + 1,
      size: rowsPerPage,
    });
  }, [page, rowsPerPage]);

  const { data: facilities, isLoading, error , refetch } = useGetData<FacilitiesResponse>(
    fetchFacilities,
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

  const handleViewFacility = (facility: Facility) => {
    setSelectedFacility(facility);
    setOpenView(true);
  };

  const handleEditFacility = (facility: Facility) => {
    setSelectedFacility(facility);
    setOpenForm(true);
  };

  const handleDeleteFacility = async(id: string) => {
    setDeleteLoading(true);
    try {
      await FacilitiesAPI.DeleteFacility(id);
      toast.success("Facility is deleted successfully");
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

  const columns: TableColumn<Facility>[] = [
    {
      id: "name",
      label: "Name",
      render: (facility) => facility.name,
    },
    {
      id: "createdBy",
      label: "Created By",
      align: "center",
      render: (facility) => facility.createdBy.userName,
    },
    {
      id: "createdAt",
      label: "Creation Date",
      align: "center",
      render: (facility) => new Date(facility.createdAt).toLocaleDateString(),
    },
    {
      id: "updatedAt",
      label: "Modification Date",
      align: "center",
      render: (facility) => new Date(facility.updatedAt).toLocaleDateString(),
    },
    {
      id: "options",
      label: "",
      align: "center",
      render: (facility) => (
        <RowActions
          showView
          showEdit
          showDelete
          onView={() => handleViewFacility(facility)}
          onEdit={() => handleEditFacility(facility)}
          onDelete={() => handleOpenDelete(facility)}
        />
      ),
    },
  ];

  // Full fetch (all facilities) used only when filters are active
  const fetchAllFacilities = useCallback((): Promise<AxiosResponse<FacilitiesResponse>> => {
    if (!ActiveFilters) {
      return Promise.resolve({
        data: { data: { facilities: [], totalCount: 0 } },
      } as unknown as AxiosResponse<FacilitiesResponse>);
    }
    return FacilitiesAPI.getAllFacilities({
      page: 1,
      size: facilities?.data?.totalCount || 1000,
    });
  }, [ActiveFilters, facilities?.data?.totalCount]);

  const { data: allData, isLoading: filterLoading } = useGetData<FacilitiesResponse>(
    fetchAllFacilities,
    [ActiveFilters, facilities?.data?.totalCount, search],
  );

  const filteredFacilities = useFilters(allData?.data?.facilities ?? [], {
    searchFields: (facility) => [facility.name]
  });

  useEffect(() => {
    setPage(0);
  }, [search]);

  const paginatedFiltered = filteredFacilities.slice(
    page * rowsPerPage, //start
    page * rowsPerPage + rowsPerPage, //end
  );

  const rows = ActiveFilters ? paginatedFiltered : facilities?.data?.facilities ?? [];
  const count = ActiveFilters ? filteredFacilities.length : facilities?.data?.totalCount ?? 0;
  const loading = ActiveFilters ? filterLoading : isLoading;

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Facilities Table Details</Typography>
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
              onClick={handleOpenForm}
            >
              Add New Facility
            </Button>
          </Grid>
        </Grid>
      </Box>
      <FacilityData open={openForm} handleClose={handleCloseForm} refetchData={refetch} facility={selectedFacility}/>

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
        item="Facilities"
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
        onDelete={handleDeleteFacility}
        item="Facility"
        itemData={selectedFacility}
        />

        <ViewDetails
          open={openView}
          handleClose={() => setOpenView(false)}
          title="Facility Details"
          fields={[
            {
              label: "Name",
              value: selectedFacility?.name,
            },
            {
              label: "ID",
              value: selectedFacility?._id,
            },
            {
              label: "Created By (UserName)",
              value:
                selectedFacility?.createdBy.userName,
            },
            {
              label: "Created By (ID)",
              value:
                selectedFacility?.createdBy._id,
            },
            {
              label: "Created At",
              value: selectedFacility?.createdAt
                ? new Date(
                    selectedFacility.createdAt
                  ).toLocaleDateString()
                : "",
            },
            {
              label: "Modified At",
              value: selectedFacility?.updatedAt
                ? new Date(
                    selectedFacility.updatedAt
                  ).toLocaleDateString()
                : "",
            },
          ]}
        />
    </Box>
  );
}
