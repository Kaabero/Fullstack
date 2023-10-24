import { useState, useEffect } from 'react'
import personService from './services/persons'


const Persons = ({ person, remove }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={remove}>delete</button>
    </li>
  )
}

const Filter = ({handleSearchChange}) => {
  return (
    <div>
        filter shown with <input onChange={handleSearchChange}/>
      </div>
    
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
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
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [searchWith, setSearchWith] = useState('')

  const showAll =[]

  const filter = showAll.lenght === 0
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(searchWith.toLowerCase()))



  const removePerson = id => {
    const person = persons.find(n => n.id === id)
    console.log('removable person:', person.name, person.id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(response => {
          console.log(response)
          const filtered = persons.filter(person => person.id !== id)
          console.log('filtered', filtered)
          setPersons(filtered)
          setNewName('')
          setNewNumber('')
      })
        .catch(error => {
          console.log('fail')
      })
    }
}

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
 
  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const names = persons.map(person => person.name)
    const found = (name) => name === nameObject.name
    if (names.some(found)) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return 
    }   
    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log('fail')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchWith(event.target.value)
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Filter handleSearchChange={handleSearchChange} />
      </form>
      <h2>Add a new</h2>
        <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber= {newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
        {filter.map(person =>
          <Persons 
            key={person.name} 
            person={person}
            remove={() => removePerson(person.id)}
          />
          )}
      </div>
    </div>
  )

}

export default App
