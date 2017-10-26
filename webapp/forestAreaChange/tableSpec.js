import React from 'react'
import R from 'ramda'
import { formatDecimal } from '../utils/numberFormat'
import { sub } from '../../common/bignumberUtils'
import { ofWhichValidator } from '../traditionalTable/validators'

const expansionValidator = ofWhichValidator(0, R.range(1, 3))

const integerInputColumns = R.times(() => ({type: 'decimalInput'}), 4)
const ofWhichColumns = R.times(() => ({type: 'decimalInput', validator: expansionValidator}), 4)

const netChange = (expansion, deforestation) => formatDecimal(sub(expansion, deforestation))

const netChangeCell = (column) => (props) =>
  <td key="" className="fra-table__calculated-cell">
    {netChange(props.tableData[0][column], props.tableData[3][column])}
  </td>

export default i18n => ({
  name: 'forestAreaChange', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('forestAreaChange.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="4">{i18n.t('forestAreaChange.areaUnitLabel')}</th>
  </tr>
  <tr>
    <th className="fra-table__header-cell-right">1990-2000</th>
    <th className="fra-table__header-cell-right">2000-2010</th>
    <th className="fra-table__header-cell-right">2010-2015</th>
    <th className="fra-table__header-cell-right">2015-2020</th>
  </tr>
  </thead>,
  rows: [
    [{type: 'readOnly', jsx: <th key="expansion" className="fra-table__category-cell">{i18n.t('forestAreaChange.forestExpansion')}</th>},
      ...integerInputColumns
    ],
    [
      {type: 'readOnly', jsx: <th key="" className="fra-table__subcategory-cell">{i18n.t('forestAreaChange.ofWhichAfforestation')}</th>},
      ...ofWhichColumns
    ],
    [
      {type: 'readOnly', jsx: <th key="" className="fra-table__subcategory-cell">{i18n.t('forestAreaChange.ofWhichNaturalExpansion')}</th>},
      ...ofWhichColumns
    ],
    [
      {type: 'readOnly', jsx: <th key="" className="fra-table__category-cell">{i18n.t('forestAreaChange.deforestation')}</th>},
      ...integerInputColumns
    ],
    [
      {type: 'readOnly', jsx: <th key="" className="fra-table__header-cell">{i18n.t('forestAreaChange.forestAreaNetChange')}</th>},
      {type: 'custom', render: netChangeCell(1)},
      {type: 'custom', render: netChangeCell(2)},
      {type: 'custom', render: netChangeCell(3)},
      {type: 'custom', render: netChangeCell(4)}
    ]
  ],
  valueSlice: {
    rowStart: 0,
    rowEnd: -1,
    columnStart: 1,
    columnEnd: undefined
  }
})
