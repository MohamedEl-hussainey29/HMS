import { useCallback, useState } from "react";
import { AdminsAPI } from "../../../../api";
import useGetData from "../../../../hooks/useGetData";
import type { TableColumn } from "../../../Shared/DataTable/DataTable";
import RowActions from "../../../Shared/RowActions/RowActions";
import { Box, Grid, Typography } from "@mui/material";
import defaultAvatar from "../../../../assets/images/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.avif"
import Filters from "../../../Shared/Filters/Filters";
import DataTable from "../../../Shared/DataTable/DataTable";
import ViewDetails from "../../../Shared/ViewDetails/ViewDetails";

export interface User {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: number;
  country: string;
  profileImage: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UsersResponse {
  data: {
    users: User[];
    totalCount: number;
  };
}
export default function UsersList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openView, setOpenView] = useState(false);

  const fetchUsers = useCallback(() => {
    return AdminsAPI.getAllUsers({
      page: page + 1,
      size: rowsPerPage,
    });
  }, [page, rowsPerPage]);
  
  const { data, isLoading, error } = useGetData<UsersResponse>(
    fetchUsers,
    [page, rowsPerPage],
  );

  const handleChangePage = (_: unknown, newPage: number) => {
      setPage(newPage);
    };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setOpenView(true);
  };

  const columns: TableColumn<User>[] = [
      {
        id: "userName",
        label: "Username",
        render: (user) => user.userName,
      },
      {
        id: "profileImage",
        label: "Profile Image",
        align: "center",
        render: (user) =>
          user.profileImage?.[0] ? (
            <Box
              component="img"
              src={user.profileImage}
              alt={user.userName}
              sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: "8px" }}
            />
          ) : (
            <Box
              component="img"
              src={defaultAvatar}
              alt={user.userName}
              sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: "8px" }}
            />
          ),
      },
      {
        id: "email",
        label: "Email",
        align: "center",
        render: (user) => user.email,
      },
      {
        id: "phoneNumber",
        label: "Phone Number",
        align: "center",
        render: (user) => user.phoneNumber,
      },
      {
        id: "country",
        label: "Country",
        align: "center",
        render: (user) => user.country,
      },
      {
        id: "createdAt",
        label: "Joining Date",
        align: "center",
        render: (user) => new Date(user.createdAt).toLocaleDateString(),
      },
      {
        id: "options",
        label: "",
        align: "center",
        render: (user) => ( <RowActions showView onView={() => handleViewUser(user)} />)
      },
    ];

  return (
    <>
      <Box sx={{ width: "100%", mt: 2 }}>
        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6">Users Table Details</Typography>
              <Typography color="text.secondary">You can check all details</Typography>
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
          rows={data?.data?.users ?? []}
          count={data?.data?.totalCount ?? 0}
          page={page}
          rowsPerPage={rowsPerPage}
          loading={isLoading}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <ViewDetails
          open={openView}
          handleClose={() => setOpenView(false)}
          title="User Details"
          fields={[
            {
              label: "Username",
              value: selectedUser?.userName,
            },
            {
              label: "ID",
              value: selectedUser?._id,
            },
            {
              label: "Profile Image",
              images: selectedUser?.profileImage ? [selectedUser.profileImage] : [],
            },
            {
              label: "Email",
              value:
                selectedUser?.email,
            },
            {
              label: "Phone Number",
              value:
                selectedUser?.phoneNumber
            },
            {
              label: "Country",
              value:
                selectedUser?.country
            },
            {
              label: "Created At",
              value: selectedUser?.createdAt
                ? new Date(selectedUser.createdAt).toLocaleDateString(): "",
            },
            {
              label: "Modified At",
              value: selectedUser?.updatedAt
                ? new Date(selectedUser.updatedAt).toLocaleDateString(): "",
            },
          ]}
        />
      </Box>
    </>
  )
}
