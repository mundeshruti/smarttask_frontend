import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const priority = task.priority || "Medium";

  const priorityStyles = {
    High: {
      accent: "#E65368",
      color: "#C93650",
      background: "#FFF0F2",
      border: "#FFD6DE",
    },
    Medium: {
      accent: "#E9A23B",
      color: "#9A620D",
      background: "#FFF7E8",
      border: "#F8E3B9",
    },
    Low: {
      accent: "#20A779",
      color: "#087A56",
      background: "#EAF9F2",
      border: "#C9EFDE",
    },
  };

  const priorityStyle = priorityStyles[priority] || priorityStyles.Medium;
  const completed = Boolean(task.completed);

  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        height: "100%",
        overflow: "hidden",
        border: "1px solid",
        borderColor: completed ? "#E5EEE9" : "#E4E9F3",
        borderRadius: "18px",
        bgcolor: "#FFFFFF",
        boxShadow: "0 4px 18px rgba(28, 43, 76, 0.035)",
        transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "0 auto 0 0",
          width: "4px",
          bgcolor: priorityStyle.accent,
          opacity: completed ? 0.45 : 1,
        },
        "&:hover": {
          transform: "translateY(-3px)",
          borderColor: "#D5DDF0",
          boxShadow: "0 12px 28px rgba(28, 43, 76, 0.09)",
        },
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
          "&:hover": { transform: "none" },
        },
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2, sm: 2.5 },
          "&:last-child": { pb: { xs: 2, sm: 2.5 } },
        }}
      >
        <Stack direction="row" alignItems="flex-start" spacing={1.25}>
          <Checkbox
            checked={completed}
            onChange={() => onToggle(task)}
            inputProps={{
              "aria-label": `Mark ${task.title} as ${completed ? "pending" : "completed"}`,
            }}
            sx={{
              p: 0.5,
              mt: 0.1,
              color: "#B6C0D5",
              "&.Mui-checked": { color: "#536DF5" },
              "& .MuiSvgIcon-root": { fontSize: 25 },
            }}
          />

          <Stack sx={{ flex: 1, minWidth: 0, pt: 0.25 }} spacing={0.75}>
            <Typography
              variant="subtitle1"
              sx={{
                color: completed ? "#758096" : "#202C48",
                fontWeight: 750,
                fontSize: "1.02rem",
                lineHeight: 1.4,
                textDecoration: completed ? "line-through" : "none",
                overflowWrap: "anywhere",
              }}
            >
              {task.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#697386",
                fontSize: "0.91rem",
                lineHeight: 1.7,
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              {task.description || "No description added yet."}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5} sx={{ ml: 0.25, flexShrink: 0 }}>
            <IconButton
              aria-label={`Edit ${task.title}`}
              onClick={() => onEdit(task)}
              size="small"
              sx={{
                width: 34,
                height: 34,
                color: "#536DF5",
                bgcolor: "#F1F4FF",
                borderRadius: "10px",
                "&:hover": { bgcolor: "#E4E9FF" },
              }}
            >
              <EditOutlinedIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              aria-label={`Delete ${task.title}`}
              onClick={() => onDelete(task)}
              size="small"
              sx={{
                width: 34,
                height: 34,
                color: "#9AA4B7",
                borderRadius: "10px",
                "&:hover": { bgcolor: "#FFF0F2", color: "#D9435C" },
              }}
            >
              <DeleteOutlineIcon sx={{ fontSize: 19 }} />
            </IconButton>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2, borderColor: "#EEF1F6" }} />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={1.25}
        >
          <Stack direction="row" alignItems="center" flexWrap="wrap" gap={0.75}>
            <Chip
              size="small"
              label={priority}
              sx={{
                height: 27,
                fontWeight: 750,
                fontSize: "0.78rem",
                color: priorityStyle.color,
                bgcolor: priorityStyle.background,
                border: "1px solid",
                borderColor: priorityStyle.border,
                "& .MuiChip-label": { px: 1.2 },
              }}
            />

            {task.due_date && (
              <Chip
                size="small"
                variant="outlined"
                icon={<EventOutlinedIcon sx={{ fontSize: "16px !important" }} />}
                label={`Due ${task.due_date}`}
                sx={{
                  height: 27,
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  color: "#65718A",
                  bgcolor: "#FBFCFE",
                  borderColor: "#E5EAF2",
                  "& .MuiChip-icon": { color: "#8994A8", ml: 0.75 },
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            )}
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={0.65}
            sx={{
              color: completed ? "#16835F" : "#64728D",
              bgcolor: completed ? "#EDF9F3" : "#F2F5FF",
              borderRadius: "999px",
              px: 1.1,
              py: 0.55,
              ml: "auto",
            }}
          >
            {completed ? (
              <CheckCircleRoundedIcon sx={{ fontSize: 15 }} />
            ) : (
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  bgcolor: "#536DF5",
                }}
              />
            )}
            <Typography variant="caption" sx={{ fontWeight: 750, lineHeight: 1.2 }}>
              {completed ? "Completed" : "In progress"}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
