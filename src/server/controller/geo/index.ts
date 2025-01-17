import { getBoundariesLayer } from './getBoundariesLayer'
import { getBounds } from './getBounds'
import { getForestAgreementLayer } from './getForestAgreementLayer'
import { estimateForestAgreementArea, getForestEstimations } from './getForestEstimations'
import { getForestLayer } from './getForestLayer'

export const GeoController = {
  getForestLayer,
  getForestAgreementLayer,
  getBoundariesLayer,
  getForestEstimations,
  estimateForestAgreementArea,
  getBounds,
}
