import './style.less'

import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'

import { fetchLastSectionUpdateTimestamp } from '@webapp/audit/actions'

import CommentableDescription from '@webapp/description/commentableDescription.js'

import { isFRA2020SectionEditDisabled } from '@webapp/utils/assessmentAccess'
import * as AppState from '@webapp/app/appState'

const sectionName = 'contactPersons'

const ContactPersonsView = props => {
  const { fetchLastSectionUpdateTimestamp, i18n, isEditDataDisabled } = props
  const countryIso = useSelector(AppState.getCountryIso)

  useEffect(() => {
    fetchLastSectionUpdateTimestamp(countryIso, sectionName)
  }, [])

  return <div className="fra-view__content">
    <CommentableDescription
      section={sectionName}
      title={i18n.t('contactPersons.introductoryText')}
      name='introductoryText'
      countryIso={countryIso}
      template={i18n.t('contactPersons.introductoryTextSupport')}
      disabled={isEditDataDisabled}
    />
  </div>
}

const mapStateToProps = (state, props) => ({
  openCommentThread: state.review.openThread,
  i18n: state.user.i18n,
  isEditDataDisabled: isFRA2020SectionEditDisabled(state, sectionName)
})

export default connect(mapStateToProps, { fetchLastSectionUpdateTimestamp })(ContactPersonsView)