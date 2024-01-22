import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },

    setBlogs(state, action) {
      console.log('setBlogs', action.payload)
      return action.payload
    },

    updateBlogs(state, action) {
      console.log('action', action.payload)
      return state.push(action.payload)
    },
  },
})

export const { appendBlog, setBlogs, updateBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(newObject)
    dispatch(appendBlog(newBlog))
  }
}

export default blogSlice.reducer
