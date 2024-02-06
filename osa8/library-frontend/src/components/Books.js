import { useState } from 'react'
import FilteredBooks from './FilteredBooks'


const Books = (props) => {
  const [page, setPage] = useState('all')
  console.log('books', props.books)
  console.log('genres', props.genres)


  if (!props.show) {
    return null
  }

  if (page==='all') {

    return (
      <div>
        <h2>All books:</h2>

        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
            </tr>
            {props.books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        Choose a genre: <br />
    
        {props.genres.map((genre) =>(
          <button key={genre.genre} onClick={() => setPage(genre.genre)}>{genre.genre}</button>
        ))} <br />
        or <br />
        <div>
        <button onClick={() => setPage('all')}>show all</button>
        </div>
      </div>
    )
  }
  if (page!='all' || page!=null) {
    return (
      <div>
        <FilteredBooks
        books={props.books}
        genre={page}
        />
        <br />
        Choose a genre: <br />
    
        {props.genres.map((genre) =>(
          <button key={genre.genre} onClick={() => setPage(genre.genre)}>{genre.genre}</button>
        ))} <br />
        or <br />
        <div>
        <button onClick={() => setPage('all')}>show all</button>
        </div>

      </div>

    
    )
  }
}

export default Books
