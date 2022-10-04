import { TableSection } from '@meta/assessment'
import { NodeUpdate, TableData } from '@meta/data'

export type AssessmentSectionState = {
  data?: TableData
  originalDataPointData?: TableData
  // sectionName -> tableSections
  tableSections: Record<string, Array<TableSection>>
  showOriginalDataPoint?: boolean
  // tableName -> nodeUpdate
  nodeValueValidation: Record<string, NodeUpdate>
  // sectionName -> name -> content
  descriptions: Record<string, Record<string, string>>
}