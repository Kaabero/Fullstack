import { createSlice } from '@reduxjs/toolkit'


const getId = () => (100000 * Math.random()).toFixed(0)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
          state.push({
            content,
            votes: 0,
            id: getId()
          })
      },

      voteFor(state, action) {
        const id = action.payload
        const anecdoteToChange = state.find(a => a.id === id)
        const votedAnecdote = {
          ...anecdoteToChange,
          votes: anecdoteToChange.votes + 1
        }
        return state.map(anecdote =>
          anecdote.id !== id ? anecdote : votedAnecdote)


      },

      appendAnecdote(state, action) {
        state.push(action.payload)
      },

      setAnecdotes(state, action) {
        return action.payload
      }
  }
})


export const { createAnecdote, voteFor, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer