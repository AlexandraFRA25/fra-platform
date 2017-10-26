import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import assert from 'assert'

import * as table from './table'
import * as cellTypes from './cellTypes'
import { tableValueChanged, tableChanged, fetchTableData } from './actions'
import ReviewIndicator from '../review/reviewIndicator'
import UpdateOnResizeReactComponent from '../reusableUiComponents/updateOnResizeReactComponent'

const mapIndexed = R.addIndex(R.map)
const commentTarget = (tableName, rowIdx) => [tableName, 'row', `${rowIdx}`]
const rowShouldBeHighlighted = (tableName, rowIdx, openCommentThreadTarget) =>
  R.equals(commentTarget(tableName, rowIdx), openCommentThreadTarget)

const Cell = (props) => {
  const {tableSpec, rowIdx, colIdx} = props
  const cellType = cellTypes.getCellType(tableSpec, rowIdx, colIdx)
  return cellType.render(props)
}

class ReviewWrapper extends React.Component {
  render () {
    return <td ref="rowAnchor" className="fra-table__row-anchor-cell">
      <div className="fra-table__review-indicator-anchor">
        <ReviewIndicator section={this.props.section || this.props.tableSpec.name}
                         name=""
                         target={commentTarget(this.props.tableSpec.name, this.props.rowIdx)}
                         countryIso={this.props.countryIso}/>
      </div>
    </td>
  }
}

const tableRows = (props) => {
  return mapIndexed(
    (rowSpec, rowIdx) =>
      <tr key={rowIdx}
          className={rowShouldBeHighlighted(props.tableSpec.name, rowIdx, props.openCommentThreadTarget) ? 'fra-row-comments__open' : ''}>
        {
          mapIndexed(
            (cellSpec, colIdx) => <Cell key={`${rowIdx}-${colIdx}`}
                                        rowIdx={rowIdx}
                                        colIdx={colIdx}
                                        {...props}/>,
            rowSpec
          )
        }
        {
          !props.tableSpec.disableReviewComments
            ? <ReviewWrapper {...props} rowIdx={rowIdx}/>
            : null
        }
      </tr>,
    props.tableSpec.rows)
}

const validationErrorColumns = props => {
  if (props.tableSpec.columnValidationErrors) {
    const amountOfFillerColumns = R.path(['tableSpec', 'valueSlice', 'columnStart'], props) || 0
    const fillerColumns = R.times(i => <td key={`filler${i}`}/>, amountOfFillerColumns)
    const errorColumns =
      mapIndexed(
        (errorMsg, i) =>
          <td key={`errorColumn${i}`} style={{padding: '12px 10px'}}>
            {errorMsg}
          </td>,
        props.tableSpec.columnValidationErrors(props)
      )
    return [...fillerColumns, ...errorColumns]
  } else {
    return null
  }
}

const validationErrorRow = props => {
  const columns = validationErrorColumns(props)
  if (!columns) return null
  return <tr>
    {columns}
  </tr>
}

const TableBody = props =>
  <tbody>
  {tableRows(props)}
  {validationErrorRow(props)}
  </tbody>


class FraTable extends UpdateOnResizeReactComponent {

  componentWillMount () {
    this.props.fetchTableData(this.props.countryIso, this.props.tableSpec)
  }

  render () {
    return <div ref="traditionalTable" className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table">
          {this.props.tableSpec.header}
          <TableBody {...this.props} />
        </table>
      </div>
    </div>
  }
}

const mapStateToProps = (state, props) => {
  assert(props.tableSpec.name, 'tableSpec is missing name')
  return {
    ...props,
    tableData: state.traditionalTable[props.tableSpec.name] || table.createTableData(props.tableSpec),
    openCommentThreadTarget: state.review.openThread ? state.review.openThread.target : null,
    i18n: state.user.i18n
  }
}

export default connect(mapStateToProps, {tableValueChanged, tableChanged, fetchTableData})(FraTable)
