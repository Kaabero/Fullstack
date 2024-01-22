import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { addNotification } from '../reducers/notificationReducer'
import { addError } from '../reducers/errorReducer'

const BlogForm = ({ setVisability }) => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    event.target.title.value = ''
    const author = event.target.author.value
    event.target.author.value = ''
    const url = event.target.url.value
    event.target.url.value = ''
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    if (!newBlog.title || !newBlog.author || !newBlog.url) {
      dispatch(addError('Please fill the required fields', 50))
      return
    }
    dispatch(createBlog(newBlog))
    setVisability()
    dispatch(
      addNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added `,
        50
      )
    )
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input name="title" id="title" placeholder="write title here" />
        </div>
        <div>
          author:
          <input name="author" id="author" placeholder="write author here" />
        </div>
        <div>
          url:
          <input name="url" id="url" placeholder="write url here" />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
