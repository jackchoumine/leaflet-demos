import { useEffect } from 'react'
import L from 'leaflet'

import { useInitMap } from '../hooks'
export const InitMapCom = () => {
  const { LeafletMap, mapInstance } = useInitMap({
    zoomControl: false,
    attributionControl: false,
  })
  const geoJson = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [106.713478, 26.578343],
    },
    properties: {
      name: '贵阳市',
      population: 3510000,
      area: 8033,
    },
  }
  const geoJSONLine = {
    type: 'Feature',
    properties: {
      name: '新华路',
    },
    geometry: {
      coordinates: [
        [106.71338955687003, 26.5734449987728],
        [106.71364704932341, 26.572936437627618],
        [106.71382943953665, 26.572648572197295],
        [106.71399037207726, 26.57212081703001],
        [106.71415130461787, 26.571641037495766],
        [106.71426932181487, 26.570998129769308],
        [106.71437661017643, 26.57049915412145],
        [106.71450535620886, 26.570240069754604],
        [106.71455900038791, 26.569971389052156],
      ],
      type: 'LineString',
    },
  }
  useEffect(() => {
    // NOTE 通过 geoJson 添加覆盖层
    L.geoJSON(geoJson).addTo(mapInstance.current)
    const lineLayer = L.geoJSON(undefined, {
      // 设置颜色
      // style: {
      //   color: 'red',
      //   weight: 7,
      //   opacity: 0.7,
      // },
      // 设置颜色的第二种方式
      style: feature => {
        // console.log('feature', feature)
        return {
          color: 'red',
          weight: 7,
          opacity: 0.7,
        }
      },
    }).addTo(mapInstance.current)
    // 添加 覆盖层的第二种方式
    lineLayer.addData(geoJSONLine)
    // 从远程加载geojson数据 L.ajax 插件
    // 从用户本地计算机加载geojson数据 L.FileLayer 插件

    // 放缩控件
    const zoomControl = L.control
      .zoom({
        // position: 'topright', // 'topleft', 'bottomleft', 'bottomright'
        zoomInText: '+',
        zoomInTitle: '放大',
        zoomOutText: '--',
        zoomOutTitle: '-',
      })
      .addTo(mapInstance.current)
    const zoomControlPosition = zoomControl.getPosition()
    console.log('zoomControlPosition', zoomControlPosition)
    const zoomControlContainer = zoomControl.getContainer()
    console.log('zoomControlContainer', zoomControlContainer)
    setTimeout(() => {
      // 移除放缩控件
      zoomControl.remove()
    }, 2000)

    // 比例尺
    L.control
      .scale({
        // position: 'bottomleft', // 'topleft', 'bottomleft', 'bottomright'
        imperial: false, // 是否显示英制单位
        metric: true, // 是否显示公制单位
        maxWidth: 100, // 最大宽度
        updateWhenIdle: true, // 是否在空闲时更新/是否移动地图结束后更新
      })
      .addTo(mapInstance.current)
  }, [mapInstance])
  return <LeafletMap></LeafletMap>
}
