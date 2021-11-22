import { Row } from '../../core/meta/row'
import { Col, ColType } from '../../core/meta/col'
import { ColSpec } from '../../webapp/sectionSpec'

export const getCol = (props: { cycles: Array<string>; colSpec: ColSpec; row: Row }): Col => {
  const { colSpec, cycles, row } = props
  const col: Col = {
    props: {
      cycles,
      colSpan: colSpec.colSpan,
      rowSpan: colSpec.rowSpan,
      colType: colSpec.type as unknown as ColType,
    },
    rowId: row.id,
  }
  return col
}