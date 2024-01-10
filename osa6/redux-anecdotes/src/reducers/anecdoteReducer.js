import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {

      appendAnecdote(state, action) {
        state.push(action.payload)
      },

      setAnecdotes(state, action) {
        return action.payload
      },

      updateAnecdotes(state, action) {
        console.log('action', action.payload)
        return state.push(action.payload)

      }
  }
})


export const { voteFor, appendAnecdote, setAnecdotes, updateAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
    }
    const changedAnecdote = await anecdoteService.update(votedAnecdote)
    
    dispatch(initializeAnecdotes())

    
  }
}

export default anecdoteSlice.reducer