import ReactDOM from 'react-dom/client'
import Store from './store'
import { Provider } from 'react-redux'
import App from './App'



const store = Store()

console.log('store.getstage()', store.getState())


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)