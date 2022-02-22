import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository, OriginalDataPointRepository } from '@server/repository'
import { OriginalDataPoint } from '@meta/assessment'

export const getOriginalDataPoint = async (
  props: { name: string; cycleName: string; odpId: number },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { name, cycleName, odpId } = props

  const assessment = await AssessmentRepository.read({ name })
  const assessmentCycle = assessment.cycles.find((cycle) => cycle.name === cycleName)
  return OriginalDataPointRepository.getOne({ assessment, assessmentCycle, odpId }, client)
}