import { useDispatch, useSelector } from 'react-redux'

const Error = () => {
  const error = useSelector((state) => {
    if (state.error === null) {
      return null
    }
    const error = state.error
    return error
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  if (error === null) {
    return null
  }
  return <div className="error">{error}</div>
}

export default Error
