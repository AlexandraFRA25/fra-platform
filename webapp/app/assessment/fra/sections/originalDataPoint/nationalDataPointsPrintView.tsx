import React from 'react'
import { useSelector } from 'react-redux'
import * as R from 'ramda'
import FRA from '@common/assessment/fra'
import useI18n from '@webapp/components/hooks/useI18n'
import DataSources from './originalDataPointView/components/dataSources'
import NationalClasses from './originalDataPointView/components/nationalClasses'
import ExtentOfForest from './originalDataPointView/components/originalData/extentOfForest'
import ForestCharacteristics from './originalDataPointView/components/originalData/forestCharacteristics'
import * as OriginalDataPointState from './originalDataPointState'

type Props = {
  section: string
  i18n: any
}

const NationalDataPointsPrintView = (props: Props) => {
  const { section } = props
  const i18n = useI18n()
  const data = useSelector((state) =>
    OriginalDataPointState.getOdps(state)
      .filter((ndp: any) => !(R.isNil(ndp.year) || R.isEmpty(ndp.year)))
      .sort((a: any, b: any) => Number(a.year) - Number(b.year))
  )
  if (data.length === 0) return null
  return (
    <div>
      <h2 className="headline">{(i18n as any).t('nationalDataPoint.nationalData')}</h2>

      <div className="odp__section-print-mode">
        <h3 className="subhead">{(i18n as any).t('nationalDataPoint.dataSources')}</h3>
        {data.map((odp: any) => (
          <DataSources key={odp.odpId} canEditData={false} odp={odp} />
        ))}
      </div>

      <div className="odp__section-print-mode">
        <h3 className="subhead">{(i18n as any).t('nationalDataPoint.nationalClasses')}</h3>
        {data.map((odp: any) => (
          <NationalClasses key={odp.odpId} canEditData={false} odp={odp} />
        ))}
      </div>

      <div className="odp__section-print-mode">
        <h3 className="subhead">{(i18n as any).t('nationalDataPoint.reclassificationLabel')}</h3>
        {data.map((odp: any) => {
          const component = section === FRA.sections['1'].children.a.name ? ExtentOfForest : ForestCharacteristics
          return React.createElement(component, { key: odp.odpId, ...props, odp, canEditData: false })
        })}
      </div>

      <div className="page-break" />
    </div>
  )
}
export default NationalDataPointsPrintView