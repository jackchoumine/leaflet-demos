import { useEffect } from 'react'

export function useScript() {
  useEffect(() => {
    const amapScript = document.querySelector('script[data-amap]')
    if (amapScript) return
    const header = document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    script.src =
      'https://webapi.amap.com/maps?v=1.4.15&key=9e40eec8abc79f8f93d89db04639f57e'
    script.async = true
    script.dataset.amap = 'true'
    script.onload = () => {
      console.log('amap script loaded')
    }
    header.appendChild(script)
    return () => {
      const amapScript = document.querySelector('script[data-amap]')
      amapScript.remove()
    }
  }, [])
}
