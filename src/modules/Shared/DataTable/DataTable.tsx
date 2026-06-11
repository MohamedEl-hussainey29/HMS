import {Box, Paper,Skeleton,styled,Table,TableBody,TableCell,tableCellClasses,TableContainer,TableHead,TablePagination,TableRow} from "@mui/material";
import { type ReactNode } from "react";

export interface TableColumn<T> {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: unknown,
    page: number
  ) => void;
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  loading?: boolean;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E2E5EB",
    color: theme.palette.common.black,
    paddingTop: "25px",
    paddingBottom: "25px",
    fontWeight: 600,

    "&:first-of-type": {
      borderTopLeftRadius: "12px",
      borderBottomLeftRadius: "12px",
    },

    "&:last-of-type": {
      borderTopRightRadius: "12px",
      borderBottomRightRadius: "12px",
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DataTable<T>({
  columns,
  rows,
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  loading,
}: DataTableProps<T>) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden"  , borderRadius:'12px'}}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                >
                  <Box >
                    {Array.from({ length: rowsPerPage }).map((_, index) => (
                      <Skeleton key={index} animation="wave" sx={{ height: "100px" }}/>
                      ))}
                </Box>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <StyledTableRow key={index}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                    >
                      {column.render(row)}
                    </TableCell>
                  ))}
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
        onPageChange={onPageChange}
        onRowsPerPageChange={
          onRowsPerPageChange
        }
      />
    </Paper>
  );
}