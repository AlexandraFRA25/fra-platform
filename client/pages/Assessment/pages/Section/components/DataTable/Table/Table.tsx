import React, { useRef } from 'react'

import { AssessmentName, Col, Row as TypeRow, RowType, Table as TableType } from '@meta/assessment'

import ButtonTableExport from '@client/components/ButtonTableExport'
// import CellOdpHeader from './CellOdpHeader'
import { useTranslation } from 'react-i18next'
import Row from './Row'

type Props = {
  assessmentName: AssessmentName
  sectionName: string
  sectionAnchor: string
  table: TableType
  rows: Array<TypeRow>
  data: any[] // TODO
  disabled: boolean
}

const Table: React.FC<Props> = (props) => {
  const { assessmentName, sectionName, sectionAnchor, table, rows, data, disabled } = props

  const { i18n } = useTranslation()
  const [printView] = [false] // usePrintView()

  const odp = table.props.odp === true
  const secondary = false // todo: missing table.props.secondary === true
  const rowsHeader = rows.filter((row) => row.props.type === RowType.header)
  const rowsData = rows.filter((row) => row.props.type !== RowType.header)
  const tableRef = useRef<HTMLTableElement>(null)
  const displayTableExportButton = !secondary && !printView && tableRef.current != null

  return (
    <div className={`fra-table__container${secondary ? ' fra-secondary-table__wrapper' : ''}`}>
      <div className="fra-table__scroll-wrapper">
        {displayTableExportButton && <ButtonTableExport tableRef={tableRef} filename={sectionAnchor} />}

        <table id={table.props.name} ref={tableRef} className="fra-table data-table">
          <thead>
            {rowsHeader.map((row: TypeRow) => (
              <tr key={row.uuid}>
                {row.cols.map((col: Col) => {
                  const { index, /* idx, className, */ colSpan, rowSpan, labelKey /* labelParams,  label */ } =
                    col.props
                  return (
                    <th
                      key={col.uuid}
                      className={`fra-table__header-cell${index === 0 ? '-left' : ''}`}
                      colSpan={odp && !colSpan ? data.length : colSpan}
                      rowSpan={rowSpan}
                    >
                      {labelKey
                        ? i18n.t(labelKey, {
                            /* labelParams */
                          })
                        : `Todo: missing: label`}
                    </th>
                  )
                })}
              </tr>
            ))}

            {/* TODO */}
            {/* {odp && ( */}
            {/*  <tr> */}
            {/*    {data.map((datum) => { */}
            {/*      const datumODP = datum as TableDatumODP */}
            {/*      return ( */}
            {/*        <CellOdpHeader key={datumODP.name || datumODP.year} sectionName={sectionName} datum={datumODP} /> */}
            {/*      ) */}
            {/*    })} */}
            {/*  </tr> */}
            {/* )} */}
          </thead>

          <tbody>
            {rowsData.map((row: TypeRow) => (
              <Row
                key={row.uuid}
                assessmentName={assessmentName}
                sectionName={sectionName}
                table={table}
                data={data}
                row={row}
                disabled={disabled}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table