import { createSlice } from '@reduxjs/toolkit'

const initialState = null



const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    }

})

export const { setNotification } = notificationSlice.actions

export const addNotification = ( message, seconds ) => {

    const time = seconds * 100

    return async dispatch => {
      dispatch(setNotification(message))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, time)

    }
  }

export default notificationSlice.reducer