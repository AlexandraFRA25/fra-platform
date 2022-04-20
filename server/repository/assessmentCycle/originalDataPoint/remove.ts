import { Objects } from '@core/utils'
import { Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'
import { BaseProtocol, DB, Schemas } from '@server/db'

export const remove = async (
  props: { assessment: Assessment; assessmentCycle: Cycle; originalDataPoint: OriginalDataPoint },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, assessmentCycle, originalDataPoint } = props

  const schemaName = Schemas.getNameCycle(assessment, assessmentCycle)

  return client.one<OriginalDataPoint>(
    `delete from ${schemaName}.original_data_point where id = $1 returning *;`,
    [originalDataPoint.id],
    Objects.camelize
  )
}