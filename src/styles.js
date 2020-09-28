import { createGlobalStyle } from 'styled-components'
import createQueries from 'styled-kit/utils/createQueries'

export const queries = createQueries({
  mobile: '(max-width: 479px)',
  desktop: '(min-width: 480px)'
})

export const GlobalStyle = createGlobalStyle`
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
    align-items: center;
    max-height: 100vh;
    overflow: hidden;
  }

  .title {
    margin: 0.5em 0;
    /* min font-size, scalar, max font-size */
    font-size: clamp(1rem, 5vw, 2rem);
    text-align: center;
  }

  .truncated {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
