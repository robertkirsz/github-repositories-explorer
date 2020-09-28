import styled from 'styled-components'

export default function CloseButton(props) {
  return (
    <Button role="error-close-button" {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
        <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M1 15L15 1M1 1l14 14" />
      </svg>
    </Button>
  )
}

const Button = styled.button`
  width: 14px;
  height: 14px;
  padding: 6px;

  background: none;
  outline: none;
  border: none;

  color: inherit;
  cursor: pointer;

  box-sizing: content-box;

  &:hover svg {
    transform: rotate(90deg);
  }

  svg {
    display: block;
    transition: transform 400ms;
    pointer-events: none;
  }
`
