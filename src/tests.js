import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from 'store'
import { GlobalStyle } from 'styles'
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

const AllTheProviders = ({ children = null }) => (
  <Provider store={store}>
    {children}
    <GlobalStyle />
  </Provider>
)

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
