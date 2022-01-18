import React from 'react'
import MediaQuery from 'react-responsive'

import { Breakpoints } from '@client/utils'

import Icon from '@client/components/Icon'
import { useAssessment } from '@client/store/assessment'
import { useTranslation } from 'react-i18next'
import { useIsDataExportView } from '@client/hooks'

type Props = {
  lockEnabled: boolean
}

const Title: React.FC<Props> = (props) => {
  const { lockEnabled } = props
  const assessment = useAssessment()

  const { i18n } = useTranslation()
  const isDataExportView = useIsDataExportView()
  const locked = true // TODO
  const canToggleLock = false // TODO

  const deskStudy = false // TODO
  const type = assessment.props.name

  return (
    <div className="nav-assessment-header__lock">
      <div>
        {i18n.t(`assessment.${type}`)}
        {isDataExportView ? ` - ${i18n.t('common.dataExport')}` : ''}
        {deskStudy && <div className="desk-study">({i18n.t('assessment.deskStudy')})</div>}
      </div>

      {lockEnabled && (
        <MediaQuery minWidth={Breakpoints.laptop}>
          <button
            type="button"
            className="btn-s btn-secondary nav-assessment-header__btn-lock"
            disabled={!canToggleLock}
            onClick={() => console.log('todo: toggleAssessmentLock')}
          >
            <Icon name={locked ? 'lock-circle' : 'lock-circle-open'} className="icon-no-margin" />
          </button>
        </MediaQuery>
      )}
    </div>
  )
}

export default Title
