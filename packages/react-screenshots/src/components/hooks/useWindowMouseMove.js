import { useEffect } from 'react'

export default function useWindowMouseMove (mousemove) {
  useEffect(() => {
    window.addEventListener('mousemove', mousemove)
    return () => {
      window.removeEventListener('mousemove', mousemove)
    }
  }, [mousemove])
}
