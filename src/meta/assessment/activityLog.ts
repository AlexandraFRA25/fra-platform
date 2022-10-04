import { User } from '../user'

export enum ActivityLogMessage {
  assessmentCreate = 'assessmentCreate',
  assessmentCycleCreate = 'assessmentCycleCreate',
  assessmentFileCreate = 'assessmentFileCreate',
  assessmentFileDelete = 'assessmentFileDelete',
  assessmentStatusUpdate = 'assessmentStatusUpdate',
  originalDataPointCreate = 'originalDataPointCreate',
  originalDataPointUpdate = 'originalDataPointUpdate',
  originalDataPointRemove = 'originalDataPointRemove',
  descriptionUpdate = 'descriptionUpdate',
  nodeValueUpdate = 'nodeValueUpdate',
  nodeValueEstimate = 'nodeValueEstimate',
  tableValuesClear = 'tableValuesClear',
  nodeValueCalculatedUpdate = 'nodeValueCalculatedUpdate',
  messageCreate = 'messageCreate',
  messageMarkDeleted = 'messageMarkDeleted',
  topicStatusChange = 'topicStatusChange',
  invitationAdd = 'invitationAdd',
  invitationAccept = 'invitationAccept',
  invitationRemove = 'invitationRemove',
  userRemove = 'userRemove',
  userUpdate = 'userUpdate',
}

export interface ActivityLog<Target> {
  target: Target
  message: ActivityLogMessage
  countryIso?: string
  section: string
  user: User
  time?: string
}