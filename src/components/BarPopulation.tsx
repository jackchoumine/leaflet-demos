/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-25 18:03:09
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-25 18:04:22
 * @Description :
 */
import { useGaoDeMap } from '../hooks'

export function BarPopulation() {
  const { WithAMap, mapInstance } = useGaoDeMap()
  return <WithAMap />
}
