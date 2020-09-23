import { useState, useEffect } from 'react'

export default function useDebounce(value, timeout) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  function debounceValue() {
    const handler = setTimeout(() => setDebouncedValue(value), timeout)
    return () => clearTimeout(handler)
  }

  useEffect(debounceValue, [value, timeout])

  return debouncedValue
}
