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
  return (
    <div>
      {props.Name}: {props.Clicks}
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
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAverage(average - 1)
    setAll(all + 1)
  }

  return (
    <div>
      <Header header='give feedback' />
      <div>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />

        <Header header='statistics' />

        <Statistics Name='good' Clicks={good} />
        <Statistics Name='neutral' Clicks={neutral} />
        <Statistics Name='bad' Clicks={bad} />
        <Statistics Name='all' Clicks={all} />
        <Statistics Name='average' Clicks={average/all} />
        <Statistics Name='positive' Clicks={good/all*100} />
        
      </div>
    </div>
  )
}

export default App
