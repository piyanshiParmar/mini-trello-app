import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { TextField, IconButton, Chip, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./styles/List.css";

export default function List({
  title,
  tasks,
  droppableId,
  theme,
  onTaskClick,
  handleDeleteTask,
  handleEditTask,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [deleteId, setDeleteId] = useState(null); 

  const handleSaveEdit = (id) => {
    const trimmed = editingText.trim();
    if (trimmed) {
      handleEditTask(id, trimmed);
      setEditingId(null);
      setEditingText("");
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          className={`list ${theme}`}
          ref={provided.innerRef} //Connects the DOM to the drag-and-drop library.
          {...provided.droppableProps} //Adds necessary props for drag-and-drop to work.
        >
          <h4>{title}</h4>
          <hr />
          {tasks.length === 0 && <p>No tasks yet...</p>}

          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  className="task-item"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps} //Special props that define where you can grab the item.
                  style={{ ...provided.draggableProps.style }}
                  onClick={() => {
                    if (editingId !== task.id) onTaskClick(task.id);
                  }}
                >
                  {editingId === task.id ? (
                    <div className="edit-mode">
                      <TextField
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        size="small"
                        autoFocus
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleSaveEdit(task.id)
                        }
                      />
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleSaveEdit(task.id)}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setEditingId(null)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <div className="task-actions">
                      <div className="task-text">
                        <span>{task.text}</span>

                        {task.dueDate && (
                          <small className="due-date">
                            📅 {new Date(task.dueDate).toLocaleDateString()}
                          </small>
                        )}

                        {task.priority && (
                          <Chip
                            label={task.priority}
                            color={getPriorityColor(task.priority)}
                            size="small"
                            className="priority-chip"
                          />
                        )}
                      </div>

                      <div className="task-icons">
                        <IconButton aria-label="edit task"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingId(task.id);
                            setEditingText(task.text);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="delete task"
                          size="small"
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteId(task.id); 
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
          <Dialog
            open={Boolean(deleteId)}
            onClose={() => setDeleteId(null)}
          >
            <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
            <DialogActions>
              <Button onClick={() => setDeleteId(null)}>Cancel</Button>
              <Button
                color="error"
                onClick={() => {
                  handleDeleteTask(deleteId);
                  setDeleteId(null);
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </Droppable>
  );
}
