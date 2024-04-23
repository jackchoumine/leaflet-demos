import { useEffect } from 'react'
import { useGaoDeMap } from '../hooks'
import L from 'leaflet'
import { style } from '../data/huBei'
// import huBeiGeoJson from '../data/hubei.json'
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const huBeiGeoJson = require('../data/Hubei.json')

export function HuBeiPopulation() {
  const { WithAMap, mapInstance } = useGaoDeMap()

  useEffect(() => {
    const wuHanCenter = [30.584355, 114.298572]
    mapInstance.current?.setView(wuHanCenter, 14)
    import('../data/Hubei.json').then(huBeiGeoJson => {
      const jsonLayer = new L.GeoJSON(huBeiGeoJson, {
        style,
      })
      jsonLayer.addTo(mapInstance.current)
      mapInstance.current?.fitBounds(jsonLayer.getBounds())
    })
  }, [mapInstance])

  return <WithAMap />
}
