import { CountryIso } from '@meta/area'
import { ForestSource, Layer, sourcesMetadata } from '@meta/geo'

import { AssetsController } from '@server/controller/geo/assets'

import { authenticateToGee } from './authenticateToGee'

type Props = {
  countryIso: CountryIso
  forestSource: ForestSource
  gteHansenTreeCoverPerc?: 10 | 20 | 30
}

export const getForestLayer = async (props: Props): Promise<Layer> => {
  const { countryIso, forestSource, gteHansenTreeCoverPerc } = props

  await authenticateToGee()

  const ftcCountry = AssetsController.getCountryBoundaries(countryIso)
  const asset = AssetsController.getForestAssetData(forestSource, gteHansenTreeCoverPerc)
  const metadata = sourcesMetadata[forestSource]

  return new Promise((resolve, reject) => {
    asset.img
      .clip(ftcCountry)
      .selfMask()
      .getMap({ palette: metadata.palette }, (mapProperties: any, err: any) => {
        if (err) {
          reject(err)
          return
        }
        resolve({
          mapId: mapProperties.mapid,
          year: asset.year,
          scale: metadata.scale,
          palette: metadata.palette,
          citation: metadata.citation,
        })
      })
  })
}