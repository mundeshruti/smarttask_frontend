import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const statItems = [
  {
    key: "total",
    label: "Total tasks",
    color: "#4361EE",
    icon: <AssignmentOutlinedIcon />,
  },
  {
    key: "pending",
    label: "Pending",
    color: "#E49B0F",
    icon: <PendingActionsIcon />,
  },
  {
    key: "completed",
    label: "Completed",
    color: "#168B68",
    icon: <TaskAltIcon />,
  },
  {
    key: "high",
    label: "High priority",
    color: "#D94F58",
    icon: <AutoAwesomeIcon />,
  },
];

function DashboardStats({ counts }) {
  return (
    <Grid container spacing={2}>
      {statItems.map((item) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 3 }}
          key={item.key}
        >
          <Card
            elevation={0}
            sx={{
              border: "1px solid #e7ebf3",
              borderRadius: "18px",
              background: "rgba(255,255,255,.94)",
              boxShadow: "0 7px 24px rgba(25,42,86,.035)",
              transition: "transform .18s ease, box-shadow .18s ease",
              "&:hover": { transform: "translateY(-3px)", boxShadow: "0 14px 30px rgba(25,42,86,.075)" },
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <div>
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={800}
                    sx={{ mt: 1 }}
                  >
                    {counts[item.key] ?? 0}
                  </Typography>
                </div>

                <Stack
                  sx={{
                    bgcolor: `${item.color}18`,
                    color: item.color,
                    p: 1.5,
                    borderRadius: 2,
                  }}
                >
                  {item.icon}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default DashboardStats;