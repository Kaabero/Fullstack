const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const Genre = require('./models/genre')

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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }

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
  type Genre {
    genre: String
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allGenres: [Genre]
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    
  }
  type Mutation {
    addBook(
        title: String!
        published: Int
        author: String
        genres: [String]
    ): Book!

    editAuthor(
        name: String!
        setBornTo: Int!
      ): Author
    
    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allGenres: async (root, args) => {
      return await Genre.find({})
      
    },
    me: (root, args, context) => {
      return context.currentUser
    },
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
    author: async (root, args) => {
      const authors = await Author.find({})
      authors.map(author => {
        author.bookCount = author.books.length
      })
      console.log('root2', root.author)
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
    addBook: async (root, args, context) => {
      console.log("ADD BOOK")
      const authors = await Author.find({})
      const books = await Book.find({})
      const currentUser = context.currentUser
      console.log('user', currentUser)
      console.log('args', args)
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }


      if ((authors.find(a => a.name === args.author)) === undefined) {
        try {
          const author = new Author({name: args.author, books: []})
          await author.save()
          console.log('new author id', author._id)
          const book = new Book({
            title: args.title,
            author: author._id,
            published: args.published,
            genres: args.genres
          })

          const savedBook = await book.save()
          author.books = author.books.concat(savedBook._id)
          savedBook.genres.map(async (g) => {
            try {
            await new Genre({genre: g}).save()
            } catch (error) {
              console.log('error:', error.message)
            }
          })
          await author.save()
          return savedBook
        
        } catch (error) {
          if (args.author.length < 4 ) {
            throw new GraphQLError('Invalid author name', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author, 
                error,
              }
            })
          }
          if (books.find(b => b.title === args.title)) {
            throw new GraphQLError('Title must be unique', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.title,
                error
              }
            })
          }
          
          if (args.title.length <5 || !args.title) {
            throw new GraphQLError('Saving book failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.title, 
                error,
              }
            })
          }
        }
      
      } else {

      const author = authors.find(a => a.name === args.author)
      console.log('id', author._id)

      const book = new Book({
        title: args.title,
        author: author._id,
        published: args.published,
        genres: args.genres
      })
      try {
        const savedBook = await book.save()
        author.books = author.books.concat(savedBook._id)
        savedBook.genres.map(async (g) => {
          try {
          await new Genre({genre: g}).save()
          } catch (error) {
            console.log('error:', error.message)
          }
        })

        await author.save()
        return savedBook
      } catch (error) {
        if (books.find(b => b.title === args.title)) {
          throw new GraphQLError('Title must be unique', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
        
        if (args.title.length <5 || !args.title.lenght) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title, 
            error
          }
        })
      }}
      }
    },
    
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser
      console.log('user', currentUser)

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      if (!author) {
        return null
      }
      author.born = args.setBornTo
      console.log('author', author)
      return author.save()
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('favoriteGenre')
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})