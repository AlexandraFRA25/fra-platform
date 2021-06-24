import './dataTable.less'
import React from 'react'
import { useSelector } from 'react-redux'
import * as ObjectUtils from '@common/objectUtils'
import * as SectionSpec from  '@webapp/app/assessment/components/section/sectionSpec'
import { useI18n, usePrintView } from '@webapp/components/hooks'
import Table from './table'
import Chart from './chart'
import GenerateValues from './generateValues'
import { getRowsSliced } from './printUtils'

type Props = {
  assessmentType: string
  sectionName: string
  sectionAnchor: string
  tableSpec: any
  disabled: boolean
}
const DataTable = (props: Props) => {
  const { assessmentType, sectionName, sectionAnchor, tableSpec, disabled } = props
  const tableName = tableSpec[SectionSpec.KEYS_TABLE.name]
  const rows = tableSpec[SectionSpec.KEYS_TABLE.rows]
  const getSectionData = tableSpec[SectionSpec.KEYS_TABLE.getSectionData]
  const isSectionDataEmpty = tableSpec[SectionSpec.KEYS_TABLE.isSectionDataEmpty]
  const odp = tableSpec[SectionSpec.KEYS_TABLE.odp]
  const showOdpChart = tableSpec[SectionSpec.KEYS_TABLE.showOdpChart]
  const canGenerateValues = tableSpec[SectionSpec.KEYS_TABLE.canGenerateValues]
  const breakPointsColsPrint = tableSpec[SectionSpec.KEYS_TABLE.print][SectionSpec.KEYS_TABLE_PRINT.colBreakPoints]
  const i18n = useI18n()
  const data: any = useSelector(getSectionData(assessmentType, sectionName, tableName))
  const dataEmpty = useSelector(isSectionDataEmpty(assessmentType, sectionName, tableName))
  const generateValues = useSelector(
    (state) => odp && !disabled && ObjectUtils.isFunction(canGenerateValues) && canGenerateValues(state)
  )
  const [printView] = usePrintView()
  if (!data) {
    return null
  }
  return (
    <>
      {showOdpChart && (!printView || !dataEmpty) && (
        <>
          <Chart
            fra={data}
            trends={rows
              .filter((row: any) => !!row.chartProps)
              .map((row: any) => ({
                name: row.variableName,
                label: (i18n as any).t(row.chartProps.labelKey),
                color: row.chartProps.color,
              }))}
          />
          <div className="page-break" />
        </>
      )}

      {generateValues && (
        <GenerateValues
          assessmentType={assessmentType}
          sectionName={sectionName}
          tableName={tableName}
          rows={rows}
          data={data}
        />
      )}

      {printView && breakPointsColsPrint.length > 0 ? (
        breakPointsColsPrint.map((breakPoint: any, breakPointIdx: any) => {
          const rowsSliced = getRowsSliced(breakPointsColsPrint, breakPointIdx, rows)
          return (
            <Table
              key={breakPoint}
              assessmentType={assessmentType}
              sectionName={sectionName}
              sectionAnchor={sectionAnchor}
              tableSpec={tableSpec}
              rows={rowsSliced}
              data={data}
              disabled={disabled}
            />
          )
        })
      ) : (
        <Table
          assessmentType={assessmentType}
          sectionName={sectionName}
          sectionAnchor={sectionAnchor}
          tableSpec={tableSpec}
          rows={rows}
          data={data}
          disabled={disabled}
        />
      )}
    </>
  )
}
export default DataTable