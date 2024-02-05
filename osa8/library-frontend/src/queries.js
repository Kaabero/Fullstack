import { gql } from '@apollo/client'

export const ALL_DATA = gql`
    query {
        allAuthors  {
            name,
            born,
            bookCount
            
        },
        allBooks {
            title,
            published,
            genres,
            author {
              name
              born
              bookCount
            }
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
      genres
      author {
        name
        born
        bookCount
        id
      } 
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
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`