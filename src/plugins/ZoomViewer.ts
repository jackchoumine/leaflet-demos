import L from 'leaflet'
// 自定义控件
// 通过继承 L.Control 类来实现
// 通过 onAdd 方法来实现控件的初始化 onAdd 方法返回一个 DOM 元素 作为控件的容器  参数 map 是地图实例
// 通过 onRemove 方法来实现控件的销毁

// 用法：
// const zoomViewer = new ZoomViewer()
// zoomViewer.addTo(map)
const ZoomViewer = L.Control.extend({
  onAdd(map) {
    console.log('onAdd')
    const container = L.DomUtil.create('div')
    container.style.width = '120px'
    container.style.height = '24px'
    container.style.textAlgin = 'left'
    container.style.paddingLeft = '5px'
    container.style.background = 'rgba(255,255,255,0.5)'

    const gauge = L.DomUtil.create('div')
    container.appendChild(gauge)
    // this 是插件实例
    // console.log(this)
    // 多个事件 使用空格分隔
    // map.on('zoomstart zoom zoomend', function (event) {
    map.on('zoomend', this.onZoomEnd.bind(this, map, gauge))
    this.onZoomEnd(map, gauge)
    // container 是插件的容器
    return container
  },
  onRemove(map) {
    // 移除插件时调用
    console.log('onRemove')
    map.off('zoomend', this.onZoomEnd)
  },
  onZoomEnd(map: any, gauge: HTMLDivElement) {
    // console.log('event', event.type)
    const zoom = map.getZoom()
    // console.log('zoom', zoom)
    gauge.innerHTML = `Zoom level: ${zoom}`
  },
})

export { ZoomViewer }
