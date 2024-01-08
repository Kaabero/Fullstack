import { configureStore } from '@reduxjs/toolkit'

import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const Store = () => {

    const store = configureStore({
        reducer: {
        anecdotes: reducer,
        filter: filterReducer
        }
    })
    console.log('store.getstage()', store.getState())
    return store
}

  


export default Store