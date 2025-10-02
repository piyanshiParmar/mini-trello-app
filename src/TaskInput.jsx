import { TextField, Button } from "@mui/material";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react"; 

export default function TaskInput({ newTask, setNewTask, handleAddTask }) {
  const { theme } = useContext(ThemeContext);  
  return (
    <div className="add-task" style={{marginLeft: "15px"}}>
      <TextField
        label="Enter Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        size="small"
        InputLabelProps={{
          style: {
            color: theme === "dark" ? "white" : "black", 
          },
        }}
        InputProps={{
          style: {
            color: theme === "dark" ? "white" : "black", 
            backgroundColor: theme === "dark" ? "#333" : "white", 
          },
        }}
      />
      <Button variant="contained" onClick={handleAddTask}>
        Add Task
      </Button>
    </div>
  );
}
