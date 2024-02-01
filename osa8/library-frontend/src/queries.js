import { gql } from '@apollo/client'

export const ALL_DATA = gql`
    query {
        allAuthors  {
            name,
            id,
            born,
            bookCount
        },
        allBooks {
            title,
            published,
            author,
            id,
            genres
        }
    }
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int, $author: String, $genres: [String]) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
    id
    author
    genres 
  }
}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($selectedName: String!, $born: Int!) {
    editAuthor(name: $selectedName, setBornTo: $born)  {
      name
      born
      bookCount
      id
    }
  }
`