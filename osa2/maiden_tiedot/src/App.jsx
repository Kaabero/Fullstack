import { useState, useEffect } from 'react'
import countryService from './services/countries'


const Country = ({ country }) => {
  const languages = Object.values(country.languages)
  const flag = country.flag
  console.log('falg', typeof(flag))
  console.log('values', languages)
  
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital} </p>
      <p>area {country.area} </p>
      <h3>languages:</h3>
      
      {languages.map(language =>
        <Languages 
          key={language} 
          language={language}
        />
      )}
      <h1>{flag}</h1>
    </div>
  )
}
const Countries = ({ country }) => {
  return (
    <li>
      {country.name.common}
    </li>
  )
}
const Filter = ({handleSearchChange}) => {
  return (
    <div>
        find countries <input onChange={handleSearchChange}/>
      </div>
    
  )
}

const Languages = ({ language }) => {
  return (
    <li>
      {language}
    </li>
  )   
}


const Result = ({ filter }) => {
  if (filter.length > 10) {
    console.log('too many')
    return <p>Too many matches, specify another filter</p>
  }   
  if (filter.length <= 10 && filter.length > 1) {
    return (
      <div>
      {filter.map(country =>
        <Countries 
          key={country.name.official} 
          country={country}
        />
      )}
    </div>
    )
  }
  if (filter.length === 1) {
    console.log('just one', filter)
    return (
      <div>
      {filter.map(country =>
        <Country 
          key={country.name.official} 
          country={country}
        />
      )}
    </div>
    )
  }

}

const App = () => {
  const [countries, setCountries] = useState([]) 

  const [searchWith, setSearchWith] = useState('')

  const showAll =[]


  const filter = showAll.lenght === 0
  ? countries
  : countries.filter(country => country.name.common.toLowerCase().includes(searchWith.toLowerCase()))


  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
  }, [])
 

  const handleSearchChange = (event) => {
    setSearchWith(event.target.value)
    
  }

  return (
    <div>
      <form>
        <Filter handleSearchChange={handleSearchChange} />
      </form>
      <div>
        <Result
          filter={filter}
        />
      </div>
    </div>
  )

}

export default App
