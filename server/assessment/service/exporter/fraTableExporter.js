const R = require('ramda')

class FraTableExporter {

  constructor (tableName, fields, tableNo = '') {
    this.tableName = tableName
    this.fields = fields
    this.tableNo = tableNo
  }

  get tableName () {
    return this._tableName
  }

  set tableName (tableName) {
    this._tableName = tableName
  }

  get fields () {
    return this._fields
  }

  set fields (fields) {
    this._fields = fields
  }

  get tableNo () {
    return this._tableNo
  }

  set tableNo (tableNo) {
    this._tableNo = tableNo
  }

  get fieldsWithLabels () {
    return this.fields.map(field => ({
      value: field,
      label: R.isEmpty(this.tableNo)
        ? field
        : `${this.tableNo}_${field}`,
    }))
  }

  fetchData (countryIso) {
    throw new Error('fetchData method not implemented')
  }

  parseResultRow (result, yearIdx, year) {
    throw new Error('parseResultRow method not implemented')
  }

}

module.exports = FraTableExporter