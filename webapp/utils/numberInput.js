import * as R from 'ramda'

const trim = (value) => value.replace(/\s/g, '')

export const acceptableAsInteger = (newValue) => {
  const newValueTrimmed = trim(newValue)
  if (newValueTrimmed === '') return true
  if (R.contains('e', newValueTrimmed)) return false
  return !isNaN(newValueTrimmed) &&
          isValidDecimalPart(newValueTrimmed) &&
          isFinite(newValueTrimmed)
}

// Util function for UI fields which require integer values to be stored
// Gives previous value if new can't be converted to Integer
export const acceptNextInteger = (newValue, currentValue) => {
  const newValueTrimmed = trim(newValue)
  if (newValueTrimmed === '') return null
  if (!acceptableAsInteger(newValue)) return currentValue
  console.log('accepted integer')
  if (newValueTrimmed.length > 20) return currentValue
  // Number(parseFloat(newValueTrimmed).toFixed(2))
  return newValueTrimmed
}

const isValidDecimalPart = d => {
  const ds = d.split('.')
  return ds.length === 2 ? (ds[1].length <= 2) : true;
}

export const acceptableAsDecimal = (newValue) => {
  const newValueTrimmed = trim(newValue)
  if (newValueTrimmed === '') return true
  if (R.contains('e', newValueTrimmed)) return false
  return !isNaN(newValueTrimmed) &&
    isValidDecimalPart(newValueTrimmed) &&
    isFinite(newValueTrimmed)
}

// Util function for UI fields which require integer values to be stored
// Gives previous value if new can't be converted to Integer
export const acceptNextDecimal = (newValue, currentValue) => {
  const newValueTrimmed = trim(newValue)
  if (newValueTrimmed === '') return null
  if (!acceptableAsDecimal(newValue)) return currentValue
  if (newValueTrimmed.length > 20) return currentValue
  return newValueTrimmed
}
