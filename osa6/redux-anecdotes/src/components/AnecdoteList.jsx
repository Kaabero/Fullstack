import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList= () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => {
        if (state.filter === '' ) {
            return state.anecdotes
        }
        const filter = state.filter
        console.log('filter', filter)
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })
    console.log('anecdotes', anecdotes)
    const copy = [...anecdotes]
    const sortedAnecdotes = copy.sort((a ,b) => b.votes - a.votes)
    
    const vote = (id) => {
        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`You voted anecdote '${anecdote.content}'`))
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 5000)
    
    }
    
    return (
        <div>
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
        </div>
    )
}

export default AnecdoteList