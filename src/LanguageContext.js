// src/LanguageContext.js
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const translations = {
  en: {
    header: 'To-Do List',
    addTask: 'Add Task',
    toDo: 'To Be Performed',
    inProgress: 'In Progress',
    completed: 'Completed Works',
    start: 'Start',
    finish: 'Finish',
    undo: 'Undo',
    delete: 'Delete',
    enterTask: 'Enter a new task'
  },
  ka: {
    header: 'ტასკების სია',
    addTask: 'ტასკის დამატება',
    toDo: 'გაკეთება',
    inProgress: 'პროცესში',
    completed: 'დასრულებული',
    start: 'დაწყება',
    finish: 'დასრულება',
    undo: 'დაბრუნება',
    delete: 'წაშლა',
    enterTask: 'ახალი ტასკის შეყვანა'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
