import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Grid, InputAdornment, MenuItem, TextField } from "@mui/material";
import { DataFilter } from "../../../context/FiltersContext";

interface FiltersProps {
  showSearch?: boolean;
  showFacility?: boolean;
  showDateRange?: boolean;
  showIsActive?: boolean;
  facilities?: string[];
}

const IS_ACTIVE_OPTIONS = [
  { label: "Active", value: true },
  { label: "In Active", value: false },
];

export default function Filters({
  showSearch = false,
  showFacility = false,
  showDateRange = false,
  showIsActive = false,
  facilities = [],
}: FiltersProps) {
  const { search, setSearch, facility, setFacility, startDate, setStartDate, endDate, setEndDate, isActive, setIsActive } = DataFilter();

  const activeFilters = [showFacility, showDateRange, showIsActive].filter(Boolean).length;
  const searchMdSize = activeFilters === 0 ? 12 : activeFilters === 1 ? 8 : activeFilters === 2 ? 6 : 4;

  return (
    <Grid container spacing={2}>
      {showSearch && (
        <Grid size={{ xs: 12, md: searchMdSize }}>
          <TextField
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ..."
            sx={{ "& .MuiOutlinedInput-root": { height: 50, borderRadius: 2 } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
      )}

      {showFacility && (
        <Grid size={{ xs: 12, md: 2 }}>
          <Autocomplete
            value={facility}
            onChange={(_, value) => setFacility(value)}
            options={facilities}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Facility"
                sx={{ "& .MuiOutlinedInput-root": { height: 50, borderRadius: 2 } }}
              />
            )}
          />
        </Grid>
      )}

      {showIsActive && (
        <Grid size={{ xs: 12, md: 2 }}>
          <TextField
            select
            fullWidth
            label="Status"
            value={isActive === null ? "" : String(isActive)}
            onChange={(e) => {
              const val = e.target.value;
              setIsActive(val === "" ? null : val === "true");
            }}
            sx={{ "& .MuiOutlinedInput-root": { height: 50, borderRadius: 2 } }}
            slotProps={{ inputLabel: { shrink: true } }}
          >
            <MenuItem value="">All</MenuItem>
            {IS_ACTIVE_OPTIONS.map((opt) => (
              <MenuItem key={String(opt.value)} value={String(opt.value)}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      )}

      {showDateRange && (
        <>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { height: 50, borderRadius: 2 } }}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              fullWidth
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { height: 50, borderRadius: 2 } }}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}