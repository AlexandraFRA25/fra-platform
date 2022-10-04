import React from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from '@utils/numbers'

import { ODPNationalClass } from '@meta/assessment'

// import { useCountryIso } from '@client/hooks'
import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { OriginalDataPointActions, useOriginalDataPoint } from '@client/store/pages/originalDataPoint'
import PercentInput from '@client/components/PercentInput'
import ReviewIndicator from '@client/components/ReviewIndicator'

import { useNationalClassNameComments, useNationalClassValidation } from '../../hooks'

const columns = [{ name: 'plantationIntroducedPercent', type: 'decimal' }]

const allowedClass = (nc: ODPNationalClass) =>
  nc.plantationPercent !== null && Number(nc.plantationPercent) >= 0 && Number(nc.forestPercent) > 0

type Props = {
  canEditData: boolean
  index: number
}

const ForestCharacteristicsPlantationRow: React.FC<Props> = (props) => {
  const { canEditData, index } = props
  const originalDataPoint = useOriginalDataPoint()

  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  // const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const { nationalClasses, id } = originalDataPoint
  const nationalClass = nationalClasses[index]
  const { name, area, forestPercent, plantationPercent, plantationIntroducedPercent, uuid } = nationalClass
  const target = [id, 'class', `${uuid}`, 'plantation_forest_introduced'] as string[]
  const classNameRowComments = useNationalClassNameComments(target)
  const validationStatus = useNationalClassValidation(index)
  const classNamePercentageValidation = validationStatus.validPlantationIntroducedPercentage === false ? 'error' : ''
  const plantationIntroduced = area
    ? Numbers.mul(area, Numbers.div(Numbers.mul(plantationPercent, forestPercent), 10000))
    : null

  if (!allowedClass(nationalClass)) {
    return null
  }

  // const isPlantationPercentNull = plantationPercent === null

  const isZeroOrNullPlantationIntroduced = plantationIntroduced === null || Numbers.eq(plantationIntroduced, 0)

  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">{name}</th>
      <th className="fra-table__calculated-sub-cell fra-table__divider">{Numbers.format(plantationIntroduced)}</th>
      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          disabled={!canEditData || isZeroOrNullPlantationIntroduced}
          numberValue={isZeroOrNullPlantationIntroduced ? 0 : plantationIntroducedPercent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.updateNationalClass({
                odp: originalDataPoint,
                index,
                field: 'plantationIntroducedPercent',
                prevValue: plantationIntroducedPercent,
                value: event.target.value,
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
              })
            )
          }}
          onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.pasteNationalClass({
                odp: originalDataPoint,
                event,
                colIndex: 0,
                rowIndex: index,
                columns,
                allowedClass,
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
              })
            )
          }}
        />
      </td>

      {originalDataPoint.id && canEditData && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            title={name}
            subtitle={i18n.t('nationalDataPoint.plantationForest')}
            topicKey={`${originalDataPoint.id}-class-${originalDataPoint.nationalClasses[index].uuid}-plantationForestIntroduced`}
          />
        </td>
      )}
    </tr>
  )
}

export default ForestCharacteristicsPlantationRow