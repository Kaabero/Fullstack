import { useState, useEffect } from 'react'
import axios from 'axios'


const Persons = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
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

  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')
  

  const filter = showAll.lenght === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchWith.toLowerCase()))

  console.log('filter', filter)  

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
    setPersons(persons.concat(nameObject))
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

  const handleSearchChange = (event) => {
    console.log(event.target.value)
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
          <Persons key={person.name} person={person} />
          )}
      </div>
    </div>
  )

}

export default App
