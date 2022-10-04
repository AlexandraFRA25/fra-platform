import { User, UserAuthProvider } from '@meta/user'
import { BaseProtocol, DB } from '@server/db'
import { UserRepository } from '@server/repository/public/user'
import { UserProviderRepository } from '@server/repository/public/userProvider'

export const create = async (
  props: {
    user: Pick<User, 'name' | 'email'>
    provider: Pick<UserAuthProvider<{ password?: string; email?: string }>, 'provider' | 'props'>
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user, provider } = props

  return client.tx(async (t) => {
    // TODO: we should only record when the user has been invited to a specific assessment. maybe insert an entry only when the user has been invited?
    const newUser = await UserRepository.create({ user }, t)
    await UserProviderRepository.create(
      {
        provider: {
          ...provider,
          userId: newUser.id,
        },
      },
      t
    )

    return newUser
  })
}