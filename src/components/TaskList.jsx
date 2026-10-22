
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  Add,
  AssignmentOutlined,
  CheckCircleOutline,
  DeleteOutline,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

const priorityStyles = {
  Low: {
    color: "#16805D",
    bgcolor: "#EAF8F1",
  },
  Medium: {
    color: "#A66A12",
    bgcolor: "#FFF5E3",
  },
  High: {
    color: "#C24141",
    bgcolor: "#FFF0F0",
  },
};

const getCompleted = (task) =>
  task.completed === true || task.status === "Completed";

function TaskList({ tasks = [], loading, onAddTask, onToggle, onEdit, onDelete, onView, }) {
  if (loading) {
    return (
      <Paper elevation={0} sx={{ p: 6, textAlign: "center", border: "1px solid #E6EAF1", borderRadius: "16px", }} >
        <CircularProgress size={30} sx={{ color: "#5266D9" }} />
        <Typography mt={2} sx={{ color: "#7A8499", fontSize: 13 }} >
          Loading your tasks...
        </Typography>
      </Paper>
    );
  }

  if (tasks.length === 0) {
    return (
      <Paper elevation={0} sx={{ py: 7, px: 3, textAlign: "center", border: "1px dashed #CCD4E2", borderRadius: "16px", bgcolor: "#FCFCFE", }} >
        <Box sx={{ mx: "auto", mb: 2, width: 58, height: 58, display: "grid", placeItems: "center", borderRadius: "16px", bgcolor: "#EEF1FF", color: "#5266D9", }} >
          <AssignmentOutlined sx={{ fontSize: 30 }} />
        </Box>

        <Typography sx={{ fontSize: 17, fontWeight: 750, color: "#202B45", }} >
          No matching tasks
        </Typography>

        <Typography sx={{ mt: 1, mb: 2.5, fontSize: 13, color: "#7A8499", }} >
          Create a task or adjust your search and filters.
        </Typography>

        <Button variant="contained" startIcon={<Add />} onClick={onAddTask}
          sx={{ textTransform: "none", borderRadius: "10px", px: 2.5, bgcolor: "#5266D9", boxShadow: "none", "&:hover": { bgcolor: "#4054C4", boxShadow: "none", }, }}
        >
          Add task
        </Button>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} sx={{ overflow: "hidden", border: "1px solid #E6EAF1", borderRadius: "16px", bgcolor: "#FFFFFF", }} >
      {/* List Header */}
      <Box sx={{ px: { xs: 2, sm: 2.5 }, py: 1.75, bgcolor: "#FAFBFE", borderBottom: "1px solid #EAEFF5", }} >
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} >
          <Typography sx={{ fontSize: 14, fontWeight: 750, color: "#26334D", }} >
            Task list
          </Typography>

          <Chip
            size="small"
            label={`${tasks.length} ${ tasks.length === 1 ? "task" : "tasks" }`}
            sx={{ height: 25, fontSize: 11.5, fontWeight: 700, color: "#5266D9", bgcolor: "#EEF1FF", borderRadius: "7px", }}
          />
        </Stack>
      </Box>

      {/* Vertical Task Rows */}
      <Stack divider={<Divider sx={{ borderColor: "#EDF0F5" }} />}>
        {tasks.map((task) => {
          const completed = getCompleted(task);

          const priority =
            priorityStyles[task.priority] || priorityStyles.Medium;

          return (
            <Box key={task.id} sx={{ px: { xs: 2, sm: 2.5 }, py: 2, transition: "background-color 0.2s ease", "&:hover": { bgcolor: "#FAFBFF", }, }} >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.75}
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                {/* Task Icon */}
                <Box
                  sx={{
                    display: { xs: "none", sm: "grid" },
                    flexShrink: 0,
                    width: 40,
                    height: 40,
                    placeItems: "center",
                    borderRadius: "12px",
                    bgcolor: completed ? "#EAF8F1" : "#EEF1FF",
                    color: completed ? "#16805D" : "#5266D9",
                  }}
                >
                  {completed ? ( <CheckCircleOutline /> ) : ( <AssignmentOutlined /> )}
                </Box>

                {/* Task Details */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" useFlexGap >
                    <Typography
                      sx={{
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: completed ? "#8B95A7" : "#26334D",
                        textDecoration: completed
                          ? "line-through"
                          : "none",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {task.title}
                    </Typography>

                    <Chip
                      size="small"
                      label={completed ? "Completed" : "Pending"}
                      sx={{
                        height: 21,
                        fontSize: 10.5,
                        fontWeight: 650,
                        borderRadius: "6px",
                        color: completed ? "#16805D" : "#5266D9",
                        bgcolor: completed ? "#EAF8F1" : "#EEF1FF",
                      }}
                    />
                  </Stack>

                  <Typography
                    sx={{
                      mt: 0.6,
                      fontSize: 12,
                      lineHeight: 1.6,
                      color: "#7A8499",
                      overflowWrap: "anywhere",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {task.description || "No description provided."}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mt: 1 }}
                  >
                    <Chip
                      size="small"
                      label={`${task.priority || "Medium"} priority`}
                      sx={{
                        height: 22,
                        fontSize: 10.5,
                        fontWeight: 650,
                        borderRadius: "6px",
                        color: priority.color,
                        bgcolor: priority.bgcolor,
                      }}
                    />

                    {task.due_date && (
                      <Typography
                        sx={{
                          fontSize: 11.5,
                          color: "#8993A7",
                        }}
                      >
                        Due: {task.due_date}
                      </Typography>
                    )}
                  </Stack>
                </Box>

                {/* Action Buttons */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={0.75}
                  sx={{
                    flexShrink: 0,
                    alignSelf: { xs: "flex-end", sm: "center" },
                    mt: { xs: 0.5, sm: 0 },
                  }}
                >
                  <Tooltip title="View task">
                    <IconButton
                      size="small"
                      aria-label="View task"
                      onClick={() => onView?.(task)}
                      sx={{
                        width: 34,
                        height: 34,
                        color: "#64748B",
                        border: "1px solid #E6EAF1",
                        borderRadius: "9px",
                        "&:hover": {
                          bgcolor: "#EEF1FF",
                          color: "#5266D9",
                          borderColor: "#D9E0FF",
                        },
                      }}
                    >
                      <VisibilityOutlined sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip
                    title={completed ? "Mark pending" : "Mark completed"}
                  >
                    <IconButton
                      size="small"
                      aria-label={
                        completed ? "Mark pending" : "Mark completed"
                      }
                      onClick={() => onToggle(task)}
                      sx={{
                        width: 34,
                        height: 34,
                        color: completed ? "#16805D" : "#64748B",
                        border: "1px solid #E6EAF1",
                        borderRadius: "9px",
                        "&:hover": {
                          bgcolor: "#EAF8F1",
                          color: "#16805D",
                          borderColor: "#C8EBDD",
                        },
                      }}
                    >
                      <CheckCircleOutline sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Edit task">
                    <IconButton
                      size="small"
                      aria-label="Edit task"
                      onClick={() => onEdit(task)}
                      sx={{
                        width: 34,
                        height: 34,
                        color: "#5266D9",
                        border: "1px solid #E0E5FF",
                        borderRadius: "9px",
                        "&:hover": {
                          bgcolor: "#EEF1FF",
                          borderColor: "#C9D2FF",
                        },
                      }}
                    >
                      <EditOutlined sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete task">
                    <IconButton
                      size="small"
                      aria-label="Delete task"
                      onClick={() => onDelete(task)}
                      sx={{
                        width: 34,
                        height: 34,
                        color: "#D04B4B",
                        border: "1px solid #F3DEDE",
                        borderRadius: "9px",
                        "&:hover": {
                          bgcolor: "#FFF0F0",
                          borderColor: "#F0CACA",
                        },
                      }}
                    >
                      <DeleteOutline sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Paper>
  );
}

export default TaskList;