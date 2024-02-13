import { useState, useEffect } from 'react';

import { Entry } from "./types";
import { getAllEntries, createEntry } from './entryService';

const App = () => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [entries, setEntries] = useState<Entry[]>([
    { id: 1, date: '2023-02-13', weather: 'sunny', visibility: 'good', comment: 'nice!' }
  ]);


  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  }, [])

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createEntry( {date, weather, visibility, comment} ).then(data => {
      setEntries(entries.concat(data))
    })
    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  };

  return (
    
    <div>
      <h2>Diary entires</h2>
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
