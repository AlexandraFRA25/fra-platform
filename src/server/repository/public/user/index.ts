import { create } from './create'
import { getMany } from './getMany'
import { getOne } from './getOne'
import { getProfilePicture } from './getProfilePicture'
import { readCountryUsersByRole } from './readCountryUsersByRole'
import { remove } from './remove'
import { update } from './update'

export const UserRepository = {
  create,
  update,
  getMany,
  getOne,
  getProfilePicture,
  remove,
  readCountryUsersByRole,
}