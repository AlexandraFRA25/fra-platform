import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import assert from 'assert'

import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import * as table from './table'
import { tableValueChanged, fetchTableData } from './actions'

const mapIndexed = R.addIndex(R.map)

const IntegerInput = ({countryIso, tableSpec, tableData, rowIdx, colIdx, tableValueChanged}) => {
  const currentValue = tableData[rowIdx][colIdx]
  return <td className="fra-table__cell">
    <ThousandSeparatedIntegerInput integerValue={ currentValue }
                                   className="fra-table__integer-input"
                                   onChange={ (evt) => tableValueChanged(countryIso, tableSpec, rowIdx, colIdx, evt.target.value) }/>
  </td>
}

const cellTypeHandlers = {
  'integerInput': (cellSpec, props) => <IntegerInput {...props}/>,
  'readOnly': (cellSpec, props) => cellSpec.jsx,
  'custom': (cellSpec, props) => cellSpec.render(props)
}

const Cell = (props) => {
  const {tableSpec, rowIdx, colIdx} = props
  const cellSpec = tableSpec.rows[rowIdx][colIdx]
  assert(cellSpec, `No cellspec for ${rowIdx} ${colIdx}`)
  const handler = cellTypeHandlers[cellSpec.type]
  if (handler) {
    return handler(cellSpec, props)
  } else {
    throw `Unknown cell type ${cellSpec.type}`
  }
}

const tableRows = (props) => {
  return mapIndexed(
    (rowSpec, rowIdx) =>
      <tr key={rowIdx}>
        { mapIndexed((cellSpec, colIdx) => <Cell key={`${rowIdx}-${colIdx}`} rowIdx={rowIdx} colIdx={colIdx} {...props}/>, rowSpec) }
      </tr>,
    props.tableSpec.rows)
}

const TableBody = (props) =>
  <tbody>
   {tableRows(props)}
  </tbody>

class FraTable extends React.Component {

  componentWillMount() {
    this.props.fetchTableData(this.props.countryIso, this.props.tableSpec)
  }

  render () {
    return <table className="fra-table">
      {this.props.tableSpec.header}
      <TableBody {...this.props}/>
    </table>
  }
}

const mapStateToProps = (state, props) => {
  assert(props.tableSpec.name, 'tableSpec is missing name')
  return {...props, tableData: state.traditionalTable[props.tableSpec.name] || table.createTableData(props.tableSpec)}
}

export default connect(mapStateToProps, { tableValueChanged, fetchTableData })(FraTable)