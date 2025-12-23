import React, { useState } from 'react';

const NoteForm = ({setNotes}) => {

  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");

  const handleForm=async(e)=>{
    e.preventDefault();
    const res=await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });
    const newNote=await res.json();
    setNotes(prev => [...prev, newNote]);
    setTitle("");
    setContent("");

  }
  return (
      <form onSubmit={handleForm} className='form'>
        <input type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}  required/>
        <textarea placeholder='Content' value={content} onChange={(e)=>setContent(e.target.value)}  required/>
        <button type='submit'>Save</button>
      </form>
  )
}

export default NoteForm;
