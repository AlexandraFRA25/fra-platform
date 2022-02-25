import React from 'react'

import VerticallyGrowingTextField from '@client/components/VerticallyGrowingTextField'
import MultiSelect from '@client/components/MultiSelect'
// import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { OriginalDataPointActions, useOriginalDataPoint } from '@client/store/pages/originalDataPoint'
import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { OriginalDataPoint, ODPDataSourceMethod } from '@meta/assessment/originalDataPoint'
import { useTranslation } from 'react-i18next'
// import { useCountryIso } from '@client/hooks'
import { Objects } from '@core/utils'

type Props = {
  canEditData: boolean
}

const DataSources: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()

  const dispatch = useAppDispatch()
  const i18n = useTranslation()
  // const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const [printView] = [false] // TODO: usePrintView()
  const displayReviewIndicator = originalDataPoint.id && !printView && canEditData

  const updateOriginalDataPoint = (originalDataPointUpdate: OriginalDataPoint) => {
    dispatch(
      OriginalDataPointActions.updateOriginalDataPoint({
        cycleName: cycle.name,
        assessmentName: assessment.props.name,
        originalDataPoint: originalDataPointUpdate,
      })
    )
  }

  return (
    <div className="odp__section">
      {!printView && <h3 className="subhead">{i18n.t('nationalDataPoint.dataSources')}</h3>}

      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper odp__data-source-table-wrapper">
          <table className="fra-table">
            <tbody>
              <tr>
                {printView && (
                  <th className="fra-table__header-cell odp__year-column" rowSpan={3}>
                    {originalDataPoint.year}
                  </th>
                )}
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.references')}</th>
                <td className="fra-table__cell-left odp__data-source-input-column">
                  <VerticallyGrowingTextField
                    value={originalDataPoint.dataSourceReferences || ''}
                    onChange={(event) => {
                      const { value } = event.target
                      const originalDataPointUpdate = {
                        ...originalDataPoint,
                        dataSourceReferences: Objects.isEmpty(value) ? null : value,
                      } as OriginalDataPoint
                      updateOriginalDataPoint(originalDataPointUpdate)
                    }}
                    disabled={printView || !canEditData}
                  />
                </td>
                <td className="fra-table__row-anchor-cell">
                  {displayReviewIndicator ? (
                    <div className="odp__review-indicator-row-anchor">
                      {/* <ReviewIndicator */}
                      {/*  section="odp" */}
                      {/*  title={i18n.t('nationalDataPoint.dataSources')} */}
                      {/*  target={[originalDataPoint.odpId, 'dataSourceReferences']} */}
                      {/*  countryIso={countryIso} */}
                      {/* /> */}
                    </div>
                  ) : null}
                </td>
              </tr>

              <tr>
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.methodsUsed')}</th>
                <td className="fra-table__cell-left odp__data-source-input-column">
                  <MultiSelect
                    disabled={printView || !canEditData}
                    i18n={i18n}
                    localizationPrefix="nationalDataPoint.dataSourceMethodsOptions"
                    values={originalDataPoint.dataSourceMethods}
                    options={Object.values(ODPDataSourceMethod)}
                    onChange={(values: Array<ODPDataSourceMethod>) => {
                      const originalDataPointUpdate = { ...originalDataPoint, dataSourceMethods: values }
                      updateOriginalDataPoint(originalDataPointUpdate)
                    }}
                  />
                </td>
                <td className="fra-table__row-anchor-cell">
                  {displayReviewIndicator ? (
                    <div className="odp__review-indicator-row-anchor">
                      {/* <ReviewIndicator */}
                      {/*  section="odp" */}
                      {/*  title={i18n.t('nationalDataPoint.dataSources')} */}
                      {/*  target={[originalDataPoint.odpId, 'dataSourceMethods']} */}
                      {/*  countryIso={countryIso} */}
                      {/* /> */}
                    </div>
                  ) : null}
                </td>
              </tr>

              <tr>
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.additionalComments')}</th>
                <td className="fra-table__cell-left odp__data-source-input-column">
                  <VerticallyGrowingTextField
                    value={originalDataPoint.dataSourceAdditionalComments || ''}
                    onChange={(event) => {
                      const originalDataPointUpdate = {
                        ...originalDataPoint,
                        dataSourceAdditionalComments: event.target.value,
                      }
                      updateOriginalDataPoint(originalDataPointUpdate)
                    }}
                    disabled={printView || !canEditData}
                  />
                </td>
                <td className="fra-table__row-anchor-cell">
                  {displayReviewIndicator ? (
                    <div className="odp__review-indicator-row-anchor">
                      {/* <ReviewIndicator */}
                      {/*  section="odp" */}
                      {/*  title={i18n.t('nationalDataPoint.dataSources')} */}
                      {/*  target={[originalDataPoint.odpId, 'dataSourceAdditionalComments']} */}
                      {/*  countryIso={countryIso} */}
                      {/* /> */}
                    </div>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DataSources
