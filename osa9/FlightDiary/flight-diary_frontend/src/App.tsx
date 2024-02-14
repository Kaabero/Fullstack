import { useState, useEffect } from 'react';
import { Entry } from "./types";
import { getAllEntries, createEntry } from './entryService';

import './index.css'

interface NotificationProps {
  message: string
}

const Notification = ({message}: NotificationProps) => {
  if (message === '') {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}


const App = () => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('good');
  const [weather, setWeather] = useState('sunny');
  const [comment, setComment] = useState('nice');
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState<Entry[]>([
    { id: 1, date: '2023-02-13', weather: 'sunny', visibility: 'good', comment: 'nice!' }
  ]);


  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  }, [])

  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    
    try { 
    await createEntry( {date, weather, visibility, comment} ).then(data => {
      setEntries(entries.concat(data))
    
    })
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message)
        setTimeout(() => {
          setMessage('')
        }, 3000)
      }
    }
    
    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  };

  return (
    
    <div>
      <h2>Diary entires</h2>
      <Notification message={message} />
      <ul>
        {entries.map(entry =>
          <li key={entry.id}><strong>{entry.date}</strong>< br />
          visibility: {entry.visibility} <br />
          weather: {entry.weather} <br />
          comment: {entry.comment}
          </li>
        )}
      </ul>
      <h2>Add new entry</h2>
      <form onSubmit={entryCreation}>
        <div>
          date: 
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          weather: 
          <input
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          visibility: 
          <input
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          comment:
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}
export default App
