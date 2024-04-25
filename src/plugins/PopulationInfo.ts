/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-25 10:44:30
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-25 11:02:21
 * @Description :
 */
import L from 'leaflet'

const PopulationInfo = L.Control.extend({
  onAdd(map) {
    console.log('onAdd')
    this.container = L.DomUtil.create('div', 'info')
    this.update()
    return this.container
  },
  update(props) {
    // console.log('update', props)
    this.container.innerHTML = `<h4>湖北省人口分布图</h4>
    ${props ? `<b>${props.name}</b><br>${props.population}人` : '将鼠标移动到地图上'}`
  },
})

export { PopulationInfo }
