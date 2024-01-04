import NewAnecdote from './components/AnecdoteForm'
import { createAnecdote, voteFor } from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const sortedAnecdotes = anecdotes.sort((a ,b) => b.votes - a.votes)
  const dispatch = useDispatch()


  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))

  } 

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      
      <NewAnecdote />
    </div>
  )
}

export default App