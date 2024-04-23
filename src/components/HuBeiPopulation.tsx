import { useEffect } from 'react'
import { useGaoDeMap } from '../hooks'
import L from 'leaflet'
import { style } from '../data/huBei'
import { Legend } from '../plugins'
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
        onEachFeature: (feature, layer) => {
          // 如何才能让注记的大小随着比例尺的变化而变化呢?
          // NOTE
          const latlng = layer.getBounds().getCenter()
          L.marker(latlng, {
            icon: L.divIcon({
              className: 'polygon-label',
              html: feature.properties.name,
              iconSize: [100, 20],
            }),
          }).addTo(mapInstance.current)
        },
      })
      jsonLayer.addTo(mapInstance.current)
      mapInstance.current?.fitBounds(jsonLayer.getBounds())
      const legend = new Legend()
      legend.addTo(mapInstance.current)
    })
  }, [mapInstance])

  return <WithAMap />
}
