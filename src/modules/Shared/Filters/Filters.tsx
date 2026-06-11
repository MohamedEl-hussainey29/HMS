import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface FiltersProps {
  showSearch?: boolean;
  showTag?: boolean;
  showFacility?: boolean;
}

const tags = ["tag1", "tag2", "tag3", "tag4"];

const facilities = ["Single Room","Double Room","Suite","Deluxe Room"];

export default function Filters({showSearch = false,showTag = false,showFacility = false}: FiltersProps) {
    
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const visibleFilters =
    Number(showTag) + Number(showFacility);

  return (
    <Grid container spacing={2}>
      {showSearch && (
        <Grid size={{xs: 12, md: visibleFilters === 2 ? 8 : 10,}}>
          <TextField
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ..."
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 50,
                borderRadius: 2,
              },
            }}
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

      {showTag && (
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Autocomplete
            value={selectedTag}
            onChange={(_, value) => setSelectedTag(value)}
            options={tags}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tag"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: 50,
                    borderRadius: 2,
                  },
                }}
              />
            )}
          />
        </Grid>
      )}

      {showFacility && (
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Autocomplete
            value={selectedFacility}
            onChange={(_, value) => setSelectedFacility(value)}
            options={facilities}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Facility"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: 50,
                    borderRadius: 2,
                  },
                }}
              />
            )}
          />
        </Grid>
      )}
    </Grid>
  );
}