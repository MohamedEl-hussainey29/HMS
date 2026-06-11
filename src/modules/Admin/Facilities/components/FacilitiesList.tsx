import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import Filters from "../../../Shared/Filters/Filters";
import DataTable, {type TableColumn} from "../../../Shared/DataTable/DataTable";
import RowActions from "../../../Shared/RowActions/RowActions";
import { FacilitiesAPI } from "../../../../api";
import useGetData from "../../../../hooks/useGetData";

interface Facility {
  _id: string;
  name: string;
  createdBy: {
    _id: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface FacilitiesResponse {
  data: {
    facilities: Facility[];
    totalCount: number;
  };
}

export default function FacilitiesList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchFacilities = useCallback(() => {
    return FacilitiesAPI.getAllFacilities({
      page: page + 1,
      size: rowsPerPage,
    });
  }, [page, rowsPerPage]);

  const { data, isLoading, error } = useGetData<FacilitiesResponse>(
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
    console.log("View Facility", facility);
  };

  const handleEditFacility = (facility: Facility) => {
    console.log("Edit Facility", facility);
  };

  const handleDeleteFacility = (facility: Facility) => {
    console.log("Delete Facility", facility);
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
      render: (facility) => facility.createdBy.userName,
    },
    {
      id: "createdAt",
      label: "Creation Date",
      align: "right",
      render: (facility) => new Date(facility.createdAt).toLocaleDateString(),
    },
    {
      id: "updatedAt",
      label: "Modification Date",
      align: "right",
      render: (facility) => new Date(facility.updatedAt).toLocaleDateString(),
    },
    {
      id: "options",
      label: "",
      align: "right",
      render: (facility) => (
        <RowActions
          showView
          showEdit
          showDelete
          onView={() => handleViewFacility(facility)}
          onEdit={() => handleEditFacility(facility)}
          onDelete={() => handleDeleteFacility(facility)}
        />
      ),
    },
  ];

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
            >
              Add New Facility
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

      {/* Table */}
      <DataTable
        columns={columns}
        rows={data?.data?.facilities ?? []}
        count={data?.data?.totalCount ?? 0}
        page={page}
        rowsPerPage={rowsPerPage}
        loading={isLoading}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
