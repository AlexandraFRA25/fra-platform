import * as NumberUtils from '@common/bignumberUtils'

export const units = {
  haThousand: 'haThousand',
  haThousandPerYear: 'haThousandPerYear',
  tonnesPerHa: 'tonnesPerHa',
  cubicMeterPerHa: 'cubicMeterPerHa',
  millionTonnes: 'millionTonnes',
  millionsCubicMeterOverBark: 'millionsCubicMeterOverBark',
  thousandCubicMeter: 'thousandCubicMeter',
  thousandCubicMeterOverBark: 'thousandCubicMeterOverBark',
  thousandCubicMeterRWE: 'thousandCubicMeterRWE',
  thousandPersons: 'thousandPersons',
  fte1000: 'fte1000',
  numberOfStudents: 'numberOfStudents',
  absoluteNumber: 'absoluteNumber',
  annualNumberOfVisitsMillion: 'annualNumberOfVisitsMillion',
  millionNationalCurrency: 'millionNationalCurrency',
  facilityLengthIn1000Km: 'facilityLengthIn1000Km',
}

export const factors = {
  [units.haThousand]: {
    [units.haThousand]: 1,
    ha: 1000,
    kmSq: 10,
    mileSq: 3.86102,
    acre1000: 2.47105,
    acre: 2471.05,
    haMillion: 0.001,
  },
}

export const convert = (value: any, unit: any, factor: any) =>
  NumberUtils.formatNumber(NumberUtils.mul(value, factors[unit][factor]))