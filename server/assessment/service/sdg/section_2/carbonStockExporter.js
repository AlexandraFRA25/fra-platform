const R = require('ramda')
const Promise = require('bluebird')

const TraditionalTableService = require('../../../../traditionalTable/traditionalTableRepository')

const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

const yearsIdx = {
  '1990': 0,
  '2000': 1,
  '2010': 2,
  '2015': 3,
  '2016': 4,
  '2017': 5,
  '2018': 6,
  '2019': 7,
  '2020': 8,
}

class CarbonStockExporter extends TraditionalTableExporter {

  constructor () {
    super(
      'carbonStock',
      ['carbon_agb', 'carbon_bgb', 'carbon_dw', 'carbon_litter', 'carbon_soil'],
      '2d'
    )
  }

  fetchData (countryIso) {
    return Promise.all([
      TraditionalTableService.read(countryIso, this.tableName),
      TraditionalTableService.read(countryIso, 'carbonStockSoilDepth'),
    ])
  }

  parseResultRow ([result, carbonStockSoilDepth], yearIdx, year) {
    let resultRow = {}

    this.fields.forEach((field, fieldIdx) => {
      const yearIdxTable = yearsIdx[year.toString()]
      resultRow[field] = R.path([fieldIdx, yearIdxTable], result)
    })

    return resultRow
  }

}

const instance = new CarbonStockExporter()

module.exports = instance