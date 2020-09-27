import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from 'store'
import { GlobalStyle } from 'styles'

const render = () => {
  const App = require('components/App').default

  ReactDOM.render(
    <Provider store={store}>
      <App />
      <GlobalStyle />
    </Provider>,
    document.getElementById('root')
  )
}

render()

// Reuse components tree if any component is recompiled during hot-reloading
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('components/App', render)
}
