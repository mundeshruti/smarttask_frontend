
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";

function TaskFilters({ search, onSearchChange, filter, onFilterChange }) {
  return (
    <Paper
      elevation={0}
      sx={{ border: "1px solid #E7EAF0", borderRadius: 3, p: 2 }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ sm: "center" }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search by title or description..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="task-filter-label">Show tasks</InputLabel>
          <Select
            labelId="task-filter-label"
            value={filter}
            label="Show tasks"
            onChange={(event) => onFilterChange(event.target.value)}
          >
            <MenuItem value="All">All tasks</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
}

export default TaskFilters;
