import React from 'react'
import R from 'ramda'
import { totalSumFormatted } from '../../traditionalTable/aggregate'

const createInputRow = (rowHeader, cname = 'fra-table__category-cell') => [
  {type: 'readOnly', jsx: <th key="protection" className={`${cname}`}>{rowHeader}</th>},
  ...(R.times(() => ({type: 'decimalInput'}), 4))
]

const totalOwnershipCell = (column) => (props) =>
  <td key="" className="fra-table__calculated-cell">
    {totalSumFormatted(props.tableData, column, R.range(0, 5))}
  </td>


export default i18n => ({
  name: 'holderOfManagementRights',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('holderOfManagementRights.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="4">{i18n.t('holderOfManagementRights.areaUnitLabel')}</th>
  </tr>
  <tr>
    <th className="fra-table__header-cell-right">1990</th>
    <th className="fra-table__header-cell-right">2000</th>
    <th className="fra-table__header-cell-right">2010</th>
    <th className="fra-table__header-cell-right">2015</th>
  </tr>
  </thead>,
  rows: [
    createInputRow(i18n.t('holderOfManagementRights.publicAdministration')),
    createInputRow(i18n.t('holderOfManagementRights.individuals')),
    createInputRow(i18n.t('holderOfManagementRights.privateBusinesses')),
    createInputRow(i18n.t('holderOfManagementRights.communities')),
    createInputRow(i18n.t('holderOfManagementRights.other')),
    [{
      type: 'readOnly',
      jsx: <th key="total_public_ownership" className="fra-table__header-cell">{i18n.t('holderOfManagementRights.totalPublicOwnership')}</th>
    },
      {type: 'custom', render: totalOwnershipCell(1)},
      {type: 'custom', render: totalOwnershipCell(2)},
      {type: 'custom', render: totalOwnershipCell(3)},
      {type: 'custom', render: totalOwnershipCell(4)}
    ]
  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -1
  }
})