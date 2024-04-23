/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-23 18:56:09
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-23 19:03:13
 * @Description :
 */
export const cityData = {
  武汉市: 9785392,
  黄石市: 242931,
  十堰市: 334084,
  宜昌市: 4059686,
  襄阳市: 550030,
  鄂州市: 104867,
  荆门市: 2873687,
  孝感市: 481454,
  荆州市: 5691707,
  黄冈市: 6162072,
  咸宁市: 2462583,
  随州市: 216222,
  恩施土家族苗族自治州: 3290294,
  仙桃市: 1175085,
  潜江市: 946277,
  天门市: 141891,
  神农架林区: 7614,
}

export function getColor(d) {
  return d > 6000000
    ? '#a63603'
    : d > 4000000
    ? '#e6550d'
    : d > 2500000
    ? '#fd8d3c'
    : d > 100000
    ? '#fdbe85'
    : '#feedde'
}

export function style(feature) {
  return {
    fillColor: getColor(cityData[feature.properties.name]),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  }
}
