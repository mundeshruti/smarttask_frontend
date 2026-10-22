/* eslint-disable no-unused-vars */
import {
  AppBar, Box, Button,
  Chip,
  Stack,
  Toolbar, Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import { alpha } from "@mui/material/styles";

function Navbar({ onAddTask }) {
  const primary = "#5746E8";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 1100,
        color: "#18213A",
        backgroundColor: alpha("#FFFFFF", 0.88),
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid #E8EAF3",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1440,
          width: "100%",
          mx: "auto",
          minHeight: "78px !important",
          px: { xs: 2, sm: 3, md: 4 },
          gap: 2,
        }}
      >
        {/* Brand */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ flexShrink: 0 }}
        >
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: "15px",
              display: "grid",
              placeItems: "center",
              color: "#FFFFFF",
              background:
                "linear-gradient(145deg, #8075FF 0%, #5846E8 55%, #4433CB 100%)",
              boxShadow: "0 6px 16px rgba(87,70,232,0.25)",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 1,
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.25)",
                pointerEvents: "none",
              },
            }}
          >
            <TaskAltRoundedIcon sx={{ fontSize: 28 }} />
          </Box>

          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.7}
            >
              <Typography
                sx={{
                  fontSize: { xs: 19, sm: 21 },
                  fontWeight: 850,
                  letterSpacing: "-0.9px",
                  lineHeight: 1.2,
                  color: "#17213A",
                }}
              >
                SmartTask
              </Typography>

              <Box
                sx={{
                  px: 0.8,
                  py: 0.3,
                  borderRadius: "6px",
                  background:
                    "linear-gradient(135deg, #7465F5, #5140D8)",
                  color: "#FFFFFF",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: ".5px",
                }}
              >
                AI
              </Box>
            </Stack>

            <Typography
              sx={{
                mt: 0.45,
                fontSize: 10,
                color: "#8490A8",
                fontWeight: 700,
                letterSpacing: "1.15px",
                display: { xs: "none", sm: "block" },
              }}
            >
              YOUR WORKSPACE, SIMPLIFIED
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        {/* AI status */}
        <Chip
          icon={
            <AutoAwesomeRoundedIcon
              sx={{ fontSize: "16px !important" }}
            />
          }
          label="AI Workspace"
          size="small"
          sx={{
            display: { xs: "none", sm: "flex" },
            height: 32,
            borderRadius: "9px",
            color: "#5B4BDA",
            background: "#F2F0FF",
            border: "1px solid #E5E0FF",
            fontWeight: 700,
            fontSize: 12,
            "& .MuiChip-icon": {
              color: "#6C5CE7",
              ml: 1,
            },
          }}
        />

        {/* Workspace indicator */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
          sx={{
            display: { xs: "none", md: "flex" },
            px: 1.5,
            py: 1,
            borderRadius: "10px",
            backgroundColor: "#F8FAFC",
            border: "1px solid #EEF0F5",
          }}
        >
          <CircleRoundedIcon
            sx={{
              fontSize: 8,
              color: "#16A36A",
            }}
          />
          <Typography
            sx={{
              fontSize: 12,
              color: "#647087",
              fontWeight: 600,
            }}
          >
            Workspace active
          </Typography>
        </Stack>

        {/* Create task */}
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={onAddTask}
          sx={{
            minHeight: 43,
            px: { xs: 1.5, sm: 2.25 },
            borderRadius: "12px",
            textTransform: "none",
            fontSize: 13,
            fontWeight: 750,
            letterSpacing: ".1px",
            whiteSpace: "nowrap",
            color: "#FFFFFF",
            background:
              "linear-gradient(135deg, #7163F6 0%, #5746E8 55%, #4938D2 100%)",
            boxShadow: "0 5px 13px rgba(87,70,232,0.23)",
            transition: "all .2s ease",
            "&:hover": {
              background:
                "linear-gradient(135deg, #6253EA 0%, #4938D2 100%)",
              boxShadow: "0 8px 20px rgba(87,70,232,0.32)",
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
            "& .MuiButton-startIcon": {
              mr: 0.75,
            },
          }}
        >
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Create Task
          </Box>
          <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
            Add Task
          </Box>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
