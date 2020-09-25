import { useState, useEffect } from 'react'

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

  return <input placeholder="Username" value={value} onChange={handleChange} />
}
