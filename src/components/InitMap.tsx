import { useInitMap } from '../hooks'

export const InitMapCom = () => {
  const { LeafletMap } = useInitMap()
  return <LeafletMap></LeafletMap>
}
