import { Add, TaskAlt } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

function Navbar({ onAddTask }) {
  return (
    <AppBar position="sticky" elevation={0} sx={{
      bgcolor: "rgba(255,255,255,.88)", color: "#172033",
      borderBottom: "1px solid #e8ecf4", backdropFilter: "blur(16px)",
      top: 0, zIndex: 10
    }}>
      <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto", minHeight: "76px !important", px: { xs: 2, sm: 3 } }}>
        <Box sx={{ width: 42, height: 42, borderRadius: "14px", display: "grid", placeItems: "center",
          color: "#fff", background: "linear-gradient(135deg,#637cf6,#4358d9)", mr: 1.5,
          boxShadow: "0 7px 16px rgba(75,98,226,.24)" }}>
          <TaskAlt sx={{ fontSize: 25 }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: 18, lineHeight: 1.25, letterSpacing: "-.04em" }}>
            SmartTask <Box component="span" sx={{ color: "#5269e8" }}>AI</Box>
          </Typography>
          <Typography sx={{ fontSize: 11, color: "#818ba2", fontWeight: 600, letterSpacing: ".035em" }}>
            YOUR PRODUCTIVITY WORKSPACE
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" startIcon={<Add />} onClick={onAddTask}
          sx={{ borderRadius: "12px", px: 2.2, py: 1.15, boxShadow: "0 6px 15px rgba(77,98,225,.22)",
            background: "linear-gradient(135deg,#637cf6,#455cde)", "&:hover": { background: "linear-gradient(135deg,#526be8,#354bc9)", boxShadow: "0 8px 18px rgba(77,98,225,.28)" } }}>
          Add task
        </Button>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
