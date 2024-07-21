// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import { LanguageProvider, useLanguage } from './LanguageContext';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: []
  });

  const { language, translations } = useLanguage();

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
      <Header />
      <div className="task-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder={translations[language].enterTask}
        />
        <button onClick={addTask}>{translations[language].addTask}</button>
      </div>
      <div className="columns">
        <div className="column">
          <h2>{translations[language].toDo}</h2>
          <ul className="task-list">
            {tasks.todo.map((task, index) => (
              <li key={index}>
                {task}
                <div>
                  <button className="start-button" onClick={() => moveTask(index, 'todo', 'inProgress')}>{translations[language].start}</button>
                  <button className="delete-button" onClick={() => deleteTask(index, 'todo')}>{translations[language].delete}</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h2>{translations[language].inProgress}</h2>
          <ul className="task-list">
            {tasks.inProgress.map((task, index) => (
              <li key={index}>
                {task}
                <div>
                  <button className="move-button" onClick={() => moveTask(index, 'inProgress', 'todo')}>{translations[language].toDo}</button>
                  <button className="finish-button" onClick={() => moveTask(index, 'inProgress', 'completed')}>{translations[language].finish}</button>
                  <button className="delete-button" onClick={() => deleteTask(index, 'inProgress')}>{translations[language].delete}</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h2>{translations[language].completed}</h2>
          <ul className="task-list">
            {tasks.completed.map((task, index) => (
              <li key={index}>
                {task}
                <div>
                  <button className="move-button" onClick={() => moveTask(index, 'completed', 'inProgress')}>{translations[language].undo}</button>
                  <button className="delete-button" onClick={() => deleteTask(index, 'completed')}>{translations[language].delete}</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default () => (
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
