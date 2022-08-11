import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { AuthMiddleware } from '@server/middleware/auth'

import { addMessage } from './addMessage'
import { getTopic } from './getTopic'
import { getUnreadMessages } from './getUnreadMessages'
import { markMessageDeleted } from './markMessageDeleted'
import { resolveTopic } from './resolveTopic'

export const MessageCenterApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.MessageCenter.Topic.get(), AuthMiddleware.requireEditMessageTopic, getTopic)
    express.post(ApiEndPoint.MessageCenter.Topic.getMessage(), AuthMiddleware.requireEditMessageTopic, addMessage)
    express.delete(
      ApiEndPoint.MessageCenter.Topic.getMessage(),
      AuthMiddleware.requireDeleteTopicMessage,
      markMessageDeleted
    )
    express.get(ApiEndPoint.MessageCenter.Topic.getUnreadMessages(), getUnreadMessages)
    express.put(ApiEndPoint.MessageCenter.Topic.resolveTopic(), AuthMiddleware.requireResolveTopic, resolveTopic)
  },
}
