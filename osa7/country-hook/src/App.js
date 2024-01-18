import React, { useState, useEffect } from 'react'
import axios from 'axios'

// `${baseUrl}/${name}`


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {

  const [country, setCountry] = useState(null)
  const baseUrl = `https://studies.cs.helsinki.fi/restcountries`


  
  useEffect(() => {
    if (name) {
      axios
        .get(`${baseUrl}/api/name/${name}`)
        .then(response => {
          setCountry(response.data)
        })
        .catch((error) => {
          if (error.response.status === 404) {
            console.log('error', error.message)
            setCountry('not found')
            return country
          }
        })
    }
  }, [name])

  if (!country) {
    return null
  }

  return country
}


const Country = ({ country }) => {
  

  if (country === 'not found') {
    return (
      <div>
        not found...
      </div>
    )
  }
  if (!country) {
    return null
  }
  
  if (country) {

    return (
      <div>
        <h3>{country.name.common} </h3>
        <div>capital {country.capital} </div>
        <div>population {country.population}</div> 
        <h1>{country.flag}</h1> 
      </div>
    )
  }
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  

  const fetch = (e) => {
    
    e.preventDefault()
    setName(nameInput.value)
  }
  
  return (
    
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      
      <Country country={country} />
    </div>
  )
}

export default App