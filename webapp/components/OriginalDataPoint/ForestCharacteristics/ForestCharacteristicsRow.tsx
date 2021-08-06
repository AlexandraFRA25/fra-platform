import React from 'react'
import { useDispatch } from 'react-redux'

import { ODP, ODPNationalClass } from '@core/odp'
import * as NumberUtils from '@common/bignumberUtils'
import { PercentInput } from '@webapp/components/percentInput'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import {
  pasteNationalClassValues,
  updateNationalClassValue,
} from '../../../sectionSpec/fra/originalDataPoint/actions'
import { useNationalClassNameComments, useNationalClassValidation } from '../hooks'

const columns = [
  { name: 'area', type: 'decimal' },
  { name: 'naturalForestPercent', type: 'decimal' },
  { name: 'plantationPercent', type: 'decimal' },
  { name: 'otherPlantedPercent', type: 'decimal' },
]

const allowedClass = (nc: ODPNationalClass) => Number(nc.forestPercent) > 0

type Props = {
  canEditData: boolean
  index: number
  odp: ODP
}

const ForestCharacteristicsRow: React.FC<Props> = (props) => {
  const { canEditData, index, odp } = props

  const dispatch = useDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()

  const { nationalClasses, odpId } = odp
  const nationalClass = nationalClasses[index]
  const { className, area, naturalForestPercent, plantationPercent, otherPlantedPercent, uuid } = nationalClass
  const target = [odpId, 'class', `${uuid}`, 'forest_charasteristics']
  const classNameRowComments = useNationalClassNameComments(target)
  const validationStatus = useNationalClassValidation(index)
  const classNamePercentageValidation = validationStatus.validFocPercentage === false ? 'error' : ''

  if (!allowedClass(nationalClass)) {
    return null
  }

  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">{className}</th>
      <th className="fra-table__calculated-sub-cell fra-table__divider">
        {area && NumberUtils.formatNumber((Number(area) * Number(nationalClass.forestPercent)) / 100)}
      </th>
      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          disabled={!canEditData}
          numberValue={naturalForestPercent}
          onChange={(event: any) => {
            dispatch(updateNationalClassValue(index, 'naturalForestPercent', naturalForestPercent, event.target.value))
          }}
          onPaste={(event: any) => {
            dispatch(
              pasteNationalClassValues({
                event,
                rowIndex: index,
                colIndex: 1,
                columns,
                allowedClass,
              })
            )
          }}
        />
      </td>

      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          disabled={!canEditData}
          numberValue={plantationPercent}
          onChange={(event: any) => {
            dispatch(updateNationalClassValue(index, 'plantationPercent', plantationPercent, event.target.value))
          }}
          onPaste={(event: any) => {
            dispatch(
              pasteNationalClassValues({
                event,
                rowIndex: index,
                colIndex: 2,
                columns,
                allowedClass,
              })
            )
          }}
        />
      </td>

      <td className={`fra-table__cell ${classNamePercentageValidation}`}>
        <PercentInput
          disabled={!canEditData}
          numberValue={otherPlantedPercent}
          onChange={(event: any) => {
            dispatch(updateNationalClassValue(index, 'otherPlantedPercent', otherPlantedPercent, event.target.value))
          }}
          onPaste={(event: any) => {
            dispatch(
              pasteNationalClassValues({
                event,
                rowIndex: index,
                colIndex: 3,
                columns,
                allowedClass,
              })
            )
          }}
        />
      </td>

      <td className="fra-table__row-anchor-cell">
        {odp.odpId && canEditData && (
          <div className="odp__review-indicator-row-anchor">
            <ReviewIndicator
              section="odp"
              title={i18n.t('nationalDataPoint.forestCharacteristics')}
              target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'forest_charasteristics']}
              countryIso={countryIso}
            />
          </div>
        )}
      </td>
    </tr>
  )
}

export default ForestCharacteristicsRow