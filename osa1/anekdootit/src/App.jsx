import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  

  const [selected, setSelected] = useState(Math.floor(Math.random() *8 ))

  const [points, setPoints] = useState([0,0,0,0,0,0,0,0])  


  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() *8))

  }

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  
  }
  const isLargestNumber = (element) => element == Math.max(...points)

  console.log('points', points)
  console.log('max', Math.max(...points))
  console.log('index', points.findIndex(isLargestNumber))
  return (
    <div>
      <Header header='Anecdote of the day' />
    <div>
      {anecdotes[selected]} <br>
      </br>
        <Button handleClick={handleVoteClick} text='vote' />
        <Button handleClick={handleNextClick} text='next anecdote' />

        <Header header='Anecdote with most votes' />
        
        {anecdotes[points.findIndex(isLargestNumber)]} <br>
        </br>
        has {Math.max(...points)} votes
      </div>
    </div>
  )
}

export default App
