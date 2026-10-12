import { useState } from "react";

import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { improveTaskDescription } from "../api/ai";

function TaskFormDialog({ open, editingId, form, saving, error, onClose, onChange, onSubmit, }) {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const handleImproveDescription = async () => {
    if (!form.title?.trim()) {
      setAiError("Please enter a task title first.");
      return;
    }

    setAiLoading(true);
    setAiError("");

    try {
      const suggestion = await improveTaskDescription(
        form.title.trim(),
        form.description || "",
      );

      // Update the description using the existing App.jsx handler.
      onChange({
        target: {
          name: "description",
          value: suggestion,
        },
      });
    } catch (err) {
      setAiError(
        err.response?.data?.detail ||
        "Unable to generate a description. Please try again.",
      );
    } finally {
      setAiLoading(false);
    }
  };

  const handleClose = () => {
    setAiError("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          maxHeight: "85dvh",
          boxShadow: "0 12px 40px rgba(25, 40, 80, 0.14)",
          border: "1px solid #E8ECF3",
          overflow: "hidden",
        },
      }}
      sx={{
        "& .MuiDialog-paper": { m: 1.5 },
      }}
    >
      <form onSubmit={onSubmit}>
        {/* Compact header */}
        <DialogTitle
          sx={{
            px: 2.5,
            py: 1.75,
            borderBottom: "1px solid #EEF0F5",
            bgcolor: "#FAFBFE",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Box
              sx={{
                width: 38,
                height: 38,
                display: "grid",
                placeItems: "center",
                borderRadius: "11px",
                bgcolor: "#EEF1FF",
                color: "#5266D9",
              }}
            >
              {editingId !== null ? (
                <AutoAwesomeIcon fontSize="small" />
              ) : (
                <AddIcon fontSize="small" />
              )}
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 750,
                  color: "#202B45",
                  lineHeight: 1,

                }}
              >
                {editingId !== null ? "Edit task" : "Create task"}
              </Typography>

              <Typography sx={{ fontSize: 12, color: "#7A8499" }}>
                {editingId !== null
                  ? "Update your task details"
                  : "Add details to get started"}
              </Typography>
            </Box>
          </Stack>
        </DialogTitle>

        {/* Compact form */}
        <DialogContent
          sx={{
            px: 2.5,
            py: 2,
            mt:2,
            overflowY: "auto",
            "& .MuiOutlinedInput-root": {
              borderRadius: "9px",
              fontSize: 13,
            },
            "& .MuiInputLabel-root": {
              fontSize: 13,
            },
          }}
        >
          <Stack spacing={1.75}>
            {error && (
              <Alert severity="error" sx={{ py: 0, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {aiError && (
              <Alert
                severity="error"
                onClose={() => setAiError("")}
                sx={{ py: 0, borderRadius: 2 }}
              >
                {aiError}
              </Alert>
            )}

            <TextField
              label="Task title"
              name="title"
              value={form.title}
              onChange={onChange}
              required
              autoFocus
              fullWidth
              size="small"
             
            inputProps={{ maxLength: 200 }}
            placeholder="Enter task title"
        
        />

            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={onChange}
              multiline
              minRows={2}
              maxRows={3}
              fullWidth
              size="small"
              placeholder="Add a short description..."
            />

            <Box>
              <Button
                type="button"
                onClick={handleImproveDescription}
                disabled={aiLoading || saving}
                startIcon={
                  aiLoading ? (
                    <CircularProgress size={14} color="inherit" />
                  ) : (
                    <AutoAwesomeIcon sx={{ fontSize: 16 }} />
                  )
                }
                size="small"
                sx={{
                  textTransform: "none",
                  fontSize: 12,
                  fontWeight: 650,
                  color: "#5266D9",
                  borderRadius: "8px",
                  px: 1,
                  minHeight: 30,
                  bgcolor: "#F3F5FF",
                  "&:hover": { bgcolor: "#E9EDFF" },
                }}
              >
                {aiLoading ? "Generating..." : "Improve with AI"}
              </Button>
            </Box>

            <Divider sx={{ borderColor: "#EEF0F5" }} />

            <Stack direction="row" spacing={1.5}>
              <FormControl fullWidth size="small">
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  name="priority"
                  value={form.priority}
                  label="Priority"
                  onChange={onChange}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Due date"
                name="due_date"
                type="date"
                value={form.due_date}
                onChange={onChange}
                fullWidth
                size="small"
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
            </Stack>
          </Stack>
        </DialogContent>

        {/* Compact footer */}
        <DialogActions
          sx={{
            px: 2.5,
            py: 1.5,
            gap: 1,
            borderTop: "1px solid #EEF0F5",
            bgcolor: "#FAFBFD",
          }}
        >
          <Button
            onClick={handleClose}
            disabled={saving || aiLoading}
            color="inherit"
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "9px",
              px: 1.75,
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={saving || aiLoading}
            size="small"
            startIcon={
              saving ? (
                <CircularProgress size={14} color="inherit" />
              ) : (
                <AddIcon fontSize="small" />
              )
            }
            sx={{
              textTransform: "none",
              fontWeight: 650,
              borderRadius: "9px",
              px: 2,
              py: 0.8,
              bgcolor: "#5266D9",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#4054C4",
                boxShadow: "none",
              },
            }}
          >
            {saving
              ? "Saving..."
              : editingId !== null
                ? "Save changes"
                : "Create task"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default TaskFormDialog;
