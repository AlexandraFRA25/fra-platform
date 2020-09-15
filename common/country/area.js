const levels = {
  global: 'WO',
  regions: ['AF', 'AS', 'EU', 'NA', 'OC', 'SA'],
}

const isISOGlobal = (isoCode) => isoCode === levels.global
const isISOCountry = (isoCode) => isoCode.length === 3
const isISORegion = (isoCode) => levels.regions.includes(isoCode)

module.exports = {
  levels,
  isISOGlobal,
  isISORegion,
  isISOCountry,
}
