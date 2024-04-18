import { useEffect, useRef } from 'react'
import { Map, TileLayer } from 'leaflet'

import { MAP_BOX_TILE_URL, MAP_BOX_TOKEN } from '../const'

export function useInitMap(options = {}) {
  const mapInstance = useRef<Map | null>(null)

  const LeafletMap = () => {
    const mapContainer = useRef<HTMLElement | null>(null)
    useEffect(() => {
      const map = initMap()
      mapInstance.current = map
      // NOTE Uncaught Error: Map container is already initialized
      // 在 cleanup 时移除 map 实例 因为开发环境下 useEffect 执行两次，导致 Map 重复初始化
      return () => map.remove()
    }, [])
    // 返回地图组件
    return <div ref={el => (mapContainer.current = el)} className='w-full h-full'></div>

    function initMap() {
      const map = new Map(mapContainer.current, {
        center: [26.578343, 106.713478],
        zoom: 13,
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
  }

  return {
    LeafletMap,
    mapInstance,
  }
}
