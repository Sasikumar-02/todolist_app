import React, { useState } from "react";
import './App.css';

function App() {
    const [todoList, setTodoList]= useState([]);
    const [newTask, setNewTask] = useState("");

    const handleNewTask = (event) => {
        setNewTask(event.target.value);
    }

    const addTask = () => {
      const task = {
        id: todoList.length ===0 ? 1: todoList[todoList.length -1].id +1,
        taskName: newTask,
        completed: false,
      };
      setTodoList([...todoList, task]);
    }

    const deleteTask = (id)=> {
      setTodoList(todoList.filter((task)=>task.id !== id))
      //const newtodoList = todoList.filter((task) => {
        // approach 1)if(task===taskName){
        //   return false;
        // }
        // else{
        //   return true;
        // }
        // approach 2) return task!==taskName  
      //})
      //setTodoList(newtodoList);
    }

    const handleCompleteTask = (id) =>{
      setTodoList(
        todoList.map((task)=> {
          if(task.id === id) {
            return {...task, completed: true};
          }
          else{
            return task;
          }
      }))
    }

    //todoList.map(()=>{}) -> syntax for callback funtion
    return ( 
        <div className="App">
            <input type="text" placeholder="Enter task here" onChange={handleNewTask}/>
            <button onClick={addTask}>Add Task</button>
            {todoList.map((task)=> {
              return (
              <div style={{color: task.completed ? "green": "black"}}>
                <h1>{task.taskName}</h1>
                <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
              )
            })}
        </div>
        
    )
    
}

export default App;