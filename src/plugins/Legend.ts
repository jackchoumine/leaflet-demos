/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-23 19:43:58
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-23 19:58:44
 * @Description :
 */
import L from 'leaflet'
import { getColor } from '../data/huBei'

const Legend = L.Control.extend({
  onAdd(map) {
    console.log('onAdd')
    const container = L.DomUtil.create('div', 'info legend')
    const title = L.DomUtil.create('div', 'title')
    const grades = [0, 100000, 2500000, 4000000, 6000000] //和 getColor()函数分级设色一一对应
    title.innerHTML = '<b>图例(人)</b>'
    container.appendChild(title)
    const divLegend = L.DomUtil.create('div', 'legend')
    grades.forEach((grade, index) => {
      divLegend.innerHTML += `<i style="background:${getColor(grades[index] + 1)}"></i>${
        grades[index] + 1
      }${grades[index + 1] ? '&ndash;' + grades[index + 1] + '<br>' : '+'}`
    })
    container.appendChild(divLegend)
    return container
  },
})

export { Legend }
