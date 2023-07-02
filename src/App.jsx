import React, { useState, useEffect } from 'react';
import { TodoApp } from './components/todo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inprogress from './components/inprogress/inprogress';
import { Completed } from './components/completed/completed';
import { Trash } from './components/trash/trash';
import { Navbar } from './components/navbar/navbar';

export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);


  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // const handleLogin = (response) => {
  //   setIsLoggedIn(true);
  //   // Perform any necessary operations after successful login
  //   console.log('Logged in:', response);
  //   navigate('/todo-list'); // Use navigate to navigate to '/todo-list' route
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   // Perform any necessary operations after logout
  //   console.log('Logged out');
  // };

  const handleToggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, completed: !task.completed };
          return updatedTask;
        }
        return task;
      })
    );
  };

  useEffect(() => {
    const completed = tasks.filter((task) => task.completed);
    setCompletedTasks(completed);
  }, [tasks]);

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    const deletedTask = tasks.find((task) => task.id === id);
    setDeletedTasks((prevDeletedTasks) => [...prevDeletedTasks, deletedTask]);
  };

  const handleEditTask = (taskId, newName) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, name: newName } : task
      )
    );
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <TodoApp
              tasks={tasks}
              setTasks={setTasks}
              handleToggleComplete={handleToggleComplete}
              handleDeleteTask={handleDeleteTask}
              handleEditTask={handleEditTask}
            />
          }
        />
        <Route
          path="/inprogress"
          element={<Inprogress tasks={tasks} handleToggleComplete={handleToggleComplete} handleDeleteTask={handleDeleteTask} />}
        />
        <Route
          path="/completed"
          element={<Completed tasks={completedTasks} handleToggleComplete={handleToggleComplete} handleDeleteTask={handleDeleteTask} />}
        />
        <Route path="/trash" element={<Trash deletedTasks={deletedTasks} handleToggleComplete={handleToggleComplete} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
