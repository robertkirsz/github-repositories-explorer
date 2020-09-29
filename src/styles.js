import { createGlobalStyle } from 'styled-components'
import createQueries from 'styled-kit/utils/createQueries'

export const queries = createQueries({
  mobile: '(max-width: 479px)',
  desktop: '(min-width: 480px)'
})

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
  }
  
  body {
    margin: 0;
    font-family: sans-serif;
    box-sizing: border-box;
    font-size: 16px;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  #root {
    display: flex;
    flex-direction: column;
    padding: 8px;

    ${queries.mobile`
      height: 100%;
      overflow: hidden;
    `}

    ${queries.desktop`align-items: center;`}
  }

  .truncated {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
