
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
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const priority = task.priority || "Medium";
  const accent = priority === "High" ? "#F04462" : priority === "Low" ? "#12A878" : "#F5A623";
  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        height: "100%",
        border: "1px solid #E8ECF5",
        borderRadius: "20px",
        background: "linear-gradient(145deg, #FFFFFF 0%, #FBFCFF 100%)",
        boxShadow: "0 5px 18px rgba(31, 48, 92, .045)",
        transition: "transform .22s ease, box-shadow .22s ease, border-color .22s ease",
        "&:before": { content: '""', position: "absolute", inset: "0 auto 0 0", width: "4px", background: accent, opacity: task.completed ? .35 : 1 },
        "&:hover": { transform: "translateY(-4px)", boxShadow: "0 16px 34px rgba(31, 48, 92, .11)", borderColor: "#D8E0F5" },
        opacity: task.completed ? 0.82 : 1,
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Stack direction="row" alignItems="flex-start" spacing={1}>
          <Checkbox
            checked={Boolean(task.completed)}
            onChange={() => onToggle(task)}
            inputProps={{ "aria-label": `Mark ${task.title} as ${task.completed ? "pending" : "completed"}` }}
            sx={{ mt: -0.7, ml: -0.8, color: "#A7B2CC", "&.Mui-checked": { color: "#526DF4" } }}
          />
          <Stack sx={{ flexGrow: 1, minWidth: 0, pt: .25 }} spacing={0.8}>
            <Typography variant="subtitle1" fontWeight={800} sx={{ lineHeight: 1.35, textDecoration: task.completed ? "line-through" : "none", overflowWrap: "anywhere", color: "#1D2945" }}>
              {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", lineHeight: 1.65 }}>
              {task.description || "No description added yet."}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.25} sx={{ ml: .25 }}>
            <IconButton aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)} size="small" sx={{ bgcolor: "#F1F4FF", color: "#526DF4", "&:hover": { bgcolor: "#E4E9FF" } }}>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label={`Delete ${task.title}`} onClick={() => onDelete(task)} size="small" sx={{ color: "#A1A9BA", "&:hover": { bgcolor: "#FFF0F1", color: "#E5485D" } }}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2, borderColor: "#EDF0F7" }} />

        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
          <Stack direction="row" spacing={0.8} flexWrap="wrap" gap={0.5}>
            <Chip size="small" label={priority} sx={{ fontWeight: 750, bgcolor: priority === "High" ? "#FFF0F2" : priority === "Low" ? "#E8FAF2" : "#FFF6E5", color: priority === "High" ? "#D92D48" : priority === "Low" ? "#07865D" : "#A96700", border: "1px solid", borderColor: priority === "High" ? "#FFD9DF" : priority === "Low" ? "#C9F1E0" : "#FBE6BC" }} />
            {task.due_date && <Chip size="small" variant="outlined" icon={<EventOutlinedIcon />} label={`Due ${task.due_date}`} sx={{ borderColor: "#E4E9F2", color: "#66728A", bgcolor: "#FAFBFE" }} />}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.7}>
            <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: task.completed ? "#12A878" : "#526DF4" }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: task.completed ? "#07865D" : "#69758D" }}>
              {task.completed ? "Completed" : "In progress"}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
