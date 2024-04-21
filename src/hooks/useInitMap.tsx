import { useEffect, useRef } from 'react'
import { Map, TileLayer } from 'leaflet'

import { MAP_BOX_TILE_URL, MAP_BOX_TOKEN } from '../const'

export function useInitMap(options = {}) {
  const mapInstance = useRef<Map | null>(null)

  const LeafletMap = () => {
    const mapContainer = useRef<HTMLElement | null>(null)
    // const inputRef = useRef<HTMLInputElement | null>(null)
    let initialBounds = null
    useEffect(() => {
      const map = initMap()
      mapInstance.current = map
      initialBounds = map.getBounds()
      // NOTE Uncaught Error: Map container is already initialized
      // 在 cleanup 时移除 map 实例 因为开发环境下 useEffect 执行两次，导致 Map 重复初始化
      return () => map.remove()
    }, [])
    // 返回地图组件
    return (
      <div ref={el => (mapContainer.current = el)} className='w-full h-full'>
        <input
          className='zoom-btn'
          type='image'
          src='vite.svg'
          onClick={e => onClick(e, mapInstance.current)}
        />
      </div>
    )

    function initMap() {
      const map = new Map(mapContainer.current, {
        center: [26.578343, 106.713478],
        zoom: 13,
        zoomSnap: 0.25,
        ...options,
      })
      const mapBoxTile = new TileLayer(MAP_BOX_TILE_URL, {
        // 服务 id
        id: 'mapbox/streets-v11',
        tileSize: 512, // 地图瓦片大小
        zoomOffset: -1, // 补偿地图缩放等级偏差
        accessToken: MAP_BOX_TOKEN,
      })
      mapBoxTile.addTo(map)
      return map
    }
    function onClick(event, map: Map) {
      if (!map) return
      event.stopPropagation()
      // console.log(event.target, 'btn clicked')
      // map.setZoom(14)
      // 设置地图中心和放缩等级
      // map.setView([26.578343, 106.713478], 13)
      // 设置地图中心和放缩等级，平滑飞过去
      // map.flyTo([26.578343, 106.713478], 10)
      // 地图等级增大3
      // map.zoomIn(3)
      // 地图等级减少3
      // map.zoomOut(3)
      // setZoomAround(fixedPoint,zoom)  围绕指定点放缩，放缩过程中，该点位置保持不变 等同于使用鼠标滚轮放缩
      // map.setZoomAround([26.578343, 106.713478], 12)
      // fitBounds(bounds) 将地图放缩到指定范围
      // map.fitBounds(initialBounds)
      // NOTE 默认情况，地图等级只能设置整数，可在初始化时通过 zoomSnap 选项进行修改
      // 有效的地图等级为 k*zoomSnap (k=0,1,2,3,4...)
    }
  }

  return {
    LeafletMap,
    mapInstance,
  }
}
