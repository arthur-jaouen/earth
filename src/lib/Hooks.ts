import { useEffect, useState } from 'react'

export function usePrev<T>(value?: T): T | undefined {
  const [prev, setPrev] = useState(value)

  useEffect(() => {
    if (value && value !== prev) {
      setPrev(value)
    }
  }, [value, prev])

  return value === undefined ? prev : value
}
