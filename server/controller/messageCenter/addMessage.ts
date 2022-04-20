import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { Message, MessageTopicType } from '@meta/messageCenter'
import { User } from '@meta/user'

import { BaseProtocol, DB, Schemas } from '@server/db'
import { ActivityLogRepository } from '@server/repository/assessment/activityLog'
import { MessageRepository } from '@server/repository/assessmentCycle/message'
import { MessageTopicRepository } from '@server/repository/assessmentCycle/messageTopic'

export const addMessage = async (
  props: {
    message: string
    user: User
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    key: string
    type: MessageTopicType
  },
  client: BaseProtocol = DB
): Promise<Message> => {
  const { message: messageText, user, countryIso, assessment, cycle, key, type } = props

  return client.tx(async (t) => {
    let topic = await MessageTopicRepository.getOneOrNone(
      { countryIso, assessment, cycle, key, includeMessages: false },
      client
    )

    if (!topic) {
      topic = await MessageTopicRepository.create({ countryIso, assessment, cycle, key, type }, t)
    }

    const message = await MessageRepository.create({ assessment, cycle, message: messageText, topic, user }, t)

    const schemaName = Schemas.getName(assessment)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: message,
          section: 'messageCenter',
          message: ActivityLogMessage.messageCreate,
          user,
        },
        schemaName,
      },
      t
    )

    return message
  })
}