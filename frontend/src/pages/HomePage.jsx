import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import AuthContext from '../context/AuthContext'


function HomePage() {

  const [notes, setNotes] = useState([])
  const { authToken } = useContext(AuthContext)
  const { logoutUser } = useContext(AuthContext)

  useEffect(() => {
    getNotes()
  }, [])
  
  let getNotes = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/notes/', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access)
      }
    })
    let data = await response.json()
    if(response.status === 200){
      setNotes(data)
    }else if(response.statusText === 'Unauthorized'){
      logoutUser()
    }
  }

  return (
    <div>
    <p>You are logged to the home page</p>

    <ul>
      {notes.map(note => (
        <li style={{color: 'yellow'}} key={note.id}>{note.body}</li>
      ))}
    </ul>
    
    </div>
  )
}

export default HomePage