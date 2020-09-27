import { useState, useEffect } from 'react'
import styled from 'styled-components'
import useDebounce from 'hooks/useDebounce'

export default function DebouncedInput({ value = '', onChange = () => {}, debounceTime = 300, ...props }) {
  const [internalValue, setInternalValue] = useState(value)
  const debouncedValue = useDebounce(internalValue, debounceTime)

  function handleChange(event) {
    setInternalValue(event.target.value)
  }

  useEffect(() => {
    if (debouncedValue !== value) onChange(debouncedValue)
  }, [debouncedValue])

  return <Input value={internalValue} onChange={handleChange} {...props} />
}

const Input = styled.input`
  padding: 12px 8px;
  background: #f2f2f2;
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: none;
  font-size: 20px;
  transition: 0.3s;

  &:focus {
    border-color: black;
  }
`
