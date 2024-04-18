import { useState } from 'react'
import { Menu } from 'antd'

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
        return <div>Home Content</div>
      case 'about':
        return <div>About Content</div>
      case 'contact':
        return <div>Contact Content</div>
      default:
        return null
    }
  }

  const menuItems = [
    { label: 'Home', key: 'home' },
    { label: 'About', key: 'about' },
    { label: 'Contact', key: 'contact' },
  ]

  return (
    <div>
      <Menu
        mode='horizontal'
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        items={menuItems}
      />
      <div>{renderContent(selectedKey)}</div>
    </div>
  )
}

export default App
