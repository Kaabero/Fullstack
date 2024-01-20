import { useDispatch, useSelector } from 'react-redux'


const Notification = () => {

  const notification = useSelector(state => {
    if (state.notification === null) {
      return null
    }
    const notification = state.notification
    return notification
    

  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  if (notification === null) {
    return null
  }
  return (
    <div className="complete">
      {notification}
    </div>
    
  )
}



export default Notification

