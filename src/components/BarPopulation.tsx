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
import { D3SvgOverlay } from '../plugins'

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
      huaZhongLayer.on('add', e => {
        console.log('add', e)
      })
      d3.csv('/华中人口数.csv').then(csvTable => {
        arr.forEach(item => {
          const row = csvTable.find(row => row.name === item['省份'])
          item.female = +row['女']
          item.male = +row['男']
        })
        console.log(arr)
        const barOverlay = new D3SvgOverlay((sel, proj) => {
          console.log(sel, proj)
          const selRect = sel.selectAll('rect').data(arr)
          const manBar = selRect.data(arr, d => {
            return d.male
          })
          const OFF_SET_X = 7.5
          const OFF_SET_Y = Δy => 5 + Δy / 150000
          manBar
            .enter()
            .append('rect')
            .attr('x', d => {
              const pointOnMap = proj.latLngToLayerPoint(d.latLng)
              return pointOnMap.x - OFF_SET_X
            })
            .attr('y', d => {
              const pointOnMap = proj.latLngToLayerPoint(d.latLng)
              return pointOnMap.y - OFF_SET_Y(d.male) / 1.5
            })
            .attr('width', OFF_SET_X * 2.0)
            .attr('height', d => {
              return d.male / 150000
            })
            .attr('fill', 'blue')
            // FIXME 为什么这里的title不生效
            .append('title')
            .text(d => {
              // console.log(d)
              return `男性${d.male}人`
            })

          const selRect2 = sel.selectAll('rectFemale').data(arr)
          const femaleBar = selRect2.data(arr, d => {
            return d.female
          })
          femaleBar
            .enter()
            .append('rect')
            .attr('x', d => {
              const pointOnMap = proj.latLngToLayerPoint(d.latLng)
              return pointOnMap.x + 10
            })
            .attr('y', d => {
              const pointOnMap = proj.latLngToLayerPoint(d.latLng)
              return pointOnMap.y - (3.7 + d.female / 150000) / 1.5
            })
            .attr('width', 15)
            .attr('height', d => {
              return d.female / 150000
            })
            .attr('fill', 'green')
            .append('title')
            .text(d => {
              return `女性${d.female}人`
            })

          const selText = sel.selectAll('text').data(arr)
          const text = selText.data(arr, d => {
            return d.male
          })
          text
            .enter()
            .append('text')
            .text(d => {
              return d.name
            })
            .attr('x', d => {
              const pointOnMap = proj.latLngToLayerPoint(d.latLng)
              return pointOnMap.x - OFF_SET_X
            })
            .attr('y', d => {
              const pointOnMap = proj.latLngToLayerPoint(d.latLng)
              return pointOnMap.y + 30
            })
          // .attr('stroke', '#fffff0')
        })
        barOverlay.addTo(mapInstance.current)
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
