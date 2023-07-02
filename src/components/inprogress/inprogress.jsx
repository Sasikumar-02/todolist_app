import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck, faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import '../../components/todo.css';
import './inprogress.css';

export const Inprogress = ({ tasks, handleToggleComplete, handleDeleteTask, handleEditTask }) => {
  const [editedTask, setEditedTask] = useState('');

  const handleEditClick = (taskId, taskName) => {
    setEditedTask({ id: taskId, name: taskName });
  };

  const handleSaveClick = () => {
    handleEditTask(editedTask.id, editedTask.name);
    setEditedTask('');
  };

  const handleInputChange = (e) => {
    setEditedTask({ ...editedTask, name: e.target.value });
  };

  const renderTaskItem = (task) => {
    const isEditing = editedTask.id === task.id;

    if (isEditing) {
      return (
        <div key={task.id} className='task-item'>
          <input
            type='text'
            value={editedTask.name}
            onChange={handleInputChange}
          />
          <FontAwesomeIcon
            icon={faSave}
            className='edit-icon'
            onClick={handleSaveClick}
          />
        </div>
      );
    } else {
      return (
        <div key={task.id} className='task-item'>
          <div
            className='task-item__check'
            onClick={() => handleToggleComplete(task.id)}
          >
            {task.completed ? (
              <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
            ) : (
              <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
            )}
          </div>
          <div className='task-item__date'>
            <h3>{task.reminder}</h3>
          </div>
          <div className='task-item__description'>
            <h2 style={{ color: 'black' }}>{task.name}</h2>
          </div>
          <div className='task-item__location'>
            <h3>{task.location}</h3>
          </div>
          <FontAwesomeIcon
            icon={faEdit}
            className='edit-icon'
            onClick={() => handleEditClick(task.id, task.name)}
            size='lg'
          />
          <FontAwesomeIcon
            icon={faTrash}
            className='delete-icon'
            onClick={() => handleDeleteTask(task.id)}
          />
        </div>
      );
    }
  };

  return (
    <div className='todolist-new'>
      <h2 style={{ textAlign: 'center', color: 'white' }}>Progress task</h2>
      {tasks.map((task) => renderTaskItem(task))}
    </div>
  );
};

export default Inprogress;
