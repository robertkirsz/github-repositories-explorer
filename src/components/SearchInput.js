import { useState, useEffect } from 'react'

import { fetchUsers } from 'api'
import store from 'store'
import { saveUsers } from 'reducers/users'
import useDebounce from 'hooks/useDebounce'

export default function SearchInput() {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 500)
  const [isSearching, setIsSearching] = useState(false)

  function handleChange(event) {
    setValue(event.target.value)
  }

  function handleDebouncedValueChange() {
    if (debouncedValue) {
      setIsSearching(true)

      fetchUsers(debouncedValue).then(response => {
        setIsSearching(false)
        store.dispatch(saveUsers(response.items))
      })
    }
  }

  useEffect(handleDebouncedValueChange, [debouncedValue])

  return (
    <>
      <input placeholder="Username" value={value} onChange={handleChange} />
      {isSearching ? 'Searching' : null}
    </>
  )
}
