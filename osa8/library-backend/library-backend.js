const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String
    id: ID!
    born: Int
    bookCount: Int
    
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    
  }
  type Mutation {
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    ): Book!

    editAuthor(
        name: String!
        setBornTo: Int!
      ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({})
      const authors = await Author.find({})
    
      console.log('args', args)
      
      
      if (args.author && args.genre) {
        const author = authors.find(a => {
          console.log(a.name === args.author)
          if (a.name === args.author) {
            return a
          }
        })
        const booksByAuthor =  books.filter(b => b.author.toString() === author._id.toString())
          
        return booksByAuthor.filter(book => book.genres.find(genre => genre === args.genre))
        
        }
        
        if (args.author) {
          const author = authors.find(a => {
            console.log(a.name === args.author)
            if (a.name === args.author) {
              return a
            }
          })
          console.log('author', author)
          return books.filter(b => b.author.toString() === author._id.toString())
        }
        
        if (args.genre) {
          return books.filter(book => book.genres.find(genre => genre === args.genre))
        }
        return Book.find({})
        
      },

    allAuthors: async (root, args) => {
      const authors = await Author.find({})
      authors.map(author => {
        author.bookCount = author.books.length
        console.log(author.name, author.bookCount)
      })
      return authors
    }

  },
  Book: {
    author: async (root) => {
      const authors = await Author.find({})
      authors.map(author => {
        author.bookCount = author.books.length
      })
      console.log('root', root.author)
      const author = authors.find(a => {
        console.log(a._id.toString() === root.author.toString())
        if (a._id.toString() === root.author.toString()) {
          return a
        }
      })
      console.log('author', author)

      return {
        name: author.name,
        born: author.born,
        bookCount: author.bookCount
      }
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      const authors = await Author.find({})
      console.log('args', args)
      

      if ((authors.find(a => a.name === args.author)) === undefined) {
        const author = new Author({name: args.author, books: []})
        console.log('new author id', author._id)
        const book = new Book({
          title: args.title,
          author: author._id,
          published: args.published,
          genres: args.genres
        })
        const savedBook = await book.save()
        author.books = author.books.concat(savedBook._id)
        await author.save()
        return savedBook
        
        
      } else {

      const author = authors.find(a => a.name === args.author)
      console.log('id', author._id)

      const book = new Book({
        title: args.title,
        author: author._id,
        published: args.published,
        genres: args.genres
      })
      const savedBook = await book.save()
      author.books = author.books.concat(savedBook._id)
      await author.save()
      return savedBook
      }
    },
    
    editAuthor: async (root, args) => {
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }
        author.born = args.setBornTo
        console.log('author', author)
        return author.save()
    }
    
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})