import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>


const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const History = (props) => {
  return (
    <div>
      {props.Choice}: {props.Clicks}
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


  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header='give feedback' />
      <div>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />

        <Header header='statistics' />

        <History Choice='good' Clicks={good} />
        <History Choice='neutral' Clicks={neutral} />
        <History Choice='bad' Clicks={bad} />
      </div>
    </div>
  )
}

export default App
