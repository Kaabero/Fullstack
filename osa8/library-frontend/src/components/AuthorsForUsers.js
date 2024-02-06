import { useState } from 'react'
import Select from 'react-select';
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR, ALL_DATA } from '../queries'

const AuthorsForUsers = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_DATA } ],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log('error:', messages)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    const selectedName = name.value
    
    event.preventDefault()

    changeAuthor({ variables: { selectedName, born }})

    setName('')
    setBorn('')
  }

  const options = props.authors.map((author) => ({
    value: author.name,
    label: author.name,
  }))
  
  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Author</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {props.authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <div>
      <form onSubmit={submit}>
        <div>

        <Select 
          onChange={setName} 
          defaultValue={null}
          options={options}
        />  
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
    </div>
  )
}

export default AuthorsForUsers
