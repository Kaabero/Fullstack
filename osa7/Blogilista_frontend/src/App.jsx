import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import Error from './components/Error'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import { addNotification } from './reducers/notificationReducer'
import { addError } from './reducers/errorReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'

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
    dispatch(initializeUsers())
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

  const users = useSelector((state) => {
    return state.users
  })

  const setVisabilityFalse = () => {
    setCreatingVisible(false)
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
      <h2>Log in to application</h2>
      <br />
      <Notification />
      <Error />
      <br />
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

    return (
      <div>
        <Notification />
        <Error />
        <br />

        <div style={hideWhenVisible}>
          <button onClick={() => setCreatingVisible(true)}>
            create new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm setVisability={setVisabilityFalse} />
          <button onClick={() => setCreatingVisible(false)}>cancel</button>
        </div>
        <br />
        <BlogList blogs={sortedBlogs} user={user} />
      </div>
    )
  }

  return (
    <div>
      {!user && loginForm()}
      {user && blogForm() && (
        <Menu users={users} blogForm={blogForm} user={user} logout={logout} />
      )}
    </div>
  )
}

export default App
