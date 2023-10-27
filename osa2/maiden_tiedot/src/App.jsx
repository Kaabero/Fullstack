import { useState, useEffect } from 'react'
import countryService from './services/countries'


const Country = ({ country }) => {
  const languages = Object.values(country.languages)
  const flag = country.flag
  console.log('flag', typeof(flag))
  console.log('languages', languages)
  
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
const Countries = ({ country, handleShowButton }) => {

  return (
    <li>
      {country.name.common} 
      <button onClick={() => handleShowButton(country)}>show</button>
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


const Result = ({ filter, handleShowButton }) => {
  if (filter.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }   
  if (filter.length <= 10 && filter.length > 1) {
    return (
      <div>
      {filter.map(country =>
        <Countries 
          key={country.name.official} 
          country={country}
          handleShowButton={handleShowButton}
        />
      )}
    </div>
    )
  }
  if (filter.length === 1) {
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

  const handleShowButton = (country) => {
    setSearchWith(country.name.common)
   
  }

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
          handleShowButton={handleShowButton}
        />
      </div>
    </div>
  )

}

export default App
