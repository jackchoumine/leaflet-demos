import { useEffect } from 'react'
import { useTianDiTuMap } from '../hooks'
import { GeoJSON } from 'leaflet'
import * as d3 from 'd3'
import { D3SvgOverlay } from '../plugins'

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
        console.log(arr)
        var pie = d3.pie()
        //返回一个由10种不同颜色组成的数组
        var color = d3.scaleOrdinal(d3.schemeCategory10)

        const pieOverLayer = new D3SvgOverlay((sel, proj) => {
          var selArcs = sel.selectAll('g.arc')
          arr.forEach(item => {
            let arrBinding = []
            const { first, second, third } = item
            arrBinding.push(first)
            arrBinding.push(second)
            arrBinding.push(third)
            const sum = first + second + third
            const outerRadius = Math.sqrt(sum / 50)
            const innerRadius = 20
            const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius)
            // 绘制扇形
            const arcs = selArcs
              .data(pie(arrBinding))
              .enter()
              .append('g')
              .attr('class', 'arc')
              .attr('transform', function (d) {
                // console.log(item)
                // 饼状图圆心坐标
                const { x, y } = proj.latLngToLayerPoint(item.latLng)
                const centerOfCircle = `translate(${x},${y})`
                return centerOfCircle
              })

            //通过路径绘制弧
            arcs
              .append('path')
              .attr('fill', function (d, i) {
                return color(i) //设置填充颜色
              })
              .attr('d', arc)
              // NOTE pointer-events 与 leaflet.css 里面样式设置冲突，导致鼠标提示失效，故增加以下语句
              .attr('style', 'pointer-events: visiblepainted')
            arcs
              .append('title') //鼠标提示
              .text(function (d, i) {
                const title = `第${i + 1}产业增加值：${d.value}${json['单位']}`
                return title
              })

            //添加注记
            var proName = sel.selectAll('text').data(arr, function (d) {
              return d.first
            })
            proName
              .enter()
              .append('text') //绘制文本
              .text(function (d) {
                //设置文本内容
                return d.name.slice(0, 2)
              })
              .attr('x', function (d) {
                return proj.latLngToLayerPoint(d.latLng).x - 12
              })
              .attr('y', function (d) {
                return proj.latLngToLayerPoint(d.latLng).y + 5
              })
              .attr('stroke', 'black')

            arrBinding = []
          })
        })
        pieOverLayer.addTo(mapInstance.current)
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
