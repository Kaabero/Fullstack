import { useState, useEffect } from 'react'
import personService from './services/persons'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="complete">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}


const Persons = ({ person, remove }) => {
  return (
    <li>
      {person.name} {person.number} <br></br>
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

  const [completeMessage, setCompleteMessage] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  const showAll =[]

  const filter = showAll.lenght === 0
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(searchWith.toLowerCase()))



  const removePerson = id => {
    const person = persons.find(p => p.id === id)
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
          setCompleteMessage(
            `Deleted ${person.name}`
          )
          setTimeout(() => {
            setCompleteMessage(null)
          }, 3000)
      
      })
      .catch(error => {
        setErrorMessage(
          `Information of '${person.name}' has already been removed from server`
        )
        setNewName('')
        setNewNumber('')
        setCompleteMessage(null)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changeNumberFor = persons.find(p => p.name === newName)
        console.log('id', changeNumberFor.id)
        const person = persons.find(p => p.id === changeNumberFor.id)
        const changedPerson = { ...person, number: newNumber }
        
      
        personService
          .update(changeNumberFor.id, changedPerson)
          .then(changedPerson => {
            if (changedPerson === null) {
              setErrorMessage(
                `Information of '${person.name}' has already been removed from server`
              )
              setNewName('')
              setNewNumber('')
              setCompleteMessage(null)
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
              return
            }
            setPersons(persons.map(person => person.id !== changeNumberFor.id ? person : changedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(
              `Something unexpected happened`
            )
            setNewName('')
            setNewNumber('')
            setCompleteMessage(null)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
          setCompleteMessage(
            `Changed ${person.name}`
          )
          setTimeout(() => {
            setCompleteMessage(null)
          }, 3000)
        return
      }
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
        setCompleteMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setCompleteMessage(null)
        }, 3000)
    
      })
      .catch(error => {
        console.log(error.response.data)
        setErrorMessage(`${error.response.data.error}`)
        setNewName('')
        setNewNumber('')
        setCompleteMessage(null)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
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
      <Notification message={completeMessage} />
      <Error message={errorMessage} />
      <form>
        <Filter handleSearchChange={handleSearchChange} />
      </form>
      <h2>Add a new</h2>
        <PersonForm 
          addPerson={addPerson} 
          newName={newName} 
          handleNameChange={handleNameChange} 
          newNumber= {newNumber} 
          handleNumberChange={handleNumberChange} 
        />
      <h2>Numbers</h2>
      <div>
        {filter.map(person =>
          <Persons 
            key={person.id} 
            person={person}
            remove={() => removePerson(person.id)}
          />
          )}
      </div>
    </div>
  )

}

export default App
