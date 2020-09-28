import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import store from 'store'
import { GlobalStyle, queries } from 'styles'

const render = () => {
  const App = require('components/App').default

  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={{ styledKitMediaQueries: queries }}>
        <App />
        <GlobalStyle />
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  )
}

render()

// Reuse components tree if any component is recompiled during hot-reloading
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('components/App', render)
}
