import styled from 'styled-components'

export default styled.span`
  flex: none;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 24px;
  height: 24px;

  position: relative;

  transition: 0.3s;
  pointer-events: none;

  &::before,
  &::after {
    content: '';

    display: block;
    width: 12px;
    height: 2px;

    position: absolute;
    top: ${props => (props.isActive ? 8 : 16)}px;

    background: black;
    border-radius: 2px;
    transition: 0.2s;
  }

  &::before {
    right: 11px;
    transform: rotate(${props => (props.isActive ? -45 : 45)}deg);
    transform-origin: right center;
  }

  &::after {
    left: 12px;
    transform: rotate(${props => (props.isActive ? 45 : -45)}deg);
    transform-origin: left center;
  }
`
