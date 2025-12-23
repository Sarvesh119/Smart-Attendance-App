import React from 'react'

const NoteList = ({ notes, setNotes }) => {
    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/notes/${id}`, { method: "DELETE" });
        setNotes(prev => prev.filter(n => n._id !== id));

    }
    return (
        <div>
            {notes.map(note => (
                <div key={note._id} className='card'>
                    <h1>{note.title}</h1>
                    <p>{note.content}</p>
                    <button onClick={() => handleDelete(note._id)}>Delete Note</button>
                </div>
            ))}
        </div>
    )
}

export default NoteList;
