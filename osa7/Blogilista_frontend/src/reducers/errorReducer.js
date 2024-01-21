import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action) {
      return action.payload
    },
  },
})

export const { setError } = errorSlice.actions

export const addError = (message, seconds) => {
  const time = seconds * 100

  return async (dispatch) => {
    dispatch(setError(message))
    setTimeout(() => {
      dispatch(setError(null))
    }, time)
  }
}

export default errorSlice.reducer
