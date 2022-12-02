import * as fs from 'fs/promises'
import * as path from 'path'
import { config } from 'dotenv'
import * as pgPromise from 'pg-promise'

import { CountryIso } from '../../src/meta/area'
import { ForestEstimationsData } from '../../src/meta/geo'
import { DB } from '../../src/server/db'

type Response = {
  features: Array<{
    geometry: any
    properties: ForestEstimationsData & { iso3: CountryIso }
  }>
}

config({ path: path.resolve(__dirname, '..', '..', '.env') })

export const forestIndicatorsImport = async (): Promise<void> => {
  // eslint-disable-next-line no-console
  const args = process.argv.slice(2)

  const path = args[0]
  const content = await fs.readFile(path)
  const response: Response = JSON.parse(content.toString())

  const values = response.features.map((d) => {
    const { properties } = d
    const { iso3, ...data } = properties
    return { country_iso: iso3, year: 2020, data }
  })
  const schema = 'geo'
  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet(['country_iso', 'year', { name: 'data', cast: 'jsonb' }], {
    table: { table: 'forest_estimations', schema },
  })
  const query = pgp.helpers.insert(values, cs)
  await DB.none(query)
}

forestIndicatorsImport()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('=== process finished')
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error)
    process.exit(1)
  })