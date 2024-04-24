/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-23 19:05:26
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-24 09:19:45
 * @Description : 分级统计图法 -- 展示湖北省人口分布
 */
import { useEffect, useRef } from 'react'
import { useGaoDeMap } from '../hooks'
import L from 'leaflet'
import { style } from '../data/huBei'
import { Legend } from '../plugins'

// import huBeiGeoJson from '../data/hubei.json'
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const huBeiGeoJson = require('../data/Hubei.json')

export function HuBeiPopulation() {
  const { WithAMap, mapInstance } = useGaoDeMap()

  const jsonLayer = useRef(null)
  const _legend = useRef(null)

  useEffect(() => {
    const wuHanCenter = [30.584355, 114.298572]
    mapInstance.current?.setView(wuHanCenter, 14)
    import('../data/Hubei.json').then(huBeiGeoJson => {
      const layer = new L.GeoJSON(huBeiGeoJson, {
        style,
        onEachFeature: (feature, layer) => {
          // TODO 如何才能让注记的大小随着比例尺的变化而变化呢?
          const latLng = layer.getBounds().getCenter()
          L.marker(latLng, {
            icon: L.divIcon({
              className: 'polygon-label',
              html: feature.properties.name,
              iconSize: [100, 20],
              // 禁止交互 这里不起作用
              // interactive: false,
            }),
            // 禁止交互
            interactive: false,
          }).addTo(mapInstance.current)

          layer.on({
            mouseover: hightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature,
          })
        },
      })
      layer.addTo(mapInstance.current)
      mapInstance.current?.fitBounds(layer.getBounds())
      jsonLayer.current = layer
      const legend = new Legend()
      legend.addTo(mapInstance.current)
      _legend.current = legend
    })
    return () => {
      _legend.current?.remove()
    }
    // 使用到了mapInstance.current 需要加入依赖或者定义到 useEffect 内部
    function zoomToFeature(e) {
      mapInstance.current.fitBounds(e.target.getBounds())
    }
  }, [mapInstance])

  return <WithAMap />

  function hightFeature(e) {
    // console.log(e.target)
    const layer = e.target
    layer.setStyle({
      weight: 3,
      color: 'blue',
      dashArray: '',
      fillOpacity: 0.7,
    })
    // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront()
    // }
  }

  function resetHighlight(e) {
    jsonLayer.current.resetStyle(e.target)
  }
}
