import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: []
  });

  const addTask = () => {
    if (task.trim()) {
      setTasks({ ...tasks, todo: [...tasks.todo, task] });
      setTask('');
    }
  };

  const moveTask = (index, sourceColumn, destinationColumn) => {
    const taskToMove = tasks[sourceColumn][index];
    const newSourceTasks = tasks[sourceColumn].filter((_, i) => i !== index);
    const newDestinationTasks = [...tasks[destinationColumn], taskToMove];
    
    setTasks({
      ...tasks,
      [sourceColumn]: newSourceTasks,
      [destinationColumn]: newDestinationTasks
    });
  };

  const deleteTask = (index, column) => {
    const newTasks = {
      ...tasks,
      [column]: tasks[column].filter((_, i) => i !== index)
    };
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="task-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="columns">
        <div className="column">
          <h2>To Be Performed</h2>
          <ul className="task-list">
            {tasks.todo.map((task, index) => (
              <li key={index}>
                {task}
                <div>
                  <button className="start-button" onClick={() => moveTask(index, 'todo', 'inProgress')}>Start</button>
                  <button className="delete-button" onClick={() => deleteTask(index, 'todo')}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h2>In Progress</h2>
          <ul className="task-list">
            {tasks.inProgress.map((task, index) => (
              <li key={index}>
                {task}
                <div>
                  <button className="move-button" onClick={() => moveTask(index, 'inProgress', 'todo')}>To Do</button>
                  <button className="finish-button" onClick={() => moveTask(index, 'inProgress', 'completed')}>Finish</button>
                  <button className="delete-button" onClick={() => deleteTask(index, 'inProgress')}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h2>Completed Works</h2>
          <ul className="task-list">
            {tasks.completed.map((task, index) => (
              <li key={index}>
                {task}
                <div>
                  <button className="move-button" onClick={() => moveTask(index, 'completed', 'inProgress')}>Undo</button>
                  <button className="delete-button" onClick={() => deleteTask(index, 'completed')}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
