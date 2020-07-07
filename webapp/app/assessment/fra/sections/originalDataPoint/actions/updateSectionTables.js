import * as R from 'ramda'

import * as FRAUtils from '@common/fraUtils'
import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { updateTableData } from '@webapp/app/assessment/components/dataTable/actions'

import * as ODP from '../originalDataPoint'
import * as OriginalDataPointStateState from '../originalDataPointState'

const extentOfForest = FRA.sections['1'].children.a
const extentOfForestSectionName = extentOfForest.name
const extentOfForestTableName = extentOfForest.tables.extentOfForest

const forestCharacteristics = FRA.sections['1'].children.b
const forestCharacteristicsSectionName = forestCharacteristics.name
const forestCharacteristicsTableName = forestCharacteristics.tables.extentOfForest

const getDatumOdp = (state, odp, datumFields, draft) => {
  const odpOriginal = OriginalDataPointStateState.getActive(state)
  const { odpId, year } = odp
  const { year: yearPrev } = odpOriginal

  const datumOdp = {
    odpId,
    type: 'odp',
    draft,
    name: String(year),
    namePrev: String(yearPrev),
    year: Number(year),
  }
  Object.entries(datumFields).forEach(([name, value]) => {
    datumOdp[name] = value && value.toString()
  })

  return datumOdp
}

const getUpdateSectionTable = (state, sectionName, tableName, datumOdp) => {
  const assessmentType = FRA.type
  if (AssessmentState.isSectionDataLoaded(assessmentType, sectionName, tableName)(state)) {
    const fraNoNDPs = AssessmentState.getFraNoNDPs(assessmentType, sectionName, tableName)(state)

    const fra = R.pipe(
      AssessmentState.getFra(assessmentType, sectionName, tableName),
      FRAUtils.updateTableWithOdpDatumOdp(datumOdp, fraNoNDPs)
    )(state)
    const data = {
      [AssessmentState.keysDataTableWithOdp.fra]: fra,
      [AssessmentState.keysDataTableWithOdp.fraNoNDPs]: fraNoNDPs,
    }
    return updateTableData({ assessmentType, sectionName, tableName, data })
  }
  return null
}

const getUpdateExtentOfForest = (state, odp, draft) => {
  const forestArea = ODP.classTotalArea(odp, 'forestPercent')
  const otherWoodedLand = ODP.classTotalArea(odp, 'otherWoodedLandPercent')
  const datumFields = { forestArea, otherWoodedLand }
  const datumOdp = getDatumOdp(state, odp, datumFields, draft)

  return getUpdateSectionTable(state, extentOfForestSectionName, extentOfForestTableName, datumOdp)
}

const getUpdateForestCharacteristics = (state, odp, draft) => {
  const naturalForestArea = ODP.subClassTotalArea(odp, 'forestPercent', 'naturalForestPercent')
  const plantationForestArea = ODP.subClassTotalArea(odp, 'forestPercent', 'plantationPercent')
  const plantationForestIntroducedArea = ODP.subSubClassTotalArea(
    odp,
    'forestPercent',
    'plantationPercent',
    'plantationIntroducedPercent'
  )
  const otherPlantedForestArea = ODP.subClassTotalArea(odp, 'forestPercent', 'otherPlantedPercent')
  const datumFields = {
    naturalForestArea,
    plantationForestArea,
    plantationForestIntroducedArea,
    otherPlantedForestArea,
  }

  const datumOdp = getDatumOdp(state, odp, datumFields, draft)
  return getUpdateSectionTable(state, forestCharacteristicsSectionName, forestCharacteristicsTableName, datumOdp)
}

export const getUpdateTablesWithOdp = (state, odp, draft = true) => {
  const actions = []
  actions.push(getUpdateExtentOfForest(state, odp, draft))
  actions.push(getUpdateForestCharacteristics(state, odp, draft))
  return actions.filter((action) => !!action)
}

// ====== No Original Data Point

const _getUpdateTablesWithNotOdp = (state, year, sectionName, tableName) => {
  const fraNoNDPs = AssessmentState.getFraNoNDPs(FRA.type, sectionName, tableName)(state)
  if (!fraNoNDPs) {
    return null
  }
  const datumOdp = R.find(R.propEq('year', year))(fraNoNDPs)
  return getUpdateSectionTable(state, sectionName, tableName, datumOdp)
}

export const getUpdateTablesWithNotOdp = (state, year) => {
  if (!FRA.years.includes(year)) {
    return null
  }
  const actions = []
  actions.push(_getUpdateTablesWithNotOdp(state, year, extentOfForestSectionName, extentOfForestTableName))
  actions.push(
    _getUpdateTablesWithNotOdp(state, year, forestCharacteristicsSectionName, forestCharacteristicsTableName)
  )
  return actions.filter((action) => !!action)
}