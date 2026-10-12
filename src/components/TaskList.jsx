
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Add, TaskAlt } from "@mui/icons-material";
import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  loading,
  onAddTask,
  onToggle,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <Paper elevation={0} sx={{ p: 6, textAlign: "center", borderRadius: 3 }}>
        <CircularProgress />
        <Typography mt={2} color="text.secondary">
          Loading your tasks...
        </Typography>
      </Paper>
    );
  }

  if (tasks.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 6,
          textAlign: "center",
          border: "1px dashed #C8D0DE",
          borderRadius: 3,
        }}
      >
        <TaskAlt sx={{ fontSize: 48, color: "#9AA6B8", mb: 1 }} />

        <Typography variant="h6" fontWeight={700}>
          No matching tasks
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1, mb: 2 }}>
          Create a task or change your search and filter.
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={onAddTask}
        >
          Add task
        </Button>
      </Paper>
    );
  }

  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid size={{ xs: 12, md: 6 }} key={task.id}>
          <TaskCard
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default TaskList;
