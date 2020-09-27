import { useState, useEffect } from 'react'
import styled from 'styled-components'

import store from 'store'
import { fetchUsers, clearUsers } from 'reducers/users'
import useDebounce from 'hooks/useDebounce'

export default function SearchInput({ onChange = () => {} }) {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 300)

  function handleChange(event) {
    setValue(event.target.value)
  }

  function handleDebouncedValueChange() {
    onChange(debouncedValue)
    if (debouncedValue) store.dispatch(fetchUsers(debouncedValue))
    else store.dispatch(clearUsers())
  }

  useEffect(handleDebouncedValueChange, [debouncedValue])

  return <Input placeholder="Enter username" value={value} onChange={handleChange} />
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
