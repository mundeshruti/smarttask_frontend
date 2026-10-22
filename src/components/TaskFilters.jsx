
import {
  Box,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  FilterListOutlined,
  Search,
} from "@mui/icons-material";

function TaskFilters({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  priorityFilter = "All",
  onPriorityFilterChange,
}) {
  const activeFilters = [
    filter !== "All",
    priorityFilter !== "All",
    Boolean(search.trim()),
  ].filter(Boolean).length;

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      minHeight: 42,
      borderRadius: "10px",
      bgcolor: "#FFFFFF",
      fontSize: 12.5,
      "& fieldset": {
        borderColor: "#E0E5ED",
      },
      "&:hover fieldset": {
        borderColor: "#B7C2D5",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#5266D9",
      },
    },
    "& .MuiInputLabel-root": {
      fontSize: 12.5,
      color: "#7A8499",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#5266D9",
    },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        mb: 2.5,
        border: "1px solid #E6EAF1",
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
      }}
    >
      {/* Filter Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 34,
              height: 34,
              display: "grid",
              placeItems: "center",
              borderRadius: "10px",
              bgcolor: "#EEF1FF",
              color: "#5266D9",
            }}
          >
            <FilterListOutlined sx={{ fontSize: 19 }} />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 13.5,
                fontWeight: 750,
                color: "#26334D",
              }}
            >
              Search & filters
            </Typography>

            <Typography
              sx={{
                fontSize: 11.5,
                color: "#8993A7",
                mt: 0.2,
              }}
            >
              Find and organize your tasks
            </Typography>
          </Box>
        </Stack>

        {activeFilters > 0 && (
          <Chip
            size="small"
            label={`${activeFilters} active`}
            sx={{
              height: 24,
              fontSize: 10.5,
              fontWeight: 650,
              color: "#5266D9",
              bgcolor: "#EEF1FF",
              borderRadius: "7px",
            }}
          />
        )}
      </Stack>

      {/* Search and Filter Controls */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1.5}
        alignItems="stretch"
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search tasks by title or description..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          sx={{
            ...fieldSx,
            flex: 1,
            minWidth: 0,
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ fontSize: 20, color: "#8B95A8" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ flexShrink: 0 }}
        >
          <FormControl
            size="small"
            sx={{
              ...fieldSx,
              minWidth: { xs: "100%", sm: 150 },
            }}
          >
            <InputLabel id="task-filter-label">Status</InputLabel>

            <Select
              labelId="task-filter-label"
              value={filter}
              label="Status"
              onChange={(event) => onFilterChange(event.target.value)}
            >
              <MenuItem value="All">All tasks</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>

          {onPriorityFilterChange && (
            <FormControl
              size="small"
              sx={{
                ...fieldSx,
                minWidth: { xs: "100%", sm: 150 },
              }}
            >
              <InputLabel id="priority-filter-label">Priority</InputLabel>

              <Select
                labelId="priority-filter-label"
                value={priorityFilter}
                label="Priority"
                onChange={(event) =>
                  onPriorityFilterChange(event.target.value)
                }
              >
                <MenuItem value="All">All priorities</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
          )}
        </Stack>
      </Stack>
      
    </Paper>
  );
}

export default TaskFilters;
