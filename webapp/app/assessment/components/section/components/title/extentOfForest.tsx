import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAdministrator } from '@common/countryRole'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import NationalDataPointsPrintView from '@webapp/app/assessment/fra/sections/originalDataPoint/nationalDataPointsPrintView'
import { useI18n, usePrintView, useUserInfo } from '@webapp/components/hooks'
import { toggleOdps } from '@webapp/app/assessment/fra/sections/extentOfForest/actions'

type Props = {
  sectionName: string
}
const ExtentOfForest = (props: Props) => {
  const { sectionName } = props
  const dispatch = useDispatch()
  const userInfo = useUserInfo()
  const i18n = useI18n()
  const [printView, printOnlyTablesView] = usePrintView()
  const hasOdps = useSelector(ExtentOfForestState.hasOriginalDataPoints)
  const showOdps = useSelector(ExtentOfForestState.showOriginalDataPoints)
  return (
    <>
      <h2 className="headline no-print">
        {(i18n as any).t(`${sectionName}.${sectionName}`)}
        {isAdministrator(userInfo) && hasOdps && (
          <button
            type="button"
            className="btn-s btn-secondary"
            style={{ marginLeft: '12px' }}
            onClick={() => dispatch(toggleOdps(!showOdps))}
          >
            {(i18n as any).t(`extentOfForest.${showOdps ? 'hideNDPs' : 'showNDPs'}`)}
          </button>
        )}
      </h2>

      {hasOdps && printView && !printOnlyTablesView && (
        <NationalDataPointsPrintView i18n={i18n} section={sectionName} />
      )}
    </>
  )
}
export default ExtentOfForest