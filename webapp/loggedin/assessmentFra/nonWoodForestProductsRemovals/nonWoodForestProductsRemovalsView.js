import './style.less'

import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import TraditionalTable from '@webapp/traditionalTable/traditionalTable'
import mainTableSpec, { sectionName } from './mainTableSpec'
import DefinitionLink from '@webapp/components/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '@webapp/audit/actions'
import NationalDataDescriptions from '@webapp/descriptionBundles/nationalDataDescriptions'
import GeneralComments from '@webapp/descriptionBundles/generalComments'
import { isFRA2020SectionEditDisabled } from '@webapp/utils/assessmentAccess'
import { fetchTableData } from '@webapp/traditionalTable/actions'
import * as table from '@webapp/traditionalTable/table'
import { isPrintingOnlyTables } from '@webapp/loggedin/printAssessment/printAssessment'
import FraUtils from '@common/fraUtils'
import * as AppState from '@webapp/app/appState'

const currencyNameTableSpec = i18n => ({
  name: 'nonWoodForestProductsRemovalsCurrency',
  header: <thead/>,
  disableReviewComments: true,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <td className="fra-secondary-table__heading-cell">
          {i18n.t('nonWoodForestProductsRemovals.currency')}
        </td>
      },
      { type: 'textInput' }
    ]
  ],
  valueSlice: {
    columnStart: 1
  }
})

const NonWoodForestProductsRemovalsView = props => {
  const {
    i18n,
    disabled,
    tableSpecInstance,
    tableData,
    fetchTableData,
    fetchLastSectionUpdateTimestamp,
  } = props
  const countryIso = useSelector(AppState.getCountryIso)

  const render = isPrintingOnlyTables() ? FraUtils.hasData(tableData) : true

  useEffect(() => {
    fetchTableData(countryIso, tableSpecInstance)
    fetchLastSectionUpdateTimestamp(countryIso, tableSpecInstance.name)
  }, [])

  if (!render) return null
  return <>

    <h2 className="title only-print">
      {`${isPrintingOnlyTables() ? '' : '7c '}${i18n.t('nonWoodForestProductsRemovals.nonWoodForestProductsRemovals')}`}
    </h2>

    <div className="fra-view__content">
      <NationalDataDescriptions section={tableSpecInstance.name} countryIso={countryIso}
                                disabled={disabled}/>
      <h2 className="headline no-print">
        {i18n.t('nonWoodForestProductsRemovals.nonWoodForestProductsRemovals')}
      </h2>
      <div className="fra-view__section-toolbar">
        <DefinitionLink className="margin-right-big" document="tad" anchor="7c"
                        title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
        <DefinitionLink className="align-left" document="faq" anchor="7c" title={i18n.t('definition.faqLabel')}
                        lang={i18n.language}/>
      </div>
      <TraditionalTable tableSpec={tableSpecInstance} countryIso={countryIso}
                        disabled={disabled}/>
      <div className="page-break"/>
      <div className="fra-secondary-table__wrapper">
        <TraditionalTable tableSpec={currencyNameTableSpec(i18n)} countryIso={countryIso}
                          disabled={disabled}/>
      </div>
      <GeneralComments
        section={tableSpecInstance.name}
        countryIso={countryIso}
        disabled={disabled}
      />
    </div>
  </>
}

const mapStateToProps = state => {
  const i18n = state.user.i18n
  const tableSpecInstance = mainTableSpec(i18n)

  return {
    i18n,
    disabled: isFRA2020SectionEditDisabled(state, sectionName),
    tableSpecInstance,
    tableData: R.path(['traditionalTable', tableSpecInstance.name, 'tableData'], state) || table.createTableData(tableSpecInstance),
  }
}

export default connect(mapStateToProps, {
  fetchLastSectionUpdateTimestamp,
  fetchTableData
})(NonWoodForestProductsRemovalsView)