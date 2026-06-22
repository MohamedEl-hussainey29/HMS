import {Box, Paper,Skeleton,styled,Table,TableBody,TableCell,tableCellClasses,TableContainer,TableHead,TablePagination,TableRow,Tooltip,Typography} from "@mui/material";
import { type ReactNode } from "react";
import NoData from "../NoData/NoData";

export interface TableColumn<T> {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  render: (row: T) => ReactNode;
  values?: (row: T) => string[];
}

interface DataTableProps<T> {
  item: string;
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

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E2E5EB",
    color: "#1F263E",
    paddingTop: "25px",
    paddingBottom: "25px",
    fontWeight: 500,
    fontSize: "16px",

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


function MultiValueCell({ values }: { values: string[] }) {
  if (values.length === 0) return <Typography variant="body2">—</Typography>;

  const [first, ...rest] = values;

  if (rest.length === 0) {
    return <Typography variant="body2">{first}</Typography>;
  }

  return (
    <Tooltip title={rest.join(", ")} arrow enterTouchDelay={0} leaveTouchDelay={3000} >
      <Box
        sx={{display: "inline-flex", alignItems: "center", gap: 0.5, cursor: "pointer"}}>
        <Typography variant="body2">{first}</Typography>
        <Typography variant="body2" sx={{ color: "#203FC7", fontWeight: 500 }}>
          +{rest.length}
        </Typography>
      </Box>
    </Tooltip>
  );
}

export default function DataTable<T>({
  item,
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
              rows.length > 0 ? (
              rows.map((row, index) => (
                <StyledTableRow key={index}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                    >
                      {column.values ? (
                        <MultiValueCell values={column.values(row)} />
                      ) : (
                        column.render(row)
                      )}
                    </TableCell>
                  ))}
                </StyledTableRow>
              ))
            ):(
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                >
                  <NoData item={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{
        display: count <= 5 ? "none" : ""
      }}>
        <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
      </Box>
    </Paper>
  );
}
