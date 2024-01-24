import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'
import Users from './Users'

const Menu = ({ users, blogForm, user, logout }) => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          Blogs
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
        {user.name} logged in <button onClick={() => logout()}>logout</button>{' '}
      </div>
      <br />

      <Routes>
        <Route path="/" element={blogForm()} />
        <Route path="/users" element={<Users users={users} />} />
      </Routes>
    </Router>
  )
}

export default Menu
