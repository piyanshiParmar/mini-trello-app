# 📝 Mini Trello App (Task Manager)

A **React-based task management application** inspired by Trello.  
It allows you to create, edit, delete, drag-and-drop tasks across columns, switch between **light/dark themes**, and persist data in **localStorage**.

---

## 🚀 Live Demo
🔗 [Click here to view deployed app](https://piyu-mini-trello-app.vercel.app/)

---

## 📌 Features

✅ Add new tasks with **title, description, due date, and priority**  
✅ Edit or delete tasks with confirmation dialogs  
✅ Drag-and-drop tasks between columns (`Todo`, `In Progress`, `Done`)  
✅ Light/Dark theme toggle (stored in localStorage)  
✅ Task details page for editing  
✅ Persistent storage using **localStorage**  
✅ Responsive design with Material-UI  

---

## 🛠️ Tech Stack

- **React 18 + Vite**
- **React Router DOM** – for routing  
- **@mui/material** – for UI components  
- **@hello-pangea/dnd** – for drag-and-drop  
- **Context API** – for theme management  
- **localStorage** – for task persistence  

---

## 📂 Project Structure

src/
┣ 📂 context/
┃ ┗ ThemeContext.jsx # Provides theme context (light/dark)
┣ 📂 styles/
┃ ┣ Board.css
┃ ┣ List.css
┃ ┗ TaskDetails.css
┣ App.jsx # Routes setup
┣ Board.jsx # Main board (task lists & drag-drop)
┣ List.jsx # Each task column (Todo, In Progress, Done)
┣ TaskDetails.jsx # Task detail & edit page
┣ TaskInput.jsx # Input for adding new tasks
┣ main.jsx # App entry point with ThemeProvider + Router


---

## ⚡ Installation & Setup

### Clone the repository
```bash
git clone https://github.com/piyanshiParmar/mini-trello-app.git
cd mini-trello-app