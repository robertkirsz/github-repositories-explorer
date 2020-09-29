import styled from 'styled-components'
import { queries } from 'styles'

export default function Logo() {
  return <Img src="android-chrome-192x192.png" role="Logo" />
}

const Img = styled.img`
  width: 100%;
  max-width: 40px;
  align-self: center;
  ${queries.desktop`max-width: 96px;`}
`
