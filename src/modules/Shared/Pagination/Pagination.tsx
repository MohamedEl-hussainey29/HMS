import { Pagination as MuiPagination, Stack } from "@mui/material";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({totalItems, itemsPerPage, currentPage, onPageChange}: PaginationProps) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  if (pageCount <= 1) return null;

  return (
    <Stack sx={{ direction: "row", justifyContent:"center", alignItems:"center", mt: 5, mb: 3 }}>
      <MuiPagination
        count={pageCount}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
        shape="rounded"
        size="large"
        sx={{
          "& .MuiPaginationItem-root": {
            fontWeight: 600,
            color: "#3252DF",
          },
          "& .Mui-selected": {
            backgroundColor: "#3252DF !important",
            color: "#fff",
          },
        }}
      />
    </Stack>
  );
}