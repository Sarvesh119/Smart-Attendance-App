import React, { useEffect, useState } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css'

const App = () => {
  const [notes,setNotes]=useState([]);

   useEffect(() => {
  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notes");
      const data = await res.json();
      setNotes(data); // ✅ Replace notes, don't append
    } catch (err) {
      console.error(err);
    }
  };
  fetchNotes();
}, []); // Empty dependency array

  
  return (
    <div className='main'>
      <h1>Hello Sarvesh This is your Note App</h1>
      <NoteForm setNotes={setNotes}/>
      <NoteList notes={notes} setNotes={setNotes}/>
    </div>
  )
}

export default App;
