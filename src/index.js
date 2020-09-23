import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from 'store'

const render = () => {
  const App = require('components/App').default

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()

// Reuse component tree if any component is recompiled during hot-reloading
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('components/App', render)
}
