/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-06-24 17:46:11
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-24 18:06:32
 * @Description : Breadcrumb  Demo
 */
import BreadcrumbNav from './BreadcrumbNav'

export function BreadcrumbDemoOne() {
  return (
    <BreadcrumbNav>
      <BreadcrumbNav.Item
        navTo={{
          path: 'https://cn.vuejs.org',
          params: { name: 'jack', age: 25 },
        }}>
        vue
      </BreadcrumbNav.Item>
      <BreadcrumbNav.Separator>{'>>'}</BreadcrumbNav.Separator>
      <BreadcrumbNav.Item navTo={'https://angular.cn'}>angular</BreadcrumbNav.Item>
      <BreadcrumbNav.Separator />
      <BreadcrumbNav.Item navTo='https://react.docschina.org'>react</BreadcrumbNav.Item>
      <BreadcrumbNav.Separator />
      <BreadcrumbNav.Item navTo='https://taobao.com'>淘宝</BreadcrumbNav.Item>
      <BreadcrumbNav.Separator />
      <BreadcrumbNav.Item navTo='https://tmall.com'>天猫</BreadcrumbNav.Item>
      <BreadcrumbNav.Separator />
      <BreadcrumbNav.Item navTo='https://jd.com'>京东</BreadcrumbNav.Item>
    </BreadcrumbNav>
  )
}
export function BreadcrumbDemoTwo() {
  return (
    <BreadcrumbNav showMaxItemCount={4} size='small'>
      <BreadcrumbNav.Item
        navTo={{
          path: 'https://cn.vuejs.org',
          params: { name: 'jack', age: 25 },
        }}>
        vue
      </BreadcrumbNav.Item>
      <BreadcrumbNav.Separator>{'>>'}</BreadcrumbNav.Separator>
      <BreadcrumbNav.Item navTo={'https://angular.cn'}>angular</BreadcrumbNav.Item>
      <BreadcrumbNav.Separator />
      <BreadcrumbNav.Item navTo='https://react.docschina.org'>react</BreadcrumbNav.Item>
      <BreadcrumbNav.Separator />
      <BreadcrumbNav.Item navTo='https://taobao.com'>淘宝</BreadcrumbNav.Item>
      <BreadcrumbNav.Separator />
      <BreadcrumbNav.Item navTo='https://tmall.com'>天猫</BreadcrumbNav.Item>
      <BreadcrumbNav.Separator />
      <BreadcrumbNav.Item navTo='https://jd.com'>京东</BreadcrumbNav.Item>
    </BreadcrumbNav>
  )
}
