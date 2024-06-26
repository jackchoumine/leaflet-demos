/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-23 18:31:26
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-24 17:53:34
 * @Description :
 */
import { useState } from 'react'
import { Menu } from 'antd'
import {
  InitMapCom,
  WithAMap,
  HuBeiPopulation,
  BarPopulation,
  PieDemo,
  ReactDemos,
} from './components'
import 'leaflet/dist/leaflet.css'
import './App.css'
import { useScript } from './hooks'

const App = () => {
  const [selectedKey, setSelectedKey] = useState('home')
  useScript()
  const handleMenuClick = e => {
    setSelectedKey(e.key)
    // 根据选中的菜单项 key 值渲染对应的内容
    renderContent(e.key)
  }

  const renderContent = key => {
    switch (key) {
      case 'home':
        return <InitMapCom />
      case 'about':
        return <WithAMap />
      case 'contact':
        return <HuBeiPopulation />
      case 'bar':
        return <BarPopulation />
      case 'pie':
        return <PieDemo />
      case 'react-demos':
        return <ReactDemos />
      default:
        return null
    }
  }

  const menuItems = [
    { label: '初始化', key: 'home' },
    { label: '集成高德地图', key: 'about' },
    { label: '分级统计图法', key: 'contact' },
    { label: '柱状图统计', key: 'bar' },
    { label: '饼图统计', key: 'pie' },
    { label: 'ReactDemos', key: 'react-demos' },
  ]

  return (
    <>
      <Menu
        mode='horizontal'
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        items={menuItems}
      />
      <div className='map-area'>{renderContent(selectedKey)}</div>
    </>
  )
}

export default App
