import { listAndValidateOriginalDataPoints } from './listAndValidateOriginalDataPoints'
import { listOriginalDataPoints } from './listOriginalDataPoints'
import { getOdp } from './getOdp'
import { deleteDraft } from './deleteDraft'
import { saveDraft } from './saveDraft'
import { create } from './create'
import { markAsActual } from './markAsActual'
import { deleteOdp } from './deleteOdp'
import { getOdpVersionId } from './getOdpVersionId'
import { readEofOdps } from './readEofOdps'
import { readFocOdps } from './readFocOdps'

export const OdpService = {
  listAndValidateOriginalDataPoints,
  listOriginalDataPoints,
  getOdp,
  deleteDraft,
  saveDraft,
  create,
  markAsActual,
  deleteOdp,
  getOdpVersionId,
  readEofOdps,
  readFocOdps,
}