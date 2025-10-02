import Board from "./Board";
import { Routes, Route } from "react-router-dom";
import TaskDetails from "./TaskDetails";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Board />} />
      <Route path="/task/:id" element={<TaskDetails />} />
    </Routes>

  )
}

export default App
