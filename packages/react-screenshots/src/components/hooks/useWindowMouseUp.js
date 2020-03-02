import { useEffect } from 'react'

export default function useWindowMouseUp (mouseup) {
  useEffect(() => {
    window.addEventListener('mouseup', mouseup)
    return () => {
      window.removeEventListener('mouseup', mouseup)
    }
  }, [mouseup])
}
