import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../components/todo.css';
import './completed.css';
export const Completed = ({ tasks, handleDeleteTask }) => {
  return (
    <div className='todolist-new'>
      <h2 style={{ textAlign: 'center', color:"white" }}>Completed task</h2>
      {tasks.map(task => (
        <div key={task.id} className='task-item'>
            <div className='task-item__date'>
              <h3>{task.reminder}</h3>
            </div>
          <div className='task-item__description'>
            <h2 style={{color:"black"}}>{task.name}</h2>
          </div>
          <div className='task-item__location'>
              <h3>{task.location}</h3>
            </div>
            <FontAwesomeIcon
                icon={faTrash}
                className="delete-icon"
                onClick={() => handleDeleteTask(task.id)}
            />


        </div>
      ))}
    </div>
  );
};

export default Completed;
