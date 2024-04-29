import { useEffect, useRef } from 'react'
import { LayerGroup, Map, TileLayer } from 'leaflet'
import { ZoomViewer } from '../plugins'

// NOTE 天地图地图服务
// vec_w  w 表示墨卡托投影  vec 表示矢量地图
// vec_c  c 表示经纬度投影，也叫 CGCS2000 投影  vec 表示矢量地图
const tianDiTuKey = '4c409692826bccaca32ee3e1a74ba1b5'
// const tianDiTuUrl = `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`
// 矢量地图
const tianDiTuUrl2 = `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`

// 矢量注记
const tianDiTuUrl3 = `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`

// 影像地图
const tianDiTuUrl4 = `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`

// 影像注记
const tianDiTuUrl5 = `http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianDiTuKey}`

export function useTianDiTuMap() {
  const mapInstance = useRef<Map | null>(null)

  const WithTianDiTuMap = () => {
    const leafletMapContainer = useRef<HTMLElement | null>(null)
    useEffect(() => {
      const map = new Map(leafletMapContainer.current, {
        attributionControl: false,
      })
      mapInstance.current = map
      new ZoomViewer().addTo(map)
      map.setView([26.623862161082926, 106.62555339600561], 15)
      const tianDiTuLayer2 = new TileLayer(tianDiTuUrl2, {
        id: '2',
        attribution: '天地图2',
      })
      const tianDiTuLayer3 = new TileLayer(tianDiTuUrl3, {
        id: '3',
        attribution: '天地图3',
      })
      const layerGroup = new LayerGroup([tianDiTuLayer2, tianDiTuLayer3])
      layerGroup.addTo(map)
      mapInstance.current = map
      return () => {
        map.remove()
        mapInstance.current = null
      }
    }, [])
    return (
      <div
        className='leaflet-map w-full h-full'
        ref={el => (leafletMapContainer.current = el)}></div>
    )
  }

  return { WithTianDiTuMap, mapInstance }
}
