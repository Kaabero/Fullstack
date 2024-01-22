import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Error from './components/Error'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { addNotification } from './reducers/notificationReducer'
import { addError } from './reducers/errorReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [creatingVisible, setCreatingVisible] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogs = useSelector((state) => {
    return state.blogs
  })

  const setVisabilityFalse = () => {
    setCreatingVisible(false)
  }

  const removeBlog = (id) => {
    const blog = blogs.find((b) => b.id === id)
    console.log('removable blog:', blog.title, blog.id)
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      console.log('id', id)
      blogService
        .remove(id)
        .then((response) => {
          console.log('response', response)
          const filtered = blogs.filter((blog) => blog.id !== id)
          console.log('filtered', filtered)
          setBlogs(filtered)
          dispatch(addNotification(`Deleted blog '${blog.title}'`, 50))
        })
        .catch((error) => {
          dispatch(
            addError(
              `Information of blog '${blog.title}' has already been removed from server`,
              50
            )
          )
          setTimeout(() => {}, 3000)
        })
    }
  }

  const addLikeOf = (id) => {
    const blog = blogs.find((n) => n.id === id)
    console.log('likes', blog.likes)
    const changedBlog = { ...blog, likes: (blog.likes += 1) }
    console.log('changedBlog', changedBlog)

    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        console.log('returnedblog likes', returnedBlog)
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
        dispatch(addNotification('like added ', 50))
      })
      .catch((error) => {
        dispatch(addError('something unexpected happened', 50))
      })
  }

  const logout = () => {
    console.log('logging out')
    setUser(null)
    setUsername('')
    setPassword('')
    window.localStorage.clear()
    dispatch(addNotification('you are logged out ', 50))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      console.log('user', user)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(addNotification('you are logged in ', 50))
    } catch (exception) {
      dispatch(addError('wrong username or password', 50))
    }
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <Error />
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </div>
  )

  const blogForm = () => {
    const hideWhenVisible = { display: creatingVisible ? 'none' : '' }
    const showWhenVisible = { display: creatingVisible ? '' : 'none' }

    console.log('blogs', blogs)
    const copy = [...blogs]
    const sortedBlogs = copy.sort((a, b) => b.likes - a.likes)
    console.log('sorted', sortedBlogs)

    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Error />
        <p>
          {user.name} logged in <button onClick={() => logout()}>logout</button>{' '}
        </p>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreatingVisible(true)}>
            create new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm setVisability={setVisabilityFalse} />
          <button onClick={() => setCreatingVisible(false)}>cancel</button>
        </div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={() => addLikeOf(blog.id)}
            remove={() => removeBlog(blog.id)}
            loggedUser={user.username}
          />
        ))}
      </div>
    )
  }

  return (
    <div>
      {!user && loginForm()}
      {user && blogForm()}
    </div>
  )
}

export default App
