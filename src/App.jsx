/* eslint-disable no-extra-boolean-cast */
import { useEffect, useMemo, useState } from "react";
import { Alert, Box, Container, Stack, Typography } from "@mui/material";
// import { AutoAwesome } from "@mui/icons-material";

import Navbar from "./components/Navbar";
import DashboardStats from "./components/DashboardStats";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import TaskFormDialog from "./components/TaskFormDialog";

import { createTask, updateTask, deleteTask } from "./api/tasks";

const emptyForm = {
  title: "",
  description: "",
  priority: "Medium",
  due_date: "",
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Fetch tasks from FastAPI

  // const [tasks, setTasks] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/tasks");

      if (!response.ok) {
        throw new Error(`API failed: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("The API did not return a task list.");
      }

      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.message || "Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, []);

  // Calculate dashboard counts
  const counts = useMemo(
    () => ({
      total: tasks.length,
      pending: tasks.filter((task) => !task.completed).length,
      completed: tasks.filter((task) => task.completed).length,
      high: tasks.filter((task) => task.priority === "High" && !task.completed)
        .length,
    }),
    [tasks],
  );

  // Search and filter tasks
  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        (task.description || "").toLowerCase().includes(query);

      const matchesFilter =
        filter === "All" ||
        (filter === "Pending" && !task.completed) ||
        (filter === "Completed" && task.completed);

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  // Open the form for a new task
  const handleAddTask = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setError("");
    setNotice("");
    setDialogOpen(true);
  };

  // Open the form with existing task data
  const handleEditTask = (task) => {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description || "",
      priority: task.priority || "Medium",
      due_date: task.due_date || "",
    });
    setError("");
    setNotice("");
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    if (saving) return;

    setDialogOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  // Update a form field
  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Create or update a task
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");

    const title = form.title.trim();

    if (!title) {
      setError("Please enter a task title.");
      return;
    }

    const payload = {
      title,
      description: form.description.trim(),
      priority: form.priority,
      due_date: form.due_date || null,
    };

    setSaving(true);

    try {
      if (editingId !== null) {
        await updateTask(editingId, payload);
        setNotice("Task updated successfully.");
      } else {
        await createTask(payload);
        setNotice("Task created successfully.");
      }

      setDialogOpen(false);
      setEditingId(null);
      setForm({ ...emptyForm });

      await fetchTasks();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to save the task. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  // Toggle task completion
  const handleToggleTask = async (task) => {
    setError("");
    setNotice("");

    try {
      // PUT endpoints commonly validate the full task model, so send the
      // existing task fields together with the changed completion flag.
      await updateTask(task.id, {
        title: task.title,
        description: task.description || "",
        priority: task.priority || "Medium",
        due_date: task.due_date || null,
        completed: !Boolean(task.completed),
      });

      // Refresh from the API after a successful update.
      await fetchTasks();

      setNotice(
        task.completed
          ? "Task marked as pending."
          : "Task marked as completed.",
      );
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(
        (typeof detail === "string" && detail) ||
          (Array.isArray(detail) && detail.map((item) => item.msg).filter(Boolean).join("; ")) ||
          err.message ||
          "Unable to update task status. Check that the backend is running and the task update endpoint accepts PUT requests."
      );
    }
  };

  // Delete a task
  const handleDeleteTask = async (task) => {
    const confirmed = window.confirm(
      `Delete "${task.title}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    setError("");
    setNotice("");

    try {
      await deleteTask(task.id);

      setTasks((previous) => previous.filter((item) => item.id !== task.id));

      setNotice("Task deleted successfully.");
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to delete the task.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F5F7FB" }}>
      <Navbar onAddTask={handleAddTask} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={1}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
          >
            <Box>
              <Typography variant="h5" fontWeight={800} color="#172B4D" >
                My Tasks
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Organize your work and make progress every day.
              </Typography>
            </Box>

            {/* <Chip
              icon={<AutoAwesome />}
              label="AI planning — Phase 3"
              color="primary"
              variant="outlined"
            /> */}
          </Stack>

          {error && (
            <Alert severity="error" onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          {notice && (
            <Alert severity="success" onClose={() => setNotice("")}>
              {notice}
            </Alert>
          )}

          <DashboardStats counts={counts} />

          <TaskFilters
            search={search}
            onSearchChange={setSearch}
            filter={filter}
            onFilterChange={setFilter}
          />

          <Box>
            <TaskList
              tasks={visibleTasks}
              loading={loading}
              onAddTask={handleAddTask}
              onToggle={handleToggleTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          </Box>
        </Stack>
      </Container>

      <TaskFormDialog
        open={dialogOpen}
        editingId={editingId}
        form={form}
        saving={saving}
        error={error}
        onClose={handleCloseDialog}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}

export default App;
