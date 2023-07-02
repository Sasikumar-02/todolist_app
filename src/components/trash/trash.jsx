import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../completed/completed';

export const Trash = ({ deletedTasks, handleToggleComplete}) => {
  return (
    <div className="todolist-new">
      <h2 style={{ textAlign: 'center', color:"white" }}>Deleted task</h2>
      {deletedTasks.map(task => (
        <div key={task.id} className='task-item'>
          <div className='task-item__check'>
            <FontAwesomeIcon icon={faTrash} onClick={() => handleToggleComplete(task.id)} />
          </div>
          <div className='task-item__date'>
            <h3>{task.reminder}</h3>
          </div>
          <div className='task-item__description'>
            <h2 style={{color:"black"}}>{task.name}</h2>
          </div>
          <div className='task-item__location'>
            <h3>{task.location}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trash;
