import * as R from 'ramda'
import { div, mul, sum, toString } from '@common/bignumberUtils'

const baseValueKeysMapping = {
  naturallyRegeneratingForest: 'naturalForestArea',
  plantationForest: 'plantationForestArea',
  otherPlantedForest: 'otherPlantedForestArea',
  otherWoodedLand: 'otherWoodedLand',
  forest: 'forestArea',
  plantedForest: 'plantedForestArea',
}

/**
 * @deprecated
 */
const getTotalFieldValue = (field, year) => R.pipe(R.path(['totalTable', year, field]), R.defaultTo('0'))

/**
 * @deprecated
 */
export const getTotalGrowingStockFieldsSum = (growingStock, year, fields = []) => {
  const values = fields.map(field => getTotalFieldValue(field, year)(growingStock))
  return sum(values)
}

/**
 * @deprecated
 */
export const getTotalGrowingStockInForest = (growingStock, year) => getTotalFieldValue('forest', year)(growingStock)

/**
 * @deprecated
 */
export const calculateTotalValue = (growingStockState, year, row, avgValue) => {
  const baseValue = R.path(['baseTable', year, baseValueKeysMapping[row]], growingStockState)
  const value = toString(div(mul(avgValue, baseValue), 1000))
  return value
}

/**
 * @deprecated
 */
export const calculateAvgValue = (growingStockState, year, row, totalValue) => {
  const baseValue = R.path(['baseTable', year, baseValueKeysMapping[row]], growingStockState)
  const value = toString(div(mul(totalValue, 1000), baseValue))
  return value
}