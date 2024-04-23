/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-23 18:31:26
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-23 19:30:46
 * @Description :
 */
import { useEffect } from 'react'
import { useGaoDeMap } from '../hooks'
import L from 'leaflet'

export function WithAMap() {
  const { WithAMap, mapInstance } = useGaoDeMap()
  const guiYangYiZhong = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [
            [
              [106.62107947137008, 26.63128554461221],
              [106.61977055337093, 26.62580916456932],
              [106.62555339600561, 26.623862161082926],
              [106.62826779152994, 26.63059501851322],
              [106.62107947137008, 26.63128554461221],
            ],
          ],
          type: 'Polygon',
        },
      },
    ],
  }
  useEffect(() => {
    if (!mapInstance.current) return
    const geoJSONLayer = L.geoJSON(guiYangYiZhong)
    geoJSONLayer
      .bindPopup(layer => {
        // console.log(layer)
        const feat = layer.feature
        if (feat.geometry.type === 'Polygon') {
          layer.setStyle({
            color: 'red',
          })
          //  获取要素的范围，让要素居中显示
          //  mapInstance.current.fitBounds(layer._bounds)
          mapInstance.current.fitBounds(layer.getBounds())
        } else {
          //
        }
        return '贵阳一中'
      })
      .on('popupclose', () => {
        console.log('popupclose')
      })
    geoJSONLayer.addTo(mapInstance.current)
  }, [mapInstance])
  return <WithAMap />
}
