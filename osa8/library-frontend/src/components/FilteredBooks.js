const FilteredBooks = (props) => {
  console.log('books', props.books)
  console.log('genre', props.genre)

  const filteredBooks = props.books.filter(book => book.genres.find(genre => genre === props.genre))
  console.log('filtered', filteredBooks)

  return (
    <div>
      <h2>Books</h2>
      <p>in genre <strong>{props.genre}: </strong></p>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FilteredBooks