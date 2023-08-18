import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>


const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Statistics = (props) => {
  if (props.All === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return(
      <div>
        <table>
          <tbody>
            <tr>
              <td><StatisticLine text="good"/> 
              </td>
              <td> <StatisticLine value ={props.Good} />
              </td>
            </tr>
            <tr>
              <td><StatisticLine text="neutral"/> 
              </td>
              <td> <StatisticLine value ={props.Neutral} />
              </td>
            </tr>
            <tr>
              <td><StatisticLine text="bad"/> 
              </td>
              <td> <StatisticLine value ={props.Bad} />
              </td>
            </tr>
            <tr>
              <td><StatisticLine text="all"/> 
              </td>
              <td> <StatisticLine value ={props.All} />
              </td>
            </tr>
            <tr>
              <td><StatisticLine text="average"/> 
              </td>
              <td> <StatisticLine value ={props.Average} />
              </td>
            </tr>
            <tr>
              <td><StatisticLine text="positive"/> 
              </td>
              <td> <StatisticLine value ={props.Positive} mark = '%' />
              </td>
            </tr>  
          </tbody>   
          </table>

      </div>
    )
  }
  const StatisticLine = (props) => {
    return(
    <div>
      {props.text} {props.value} {props.mark}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [all, setAll] = useState(0)
  


  const handleGoodClick = () => {
    setGood(good + 1)
    setAverage(average + 1)
    setAll(all+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all+1)
    
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAverage(average - 1)
    setAll(all+1)
  }

  return (
    <div>
      <Header header='give feedback' />
      <div>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />

        <Header header='statistics' />
     
        <Statistics Good={good} Neutral={neutral} Bad={bad} All={all} Average={average/all} Positive= {good/all*100} />
      
      </div>
    </div>
  )
}

export default App
