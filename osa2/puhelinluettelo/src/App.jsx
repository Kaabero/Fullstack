import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: '040-1231244'}
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    console.log('nameObject', nameObject)
    const names = persons.map(person => person.name)
    console.log('names', names)
    const found = (name) => name === nameObject.name
    if (names.some(found)) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return 
    }
  
      
    setPersons(persons.concat(nameObject))
    console.log('persons', persons)
    console.log('button clicked', event.target)
    setNewName('')
    setNewNumber('')
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} 
        onChange={handleNameChange} 
        />
        </div>
        <div>number: <input value={newNumber}
        onChange={handleNumberChange}
        />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Person key={person.name} person={person} />
          )}
      </div>
    </div>
  )

}

export default App
