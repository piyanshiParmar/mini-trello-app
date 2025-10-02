import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, TextField, MenuItem, Chip } from "@mui/material";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedDesc, setEditedDesc] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedPriority, setEditedPriority] = useState("Low");

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const t = tasks.find((x) => x.id === id);
    if (t) {
      setTask(t);
      setEditedText(t.text);
      setEditedDesc(t.description || "");
      setEditedDate(t.dueDate || "");
      setEditedPriority(t.priority || "Low");
    }
  }, [id]);

  function handleSave() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updated = tasks.map((t) =>
      t.id === id
        ? {
            ...t,
            text: editedText,
            description: editedDesc,
            dueDate: editedDate,
            priority: editedPriority,
          }
        : t
    );
    localStorage.setItem("tasks", JSON.stringify(updated));
    navigate("/");
  }

  if (!task) return <h3>Task not found!</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Task</h2>

      {/* 🔹 Show priority badge */}
      <Chip
        label={`Priority: ${editedPriority}`}
        color={
          editedPriority === "High"
            ? "error"
            : editedPriority === "Medium"
            ? "warning"
            : "success"
        }
        style={{ marginBottom: "15px", fontWeight: "bold" }}
      />

      <TextField
        label="Task Title"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={editedDesc}
        onChange={(e) => setEditedDesc(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        label="Due Date"
        type="date"
        value={editedDate}
        onChange={(e) => setEditedDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Priority"
        select
        value={editedPriority}
        onChange={(e) => setEditedPriority(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </TextField>

      <div style={{ marginTop: "10px" }}>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
