import styled from 'styled-components'

export default styled.div`
  padding: 8px 0;
  opacity: 0.6;
  ${({ center }) => center && 'text-align: center;'}
`
