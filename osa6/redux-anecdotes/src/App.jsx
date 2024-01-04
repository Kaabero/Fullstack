import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
/*
import { createAnecdote, voteFor } from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
*/

const App = () => {
  /*
  const anecdotes = useSelector(state => state)
  const sortedAnecdotes = anecdotes.sort((a ,b) => b.votes - a.votes)
  const dispatch = useDispatch()
  


  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))

  } 

  */

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App