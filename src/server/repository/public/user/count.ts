import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { RoleName } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

export const count = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    countries?: Array<CountryIso>
    roles?: Array<RoleName>
  },
  client: BaseProtocol = DB
): Promise<{ totals: number }> => {
  const { assessment, cycle, countries, roles } = props

  const selectedCountries = countries.map((countryIso) => `'${countryIso}'`).join(',')

  const selectedRoles = roles.map((roleName) => `'${roleName}'`).join(',')

  let query = `
    select count(distinct(u.id)) as totals from public.users u
      join public.users_role ur on (u.id = ur.user_id)
    where (ur.assessment_id is null or (ur.assessment_id = $1 and ur.cycle_uuid = $2))
      ${selectedCountries ? `and ur.country_iso in (${selectedCountries})` : ''}
      ${selectedRoles ? `and ur.role in (${selectedRoles})` : ''}
  `

  const totals = await client.one<{ totals: number }>(query, [assessment.id, cycle.uuid])

  query = `
    select role, count(*) as totals from public.users_role ur
    where (ur.assessment_id is null or (ur.assessment_id = $1 and ur.cycle_uuid = $2))
      ${selectedCountries ? `and ur.country_iso in (${selectedCountries})` : ''}
      ${selectedRoles ? `and ur.role in (${selectedRoles})` : ''}
    group by role
  `

  const roleTotals = await client.result<Record<string, Array<{ role: RoleName; totals: number }>>>(
    query,
    [assessment.id, cycle.uuid],
    (result) => result.rows.reduce((prev, current) => ({ ...prev, [current.role]: current.totals }), {})
  )

  return { ...totals, ...roleTotals }
}
