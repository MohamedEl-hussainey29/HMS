import {Box,Button,Grid,IconButton,ListItemIcon,Menu,MenuItem,Tooltip,Typography} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useCallback, useState } from "react";
import Filters from "../../../Shared/Filters/Filters";
import DataTable, {type TableColumn,} from "../../../Shared/DataTable/DataTable";
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
  success: boolean;
  message: string;
  data: {
    facilities: Facility[];
    totalCount: number;
  };
}

export default function FacilitiesList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const fetchFacilities = useCallback(() => {
    return FacilitiesAPI.getAllFacilities({
      page: page + 1,
      size: rowsPerPage,
    });
  }, [page, rowsPerPage]);

  const { data, isLoading, error } = useGetData<FacilitiesResponse>(
      fetchFacilities,
      [page, rowsPerPage]
    );

  const handleChangePage = (
    _: unknown,
    newPage: number
  ) => {setPage(newPage)};

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number(event.target.value))
    setPage(0);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>,facility: Facility) => {
    setAnchorEl(event.currentTarget);
    setSelectedFacility(facility);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
      render: (facility) =>
        facility.createdBy.userName,
    },
    {
      id: "createdAt",
      label: "Creation Date",
      align: "right",
      render: (facility) =>
        new Date(
          facility.createdAt
        ).toLocaleDateString(),
    },
    {
      id: "updatedAt",
      label: "Modification Date",
      align: "right",
      render: (facility) =>
        new Date(
          facility.updatedAt
        ).toLocaleDateString(),
    },
    {
      id: "options",
      label: "",
      align: "right",
      render: (facility) => (
        <Tooltip title="Options">
          <IconButton
            size="small"
            onClick={(e) =>handleMenuClick(e, facility)}
          >
            <MoreHorizIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2} sx={{ alignItems: "center" }} >
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">
              Facilities Table Details
            </Typography>
            <Typography color="text.secondary">
              You can check all details
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: { xs: "stretch", md: "flex-end"}}} >
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{maxWidth: { md: 220 },bgcolor: "#203FC7",textTransform:"capitalize"}}
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
        <Typography color="error" sx={{ mb: 2 }} >
          {error}
        </Typography>
      )}
      {/* Table */}
      <DataTable
        columns={columns}
        rows={data?.data?.facilities ?? [] }
        count={data?.data?.totalCount ?? 0}
        page={page}
        rowsPerPage={rowsPerPage}
        loading={isLoading}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        id="facility-menu"
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              borderRadius: "15px",
              filter:"drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              minWidth: 180,
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform:
                  "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{horizontal: "right",vertical: "top"}}
        anchorOrigin={{horizontal: "right",vertical: "bottom"}}
      >
        <MenuItem>
          <ListItemIcon>
            <VisibilityOutlinedIcon fontSize="small" sx={{color:'#203FC7'}}/>
          </ListItemIcon> View
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" sx={{color:'#203FC7'}}/>
          </ListItemIcon> Edit
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeleteOutlinedIcon fontSize="small" sx={{color:'#203FC7'}}/>
          </ListItemIcon> Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}