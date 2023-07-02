import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import audioFile from '../assets/audio.mp3';
import Inprogress from './inprogress/inprogress';
import '../components/todoform.css';

export const TodoApp = ({ tasks, setTasks, handleToggleComplete, handleDeleteTask, handleEditTask}) => {
  const [newTask, setNewTask] = useState('');
  const [reminder, setReminder] = useState('');
  const [location, setLocation] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [timeoutIds, setTimeoutIds] = useState([]);
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() === '' || reminder.trim() === '' || location.trim() === '') {
      return; // Prevent adding task if any field is empty
    }
    const task = {
      id: uuidv4(),
      name: newTask,
      reminder,
      location,
      placeName,
      completed: false,
    };

    setTasks(prevTasks => [...prevTasks, task]);
    setNewTask('');
    setReminder('');
    setLocation('');
    setPlaceName('');
    setReminderTimeout(task); // Set reminder timeout for the task
  };

  const setReminderTimeout = task => {
    const reminderTime = new Date(task.reminder).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = reminderTime - currentTime;

    if (timeDifference > 0) {
      const id = setTimeout(() => {
        handleReminder(task);
      }, timeDifference);
      setTimeoutIds(prevTimeoutIds => [...prevTimeoutIds, id]);
    }
  };

  const handleReminder = task => {
    const audio = new Audio(audioFile);
    audio.addEventListener('canplaythrough', () => {
      audio.play();
      alert(`Reminder: ${task.name}`);
      removeReminder(task.id);
    });
  };

  const removeReminder = id => {
    clearTimeouts();
    setTimeoutIds(prevTimeoutIds =>
      prevTimeoutIds.filter(timeoutId => timeoutId !== id)
    );
  };

  const clearTimeouts = () => {
    timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
  };

  const handleMapClick = () => {
    const mapWindow = window.open(
      `https://www.google.com/maps`,
      'Google Maps',
      'width=800,height=600'
    );

    const handleLocationSelection = event => {
      const latitude = event.latLng.lat();
      const longitude = event.latLng.lng();
      setLocation(`${latitude}, ${longitude}`);
      getLocationName(latitude, longitude);

      if (mapWindow) {
        try {
          const isClosed = mapWindow.closed;
          if (!isClosed) {
            mapWindow.close();
          }
        } catch (error) {
          // Handle the error case
          console.error('Error accessing window.closed:', error);
        }
      }
    };

    mapWindow.addEventListener('mouseup', handleLocationSelection);
  };

  const getLocationName = (latitude, longitude) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLng = new window.google.maps.LatLng(latitude, longitude);
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setPlaceName(results[0].formatted_address);
      }
    });
  };

  const handleSetLocation = () => {
    const encodedLocation = encodeURIComponent(placeName);
    const mapUrl = `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
    window.open(mapUrl, '_blank');
  };

  return (
    <React.Fragment>
      <div className='todo'>
            <div className='todolist__controls'>
              <div className='todolist__control'>
                <label htmlFor='title'>Title</label>
                <input
                  type="text"
                  placeholder="Add Task"
                  value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                  required
                />
              </div>
              <div className='todolist__control'>
                <label htmlFor='title'>Reminder</label>
                <input
                  type="datetime-local"
                  value={reminder}
                  onChange={e => setReminder(e.target.value)}
                  placeholder="Set reminder"
                  required
                />
              </div>
              <div className='todolist__control'>
                <label htmlFor='title'>Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Enter location"
                  required
                />
              </div>
            </div>
            <div className="todolist__actions">
              <button onClick={handleAddTask}>Add</button>
              <button onClick={clearTimeouts}>Remove Reminder</button>
              <button onClick={handleSetLocation}>View Location</button>
            </div>
          </div>
          <div className='todolist-new'>
            {tasks.length > 0 && (
              <Inprogress
                tasks={tasks}
                handleToggleComplete={handleToggleComplete}
                handleDeleteTask={handleDeleteTask}
                handleEditTask={handleEditTask}
              />
            )}
          </div>

          {location && (
            <div>
              {placeName && <h2>Selected Location: {placeName}</h2>}
              <iframe
                width="400"
                height="300"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  location
                )}&output=embed`}
                frameBorder="0"
                allowFullScreen=""
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          )}
    </React.Fragment>
  );
};

export default TodoApp;
