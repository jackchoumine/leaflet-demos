/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-25 18:03:09
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-25 19:56:35
 * @Description :
 */
import { useEffect } from 'react'
import { useGaoDeMap } from '../hooks'
import L from 'leaflet'
import * as d3 from 'd3'

export function BarPopulation() {
  const { WithAMap, mapInstance } = useGaoDeMap()

  const arr = []

  useEffect(() => {
    const wuHanCenter = [30.584355, 114.298572]
    mapInstance.current?.setView(wuHanCenter, 6)
    import('../data/华中地区2021.json').then(geoJSON => {
      const huaZhongLayer = L.geoJSON(geoJSON, {
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
      // FIXME 监听不到图层加载事件
      huaZhongLayer.on('add',e=>{
        console.log('add',e)
      })
      d3.csv('/华中人口数.csv').then(csvTable => {
        arr.forEach(item => {
          const row = csvTable.find(row => row.name === item['省份'])
          item.female = +row['女']
          item.male = +row['男']
        })
        console.log(arr)
      })
    })
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
