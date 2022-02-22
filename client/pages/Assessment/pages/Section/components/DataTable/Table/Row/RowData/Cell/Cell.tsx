import React from 'react'

import { AssessmentName, Col, ColType, Table } from '@meta/assessment'
import Calculated from './Calculated'
import Number from './Number'
import Text from './Text'
// import Select from './Select'
// import Placeholder from './Placeholder'
import useClassName from './useClassName'
// import useOnChange from './useOnChange'
import { PropsCell } from './props'

const ComponentsByName: Record<string, React.FC<PropsCell>> = {
  [ColType.calculated]: Calculated,
  [ColType.text]: Text,
  [ColType.textarea]: Text,
  [ColType.decimal]: Number,
  [ColType.integer]: Number,
  // [ColType.select]: Select, // TODO
  // [ColType.placeholder]: Placeholder,
}

type Props = {
  data: any[] // TODO
  assessmentName: AssessmentName
  sectionName: string
  table: Table
  disabled: boolean
  rowIndex: number
  col: Col
}

const Cell: React.FC<Props> = (props) => {
  const { data, assessmentName, sectionName, table, disabled, rowIndex, col } = props

  const datum = (data?.[rowIndex] as any)?.[col.props.index as number]

  const className = useClassName(col /* rowIndex */)

  // const propsOnChange = { assessmentName, sectionName, tableSpec, rowIndex, col, datum }
  // this is a placeholder
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { onChange, onPaste } = { onChange: () => {}, onPaste: () => {} } // TODO useOnChange(propsOnChange)

  const Component = ComponentsByName[col.props.colType]

  return (
    <td className={className}>
      {Component &&
        React.createElement(Component, {
          datum,
          assessmentName,
          sectionName,
          table,
          disabled,
          col,
          rowIndex,
          onChange,
          onPaste: disabled ? () => ({}) : onPaste,
        })}
    </td>
  )
}

export default Cell