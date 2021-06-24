import { Express, Response, Request } from 'express'
import * as VersionService from '@server/service/versioning/service'
import * as R from 'ramda'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { OdpService } from '@server/service'

export const OdpGetMany = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Odp.getMany(), async (req: Request, res: Response) => {
      try {
        const schemaName = await VersionService.getDatabaseSchema(req)

        const odp = R.isNil(req.query.odpId) ? Promise.resolve({}) : OdpService.getOdp(req.query.odpId, schemaName)

        const odps = OdpService.listOriginalDataPoints(req.query.countryIso, schemaName)

        const [odpResult, odpsResult] = await Promise.all([odp, odps])

        const result = R.merge(odpResult, {
          reservedYears: R.pipe(
            R.values,
            R.map(R.prop('year')),
            R.uniq,
            R.reject(R.equals(R.defaultTo(null, odpResult.year))) // odp's year is not reserved for the odp itself
          )(odpsResult),
        })
        res.json(result)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}