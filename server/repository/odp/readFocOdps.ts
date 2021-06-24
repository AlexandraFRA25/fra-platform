import * as db from '@server/db/db_deprecated'
import * as R from 'ramda'

export const focReducer = (results: any, row: any, _type = 'fra') => [
  ...results,
  {
    odpId: row.odp_id,
    naturalForestArea: row.natural_forest_area,
    plantationForestArea: row.plantation_forest_area,
    plantationForestIntroducedArea: row.plantation_forest_introduced_area,
    otherPlantedForestArea: row.other_planted_forest_area,
    name: `${row.year}`,
    type: 'odp',
    year: Number(row.year),
    dataSourceMethods: R.path(['data_source_methods', 'methods'], row),
    draft: row.draft,
  },
]
export const readFocOdps = async (countryIso: any, schemaName = 'public') => {
  const tableNameOdp = `${schemaName}.odp`
  const tableNameOdpVersion = `${schemaName}.odp_version`
  const tableNameOdpClass = `${schemaName}.odp_class`
  const res = await db.pool.query(
    `
    SELECT
      p.id as odp_id,
      v.year,
      v.data_source_methods,
      SUM(c.area * c.forest_percent * c.forest_natural_percent / 10000.0) AS natural_forest_area,
      SUM(c.area * c.forest_percent * c.forest_plantation_percent / 10000.0) AS plantation_forest_area,
      SUM(c.area * c.forest_percent * c.forest_plantation_percent * c.forest_plantation_introduced_percent / 1000000.0) AS plantation_forest_introduced_area,
      SUM(c.area * c.forest_percent * c.other_planted_forest_percent / 10000.0) AS other_planted_forest_area,
    CASE
      WHEN p.draft_id IS NULL
      THEN FALSE
      ELSE TRUE
    END AS draft
    FROM ${tableNameOdp} p
    JOIN ${tableNameOdpVersion} v
    ON v.id =
      CASE WHEN p.draft_id IS NULL
      THEN p.actual_id
      ELSE p.draft_id
    END
    LEFT OUTER JOIN ${tableNameOdpClass} c
      ON c.odp_version_id = v.id
    WHERE p.country_iso = $1 AND year IS NOT NULL
    GROUP BY odp_id, v.year, v.data_source_methods, draft`,
    [countryIso]
  )
  // TODO: Remove ramda
  return R.reduce(focReducer, [], res.rows)
}