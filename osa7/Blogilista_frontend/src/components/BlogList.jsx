import Blog from './Blog'
import blogService from '../services/blogs'
import { addNotification } from '../reducers/notificationReducer'
import { addError } from '../reducers/errorReducer'

const BlogList = ({ blogs, user }) => {
  const removeBlog = (id) => {
    const blog = blogs.find((b) => b.id === id)
    console.log('removable blog:', blog.title, blog.id)
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      console.log('id', id)
      blogService
        .remove(id)
        .then((response) => {
          console.log('response', response)
          const filtered = blogs.filter((blog) => blog.id !== id)
          console.log('filtered', filtered)
          setBlogs(filtered)
          dispatch(addNotification(`Deleted blog '${blog.title}'`, 50))
        })
        .catch((error) => {
          dispatch(
            addError(
              `Information of blog '${blog.title}' has already been removed from server`,
              50
            )
          )
          setTimeout(() => {}, 3000)
        })
    }
  }

  const addLikeOf = (id) => {
    const blog = blogs.find((n) => n.id === id)
    console.log('likes', blog.likes)
    const changedBlog = { ...blog, likes: (blog.likes += 1) }
    console.log('changedBlog', changedBlog)

    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        console.log('returnedblog likes', returnedBlog)
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
        dispatch(addNotification('like added ', 50))
      })
      .catch((error) => {
        dispatch(addError('something unexpected happened', 50))
      })
  }

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={() => addLikeOf(blog.id)}
          remove={() => removeBlog(blog.id)}
          loggedUser={user.username}
        />
      ))}
    </div>
  )
}

export default BlogList
