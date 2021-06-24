import { formatNumber } from './bignumberUtils'

export const formatInteger = (num: any) => formatNumber(num, 0)

export const formatDecimal = (num: any) => formatNumber(num, 2)

export default {
  formatDecimal,
  formatInteger,
}