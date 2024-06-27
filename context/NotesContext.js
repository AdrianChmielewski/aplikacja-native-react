// context/NotesContext.js
import React, { createContext, useState } from 'react';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState({});

  const addNote = (date, note) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [date]: [...(prevNotes[date] || []), note],
    }));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};
