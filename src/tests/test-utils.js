import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from 'store'
import { GlobalStyle } from 'styles'

const AllTheProviders = ({ children = null }) => {
  return (
    <Provider store={store}>
      {children}
      <GlobalStyle />
    </Provider>
  )
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'

// Vverride render method
export { customRender as render }
