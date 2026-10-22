
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const statItems = [
  {
    key: "total",
    label: "Total Tasks",
    subtitle: "All tasks in your workspace",
    color: "#4F46E5",
    background: "#EEF2FF",
    icon: <AssignmentOutlinedIcon />,
  },
  {
    key: "pending",
    label: "Pending Tasks",
    subtitle: "Tasks awaiting completion",
    color: "#D97706",
    background: "#FFF4DF",
    icon: <PendingActionsIcon />,
  },
  {
    key: "completed",
    label: "Completed Tasks",
    subtitle: "Tasks successfully finished",
    color: "#059669",
    background: "#E5F7EF",
    icon: <TaskAltIcon />,
  },
  {
    key: "high",
    label: "High Priority",
    subtitle: "Tasks requiring attention",
    color: "#DC3545",
    background: "#FDEBED",
    icon: <AutoAwesomeIcon />,
  },
];

function DashboardStats({ counts = {} }) {
  return (
    <Grid container spacing={2.5}>
      {statItems.map((item) => (
        <Grid
          key={item.key}
          size={{ xs: 12, sm: 6, lg: 3 }}
        >
          <Card
            elevation={0}
            sx={{
              position: "relative",
              height: "100%",
              overflow: "hidden",
              bgcolor: "#FFFFFF",
              border: "1px solid #E5EAF2",
              borderRadius: "14px",
              boxShadow: "0 2px 8px rgba(16, 24, 40, 0.035)",
              transition: "all 0.22s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                borderColor: `${item.color}55`,
                boxShadow: "0 10px 28px rgba(16, 24, 40, 0.09)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "3px",
                bgcolor: item.color,
              },
            }}
          >
            <CardContent
              sx={{
                p: 2.5,
                "&:last-child": { pb: 2.5 },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#667085",
                      mb: 1.25,
                    }}
                  >
                    {item.label}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { xs: "30px", md: "34px" },
                      fontWeight: 750,
                      lineHeight: 1.15,
                      letterSpacing: "-1px",
                      color: "#101828",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {counts[item.key] ?? 0}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    bgcolor: item.background,
                    color: item.color,
                    "& svg": {
                      fontSize: 27,
                    },
                  }}
                >
                  {item.icon}
                </Box>
              </Stack>

              <Box
                sx={{
                  mt: 2.5,
                  pt: 1.5,
                  borderTop: "1px solid #F0F2F6",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#7A8496",
                  }}
                >
                  {item.subtitle}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default DashboardStats;
