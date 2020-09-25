import { useState, useEffect } from 'react'
import styled from 'styled-components'

import store from 'store'
import { fetchUsers, clearUsers } from 'reducers/users'
import useDebounce from 'hooks/useDebounce'

export default function SearchInput() {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 500)

  function handleChange(event) {
    setValue(event.target.value)
  }

  function handleDebouncedValueChange() {
    if (debouncedValue) store.dispatch(fetchUsers(debouncedValue))
    else store.dispatch(clearUsers())
  }

  useEffect(handleDebouncedValueChange, [debouncedValue])

  return <Input placeholder="Username" value={value} onChange={handleChange} />
}

const Input = styled.input`
  padding: 4px 8px;

  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;

  font-size: 24px;

  transition: 0.3s;

  &:focus {
    border-color: black;
  }
`
