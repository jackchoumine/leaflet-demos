import { useEffect } from 'react'
import { useTianDiTuMap } from '../hooks'
import { GeoJSON } from 'leaflet'
import * as d3 from 'd3'

export function PieDemo() {
  const { WithTianDiTuMap, mapInstance } = useTianDiTuMap()
  const wuHanCenter = [30.584355, 114.298572]
  const arr = []
  useEffect(() => {
    import('../data/华中地区2021.json').then(geoJSON => {
      const huaZhongLayer = new GeoJSON(geoJSON, {
        style,
        onEachFeature: (feature, layer) => {
          if (arr.length < 3) {
            arr.push({
              name: feature.properties.name,
              // 获取各省份的中心点
              latLng: layer.getBounds().getCenter(),
            })
          }
        },
      })
      huaZhongLayer.addTo(mapInstance.current)
      d3.json('/华中三大产业.json').then(json => {
        arr.forEach(item => {
          item.first = +json[item.name]['第一产业增加值']
          item.second = +json[item.name]['第二产业增加值']
          // item.tertiary = +json[item.name]['第三产业增加值']
          item.third = +json[item.name]['第三产业增加值']
        })
      })
    })
  }, [mapInstance])
  return <WithTianDiTuMap center={wuHanCenter} zoom={6} />

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
