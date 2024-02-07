
const Recommendations = (props) => {

    if (!props.show) {
      return null
    }


    console.log('books', props.books)
    console.log('genre', props.user.favoriteGenre)
  
    const filteredBooks = props.books.filter(book => book.genres.find(genre => genre === props.user.favoriteGenre))
    console.log('filtered', filteredBooks)

   
  
    return (
      <div>
        <h2>Recommendations</h2>
        <p>Books in your favorite genre <strong>{props.user.favoriteGenre}: </strong></p>
  
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
  
  export default Recommendations