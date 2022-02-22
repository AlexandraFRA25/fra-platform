import { ExpressionContext } from '@arena/core'
import { AssessmentMetaCache, Row } from '../../../../../meta/assessment'

export interface Context extends ExpressionContext {
  assessmentMetaCache: AssessmentMetaCache
  row: Row
  tableName: string
}