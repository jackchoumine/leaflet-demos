import { useState } from 'react'
import { Menu } from 'antd'
import { InitMapCom, WithAMap } from './components'
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
        return <div>Contact Content</div>
      default:
        return null
    }
  }

  const menuItems = [
    { label: '初始化', key: 'home' },
    { label: '集成高德地图', key: 'about' },
    { label: 'Contact', key: 'contact' },
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
