const R = require('ramda')
const {getFraValues} = require('../eof/fraValueService')
const repository = require('./growingStockRepository')
const {add, defaultTo0} = require('../../common/bignumberUtils')


const getGrowingStock = async countryIso => {
  const growingStockTotal = await repository.readGrowingStock(countryIso, 'growing_stock_total')
  const growingStockAvg = await repository.readGrowingStock(countryIso, 'growing_stock_avg')

  const pairTable = (table) => R.pipe(
    R.map(v => [v.year, v]),
    R.fromPairs
  )(table)
  const totalTable = pairTable(growingStockTotal)
  const avgTable = pairTable(growingStockAvg)

  const forestCharacteristics = await getFraValues('forestCharacteristics', countryIso)
  const extentOfForest = await getFraValues('extentOfForest', countryIso)

  const focArea = R.map(
    foc => ({
      year: foc.year,
      naturalForestArea: foc.naturalForestArea,
      plantationForestArea: foc.plantationForestArea,
      otherPlantedForestArea: foc.otherPlantedForestArea,
      plantedForestArea: add(defaultTo0(foc.plantationForestArea), defaultTo0(foc.otherPlantedForestArea)).toString()
    }),
    forestCharacteristics.fra
  )
  const eofArea = R.map(R.pick(['year', 'forestArea', 'otherWoodedLand']), extentOfForest.fra)

  const years = R.uniq(R.pluck('year', [...focArea, ...eofArea]))
  const groupedFoc = R.groupBy(R.prop('year'), focArea)
  const groupedEof = R.groupBy(R.prop('year'), eofArea)
  const mergeFocEofByYear = R.map(year => {
    const obj = {
      naturalForestArea: null,
      plantationForestArea: null,
      otherPlantedForestArea: null,
      forestArea: null,
      otherWoodedLand: null,
      plantedForestArea: null,
    }
    const yearFoc = R.path([year, 0], groupedFoc) || {}
    const yearEof = R.path([year, 0], groupedEof) || {}
    return [year, R.merge(obj, R.merge(yearFoc, yearEof))]
  }, years)

  const baseTable = R.fromPairs(mergeFocEofByYear)

  return { totalTable, avgTable, baseTable }
}

module.exports = {
  getGrowingStock
}