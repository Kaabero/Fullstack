const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const Genre = require('./models/genre')


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
          const author = new Author({name: args.author, books: []})

          try {
            await author.save()
          } catch (error) {
            
            throw new GraphQLError('Invalid author name', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author, 
                error,
              }
            })
          }
          const authorId = author._id

          console.log('new author id', author._id)
          const book = new Book({
            title: args.title,
            author: author._id,
            published: args.published,
            genres: args.genres
          })
          try {
  
            await book.save()
            author.books = author.books.concat(book._id)
            book.genres.map(async (g) => {
              try {
              await new Genre({genre: g}).save()
              } catch (error) {
                console.log('error:', error.message)
              }
            })
            await author.save()
            
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
          pubsub.publish('BOOK_ADDED', { bookAdded: book })
          return book
        
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
          await book.save()
          author.books = author.books.concat(book._id)
          book.genres.map(async (g) => {
            try {
            await new Genre({genre: g}).save()
            } catch (error) {
              console.log('error:', error.message)
            }
          })
  
          await author.save()
          
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
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
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
      
    },
    
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
    },
}

module.exports = resolvers


  