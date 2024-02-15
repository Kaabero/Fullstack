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
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
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
      setEntries(entries.concat(data));
    
    });
    setComment('')

    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message)
        setTimeout(() => {
          setMessage('')
        }, 3000)
      }
    }
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
            type='date'
            onInput={() => {
              const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
              if (dateInput) {
                setDate(dateInput.value);
              }
            }}
          />
        </div>
        <div>
          weather: 
          sunny
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather('sunny')}
          />
          cloudy
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather('cloudy')}
          />
          rainy
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather('rainy')}
          />
          stormy
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather('stormy')}
          />
          windy
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather('windy')}
          />
        </div>
        <div>
          visibility: 
          great
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility('great')}
          />
          good
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility('good')}
          />
          ok
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility('ok')}
          />
          poor
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility('poor')}
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
