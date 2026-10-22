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
      width: "100%",
      maxWidth: "520px",
      m: { xs: 1.5, sm: 2 },
      maxHeight: "min(88dvh, 760px)",
      borderRadius: { xs: "14px", sm: "18px" },
      border: "1px solid #E8ECF3",
      boxShadow: "0 20px 60px rgba(25, 40, 80, 0.16)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      bgcolor: "#FFFFFF",
    },
  }}
  sx={{
    "& .MuiDialog-container": {
      alignItems: "center",
    },
    "& .MuiDialog-paper": {
      m: { xs: 1.5, sm: 2 },
    },
  }}
>
  <form
    onSubmit={onSubmit}
    style={{
      display: "flex",
      flexDirection: "column",
      minHeight: 0,
      flex: 1,
    }}
  >
    {/* Header */}
    <DialogTitle
      sx={{
        px: { xs: 2.5, sm: 3 },
        py: 2.25,
        flexShrink: 0,
        borderBottom: "1px solid #EDF0F6",
        bgcolor: "#FAFBFF",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.75}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            borderRadius: "13px",
            bgcolor: "#EEF1FF",
            color: "#5266D9",
            border: "1px solid #E0E5FF",
          }}
        >
          {editingId !== null ? (
            <AutoAwesomeIcon fontSize="small" />
          ) : (
            <AddIcon fontSize="small" />
          )}
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 750,
              color: "#202B45",
              lineHeight: 1.4,
              letterSpacing: "-0.3px",
            }}
          >
            {editingId !== null ? "Edit task" : "Create task"}
          </Typography>

          <Typography
            sx={{
              mt: 0.4,
              fontSize: 12.5,
              lineHeight: 1.5,
              color: "#7A8499",
            }}
          >
            {editingId !== null
              ? "Update your task details"
              : "Add details to get started"}
          </Typography>
        </Box>
      </Stack>
    </DialogTitle>

    {/* Scrollable Form Content */}
    <DialogContent
      sx={{
        px: { xs: 2.5, sm: 3 },
        py: 3,
        flex: "1 1 auto",
        minHeight: 0,
        overflowY: "auto",
        bgcolor: "#FFFFFF",
        "&:first-of-type": {
          pt: 3,
        },
      }}
    >
      <Stack spacing={2.5}>
        {/* Error Messages */}
        {error && (
          <Alert
            severity="error"
            sx={{
              borderRadius: "10px",
              py: 0.25,
              "& .MuiAlert-message": {
                fontSize: 12.5,
                overflowWrap: "anywhere",
              },
            }}
          >
            {error}
          </Alert>
        )}

        {aiError && (
          <Alert
            severity="error"
            onClose={() => setAiError("")}
            sx={{
              borderRadius: "10px",
              py: 0.25,
              "& .MuiAlert-message": {
                fontSize: 12.5,
                overflowWrap: "anywhere",
              },
            }}
          >
            {aiError}
          </Alert>
        )}

        {/* Task Title */}
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
          placeholder="e.g. Design landing page"
          sx={{
            "& .MuiOutlinedInput-root": {
              minHeight: 44,
              borderRadius: "10px",
              fontSize: 13.5,
              "& fieldset": {
                borderColor: "#DDE3EE",
              },
              "&:hover fieldset": {
                borderColor: "#A9B6D3",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#5266D9",
                borderWidth: "1.5px",
              },
            },
            "& .MuiInputLabel-root": {
              fontSize: 13,
              color: "#78839A",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#5266D9",
            },
          }}
        />

        {/* Description */}
        <Box>
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={onChange}
            multiline
            minRows={3}
            maxRows={5}
            fullWidth
            size="small"
            placeholder="Describe what needs to be done..."
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                fontSize: 13.5,
                lineHeight: 1.65,
                alignItems: "flex-start",
                "& fieldset": {
                  borderColor: "#DDE3EE",
                },
                "&:hover fieldset": {
                  borderColor: "#A9B6D3",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5266D9",
                  borderWidth: "1.5px",
                },
              },
              "& .MuiInputLabel-root": {
                fontSize: 13,
                color: "#78839A",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#5266D9",
              },
            }}
          />

          {/* AI Assistance */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
            spacing={1.25}
            sx={{ mt: 1.5 }}
          >
            <Typography
              sx={{
                fontSize: 11.5,
                lineHeight: 1.6,
                color: "#8993A7",
                flex: 1,
              }}
            >
              Need help writing? Let AI improve your description.
            </Typography>

            <Button
              type="button"
              onClick={handleImproveDescription}
              disabled={aiLoading || saving}
              startIcon={
                aiLoading ? (
                  <CircularProgress size={14} color="inherit" />
                ) : (
                  <AutoAwesomeIcon sx={{ fontSize: 17 }} />
                )
              }
              size="small"
              variant="outlined"
              sx={{
                flexShrink: 0,
                alignSelf: { xs: "flex-start", sm: "center" },
                textTransform: "none",
                fontSize: 12,
                fontWeight: 700,
                color: "#5266D9",
                bgcolor: "#F3F5FF",
                borderColor: "#E0E5FF",
                borderRadius: "9px",
                px: 1.5,
                py: 0.65,
                minHeight: 34,
                "&:hover": {
                  bgcolor: "#E9EDFF",
                  borderColor: "#C8D1FF",
                },
                "&.Mui-disabled": {
                  color: "#9AA4BD",
                },
              }}
            >
              {aiLoading ? "Improving..." : "Improve with AI"}
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: "#EDF0F6" }} />

        {/* Task Settings */}
        <Box>
          <Typography
            sx={{
              mb: 1.5,
              fontSize: 12,
              fontWeight: 700,
              color: "#47536B",
              letterSpacing: "0.2px",
            }}
          >
            Task settings
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              "& .MuiFormControl-root": {
                minWidth: 0,
                flex: 1,
              },
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel id="priority-label">
                Priority
              </InputLabel>

              <Select
                labelId="priority-label"
                name="priority"
                value={form.priority}
                label="Priority"
                onChange={onChange}
                sx={{
                  minHeight: 44,
                  borderRadius: "10px",
                  fontSize: 13,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#DDE3EE",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#A9B6D3",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#5266D9",
                  },
                }}
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  minHeight: 44,
                  borderRadius: "10px",
                  fontSize: 13,
                  "& fieldset": {
                    borderColor: "#DDE3EE",
                  },
                  "&:hover fieldset": {
                    borderColor: "#A9B6D3",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#5266D9",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontSize: 13,
                },
              }}
            />
          </Stack>
        </Box>
      </Stack>
    </DialogContent>

    {/* Footer */}
    <DialogActions
      sx={{
        flexShrink: 0,
        px: { xs: 2.5, sm: 3 },
        py: 2,
        gap: 1.25,
        borderTop: "1px solid #EDF0F6",
        bgcolor: "#FAFBFE",
        justifyContent: "flex-end",
      }}
    >
      <Button
        onClick={handleClose}
        disabled={saving || aiLoading}
        color="inherit"
        size="medium"
        sx={{
          minHeight: 40,
          textTransform: "none",
          fontSize: 13,
          fontWeight: 650,
          color: "#667085",
          border: "1px solid #E0E5ED",
          borderRadius: "10px",
          px: 2,
          "&:hover": {
            bgcolor: "#F0F2F7",
            borderColor: "#CDD4E0",
          },
        }}
      >
        Cancel
      </Button>

      <Button
        type="submit"
        variant="contained"
        disabled={saving || aiLoading}
        size="medium"
        startIcon={
          saving ? (
            <CircularProgress size={15} color="inherit" />
          ) : (
            editingId !== null ? (
              <AutoAwesomeIcon sx={{ fontSize: 17 }} />
            ) : (
              <AddIcon fontSize="small" />
            )
          )
        }
        sx={{
          minHeight: 40,
          textTransform: "none",
          fontSize: 13,
          fontWeight: 700,
          borderRadius: "10px",
          px: 2.25,
          bgcolor: "#5266D9",
          boxShadow: "0 3px 8px rgba(82, 102, 217, 0.18)",
          "&:hover": {
            bgcolor: "#4054C4",
            boxShadow: "0 4px 12px rgba(82, 102, 217, 0.25)",
          },
          "&.Mui-disabled": {
            bgcolor: "#C9D0E9",
            color: "#FFFFFF",
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
