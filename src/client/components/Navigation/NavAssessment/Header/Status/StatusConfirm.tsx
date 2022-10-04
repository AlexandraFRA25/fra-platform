import './StatusConfirm.scss'
import React, { useState } from 'react'

import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from '@client/components/Modal'

import { useTranslation } from 'react-i18next'
import { useUser } from '@client/store/user'
import { Users } from '@meta/user'
import { AssessmentActions, useAssessmentCountry } from '@client/store/assessment'
import { useParams } from 'react-router-dom'
import { AssessmentName } from '@meta/assessment'
import { useCountryIso } from '@client/hooks'
import { useAppDispatch } from '@client/store'
import { StatusTransition } from './types'

type Props = {
  onClose: () => void
  status: StatusTransition
}

const StatusConfirm: React.FC<Props> = (props) => {
  const { status, onClose } = props

  const dispatch = useAppDispatch()
  const i18n = useTranslation()
  const countryIso = useCountryIso()
  const user = useUser()
  const country = useAssessmentCountry()

  const [notifyUsers, setNotifyUsers] = useState<boolean>(true)

  const [textareaValue, setTextareaValue] = useState<string>('')
  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()

  return (
    <Modal isOpen>
      <ModalHeader>
        <div className="modal-header-center">{i18n.t(`assessment.status.${status.status}.${status.direction}`)}</div>
        <ModalClose onClose={onClose} />
      </ModalHeader>

      <ModalBody>
        <div style={{ height: '160px' }}>
          <textarea
            className="nav-assessment-status-confirm__message"
            placeholder={i18n.t('navigation.changeStatusTextPlaceholder')}
            value={textareaValue}
            onChange={({ target: { value } }) => setTextareaValue(value)}
          />
        </div>

        {Users.isAdministrator(user) && (
          <div
            className="nav-assessment-status-confirm__notify-users"
            onClick={() => setNotifyUsers(!notifyUsers)}
            onKeyDown={() => setNotifyUsers(!notifyUsers)}
            role="button"
            tabIndex={0}
          >
            <div className={`fra-checkbox${notifyUsers ? '' : ' checked'}`} />
            {i18n.t('navigation.doNotNotifyUsers')}
          </div>
        )}
      </ModalBody>

      <ModalFooter>
        <button className="btn btn-secondary modal-footer__item" onClick={onClose} type="button">
          {i18n.t('navigation.cancel')}
        </button>
        <button
          className="btn btn-primary modal-footer__item"
          onClick={() => {
            dispatch(
              AssessmentActions.updateCountry({
                notifyUsers,
                country: {
                  ...country,
                  props: {
                    ...country.props,
                    status: status.status,
                  },
                },
                countryIso,
                cycleName,
                assessmentName,
                message: textareaValue,
              })
            )
            onClose()
          }}
          type="button"
        >
          {i18n.t('navigation.submit')}
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default StatusConfirm