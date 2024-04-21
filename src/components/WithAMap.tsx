import { useEffect } from 'react'
import { useGaoDeMap } from '../hooks'

export function WithAMap() {
  const { WithAMap, mapInstance } = useGaoDeMap()
  useEffect(() => {
    // console.log(mapInstance.current)
  }, [mapInstance])
  return <WithAMap />
}
