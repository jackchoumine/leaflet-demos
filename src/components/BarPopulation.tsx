/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-25 18:03:09
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-25 18:34:34
 * @Description :
 */
import { useEffect } from 'react'
import { useGaoDeMap } from '../hooks'

export function BarPopulation() {
  const { WithAMap, mapInstance } = useGaoDeMap()
  useEffect(() => {
    const wuHanCenter = [30.584355, 114.298572]
    mapInstance.current?.setView(wuHanCenter, 6)
    import('../data/华中地区2021.json').then(geoJSON => {
      L.geoJSON(geoJSON, {
        style,
      }).addTo(mapInstance.current)
    })
    // L.geoJSON(huBeiGeoJson, {}).addTo(mapInstance.current)
  }, [mapInstance])
  return <WithAMap />

  function style(feature) {
    return {
      fillColor: '#a5a5a5',
      weight: 1,
      opacity: 1,
      color: 'black',
      dashArray: '3',
      fillOpacity: 0.7,
    }
  }
}
