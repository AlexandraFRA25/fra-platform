import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { UserRepository } from '@server/repository/public/user'
import { UserRoleRepository } from '@server/repository/public/userRole'
import { MailService } from '@server/service'

export const sendInvitationEmail = async (
  props: { invitationUuid: string; user: User },
  client: BaseProtocol = DB
): Promise<void> => {
  const { invitationUuid, user } = props

  const userRole = await UserRoleRepository.read({ invitationUuid }, client)

  const userToInvite = await UserRepository.getOne({ id: userRole.userId }, client)

  await MailService.userInvite({
    countryIso: userRole.countryIso,
    role: userRole,
    userToInvite,
    user,
    url: process.env.APP_URI,
  })
}