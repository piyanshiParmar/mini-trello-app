import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import TaskInput from "./TaskInput";
import List from "./List";
import { DragDropContext } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";
import "./styles/Board.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export default function Board() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();
  // const [openDialog, setOpenDialog] = useState(false);
  // const [taskToDelete, setTaskToDelete] = useState(null);

  // Load tasks
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // const handleOpenDialog = (taskId) => {
  //   setTaskToDelete(taskId);
  //   setOpenDialog(true);
  // };
  
  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  //   setTaskToDelete(null);
  // };
  
  // const handleConfirmDelete = () => {
  //   setTasks((prev) => prev.filter((t) => t.id !== taskToDelete));
  //   handleCloseDialog();
  // };
  
  function handleAddTask() {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        text: newTask,
        status: "todo",
        description: "",
        dueDate: "",     
        priority: "Low", 
      },
    ]);
    setNewTask("");
  }
  
  function handleDeleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function handleEditTask(id, newText) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  }

  function handleDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    setTasks((prevTasks) => {
      const updated = [...prevTasks];
      const taskIndex = updated.findIndex((t) => t.id === draggableId);
      const task = updated[taskIndex];
      updated.splice(taskIndex, 1);
      const tasksInDestination = updated.filter(
        (t) => t.status === destination.droppableId
      );
      const insertIndex = updated.findIndex(
        (t, idx) =>
          t.status === destination.droppableId &&
          tasksInDestination.indexOf(t) === destination.index
      );
      const newTask = { ...task, status: destination.droppableId };
      if (insertIndex === -1) {
        updated.push(newTask);
      } else {
        updated.splice(insertIndex, 0, newTask);
      }
      return updated;
    });
  }
  
  return (
    <div className={`board ${theme}`}>
      <h3>TASK MANAGER</h3>

      <div className="theme-toggle">
        <Button
          variant="outlined"
          onClick={toggleTheme}
          startIcon={theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </div>

      <TaskInput newTask={newTask} setNewTask={setNewTask} handleAddTask={handleAddTask} />

      {/* DragDropContext = the whole playground where dragging is allowed.
      Inside it → you put Droppable (lists/columns).
      Inside each Droppable → you put Draggable (items/cards/tasks). */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="lists-container">
          {["todo", "inprogress", "done"].map((status) => (
            <List
              key={status}
              title={status === "todo" ? "Todo" : status === "inprogress" ? "In Progress" : "Done"}
              tasks={tasks.filter((t) => t.status === status)}
              droppableId={status}
              theme={theme}
              onTaskClick={(id) => navigate(`/task/${id}`)}
              handleDeleteTask={handleDeleteTask}
              handleEditTask={handleEditTask}
            />
          ))}
        </div>
      </DragDropContext>
      
      {/* <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title"    aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Delete Task?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog> */}

    </div>
  );
}

