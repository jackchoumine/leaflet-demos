import { useEffect, useRef } from 'react'
import { Map } from 'leaflet'
import { ZoomViewer } from '../plugins'

export function useGaoDeMap() {
  const mapInstance = useRef<Map | null>(null)
  const WithAMap = () => {
    const leafletMapContainer = useRef<HTMLElement | null>(null)
    const aMapContainer = useRef<HTMLElement | null>(null)
    useEffect(() => {
      const map = new Map(leafletMapContainer.current, {
        attributionControl: false,
      })
      mapInstance.current = map
      new ZoomViewer().addTo(map)
      map.setView([26.623862161082926, 106.62555339600561], 15)
      const aMap = initAMap(aMapContainer.current)
      map.on('zoom', event => {
        const zoom = map.getZoom()
        aMap.setZoom(zoom)
      })
      map.on('move', event => {
        const { lng, lat } = map.getCenter()
        const zoom = map.getZoom()
        aMap.setZoomAndCenter(zoom, [lng, lat])
      })
      return () => {
        map.remove()
        mapInstance.current = null
      }
    }, [])
    return (
      <>
        <div
          className='leaflet-map w-full h-full absolute bg-transparent'
          ref={el => (leafletMapContainer.current = el)}></div>
        <div
          className='a-map w-full h-full absolute'
          ref={el => (aMapContainer.current = el)}></div>
      </>
    )

    function initAMap(container: HTMLElement) {
      const amap = new window.AMap.Map(container, {
        fadeOnZoom: false,
        navigationMode: 'classic',
        optimizePanAnimation: false,
        animateEnable: false,
        dragEnable: false,
        zoomEnable: false,
        resizeEnable: true,
        doubleClickZoom: false,
        keyboardEnable: false,
        scrollWheel: false,
        expandZoomRange: true,
        zooms: [1, 20],
        mapStyle: 'amap://styles/1e65d329854a3cf61b568b7a4e2267fd',
        features: ['road', 'point', 'bg'],
        viewMode: '2D',
      })
      return amap
    }
  }
  return { WithAMap, mapInstance }
}
