import { useState } from 'react'
import AuthorsForUsers from './components/AuthorsForUsers'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_DATA } from './queries'



const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('books')
  const result = useQuery(ALL_DATA , {
    pollInterval: 2000
  } )
  const client = useApolloClient()

  console.log('result', result.data)
  

  if (result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors authors={result.data.allAuthors} show={page === 'authors'} />

        <Books books={result.data.allBooks} genres={result.data.allGenres} show={page === 'books'} />

        <LoginForm setToken={setToken} show={page === 'login'} />

      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authorsForUsers')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <AuthorsForUsers authors={result.data.allAuthors} show={page === 'authorsForUsers'} />

      <Books books={result.data.allBooks} genres={result.data.allGenres} show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommendations books={result.data.allBooks} user={result.data.me} show={page === 'recommend'} />

    </div>
  )
}

export default App
