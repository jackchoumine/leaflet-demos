import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const BreadcrumbNavContext = createContext(void 0)
BreadcrumbNavContext.displayName = 'BreadcrumbNavContext'

export default function BreadcrumbNav({
  children,
  size = 'medium', // small  medium large
  showMaxItemCount,
}) {
  const showCount = showMaxItemCount - 1
  const count = React.Children.count(children)
  const childrenTemp = [
    ...children,
    <Separator />,
    <Item disabled={true}>{document.title ? document.title : '当前页面'}</Item>,
  ]

  const newChildren = React.Children.map(childrenTemp, (child, index) => {
    // NOTE 不设置最大显示个数
    if (!showMaxItemCount) return child

    if (showCount % 2 === 1) {
      // 显示奇数个
      if (showCount <= index && index <= count - showCount) {
        if (showCount === index) return [child, Ellipsis(size)]
        return null
      }
      return child
    }
    // 显示偶数个
    if (showCount <= index && index <= count - 1 - showCount) {
      if (showCount === index) return Ellipsis(size)
      return null
    }
    return child
  })

  return (
    <BreadcrumbNavContext.Provider
      value={{
        size,
      }}>
      <div className={'breadcrumb'}>{newChildren}</div>
    </BreadcrumbNavContext.Provider>
  )
}

function validateShowMaxItemCount(props, propName, componentName) {
  const type = typeof props[propName]
  if (props[propName] && type !== 'number') {
    const error = new Error(
      `${propName} in ${componentName} must be number. ${propName} is ${type}`
    )
    return error
  }

  // +1 是当前页面的面包屑
  const breadcrumbSize = (React.Children.count(props.children) + 1) / 2 + 1
  if (props[propName] < 2 || props[propName] > breadcrumbSize) {
    const error = new Error(
      // eslint-disable-next-line max-len
      `${propName} in ${componentName} is not within 2 to ${breadcrumbSize}. ${propName} is ${props[propName]}`
    )
    return error
  }
  return null
}
BreadcrumbNav.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  showMaxItemCount: validateShowMaxItemCount, // PropTypes.number,
  navTo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      path: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
}

BreadcrumbNav.Item = Item
BreadcrumbNav.Separator = Separator

function Item({ children, navTo, disabled = false }) {
  const { size } = useBreadcrumbNavContext('BreadcrumbNav.Item')
  let href = navTo
  if (typeof navTo === 'object' && navTo !== null) {
    const { path, params = {} } = navTo
    const queryString = new URLSearchParams(params).toString()
    href =
      path.charAt(path.length - 1) === '?' ? path + queryString : `${path}?${queryString}`
  }

  return (
    <div
      className={`${['breadcrumb-item']} 
      ${[`breadcrumb-item--${size}`]}`}>
      <a disabled={disabled} href={href}>
        {children}
      </a>
    </div>
  )
}

function Separator({ children }) {
  const { size } = useBreadcrumbNavContext('BreadcrumbNav.Separator')
  return (
    <div
      className={`${['breadcrumb-separator']} 
      ${[`font-size-${size}`]}`}>
      {children ?? '/'}
    </div>
  )
}

function useBreadcrumbNavContext(componentName) {
  // NOTE 限制组件的嵌套关系
  const value = useContext(BreadcrumbNavContext)
  if (!value) {
    throw new Error(`${componentName} must be used within a BreadcrumbNav component`)
  }
  return value
}

function Ellipsis(size) {
  return (
    <div
      className={`${['breadcrumb-item']} 
      ${[`breadcrumb-item--${size}`]}`}>
      ...
    </div>
  )
}
