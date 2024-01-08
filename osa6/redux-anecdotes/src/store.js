import { configureStore } from '@reduxjs/toolkit'

import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const Store = () => {

    const store = configureStore({
        reducer: {
        anecdotes: reducer,
        filter: filterReducer,
        notification: notificationReducer
        }
    })
    console.log('store.getstage()', store.getState())
    return store
}

  


export default Store