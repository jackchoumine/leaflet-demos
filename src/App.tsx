import { useState } from 'react'
import { Menu } from 'antd'
import { InitMapCom } from './components'
import 'leaflet/dist/leaflet.css'
import './App.css'

const App = () => {
  const [selectedKey, setSelectedKey] = useState('home')

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
        return <div>About Content</div>
      case 'contact':
        return <div>Contact Content</div>
      default:
        return null
    }
  }

  const menuItems = [
    { label: '初始化', key: 'home' },
    { label: 'About', key: 'about' },
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
