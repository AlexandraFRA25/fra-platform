export type AssessmentType = 'fra2020' | 'panEuropean'

type AssessmentStatus = 'editing' | 'accepted'

export interface Assessment {
  status: AssessmentStatus
  type: AssessmentType
  deskStudy?: boolean
}