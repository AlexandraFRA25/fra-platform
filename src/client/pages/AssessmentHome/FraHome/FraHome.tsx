import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'

import classNames from 'classnames'

import { Areas } from '@meta/area'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { UserManagementActions } from '@client/store/userManagement'
import { useCountryIso } from '@client/hooks'
import { AssessmentHomeRouteNames } from '@client/basePaths'

import { useSections } from './hooks/useSections'
import ButtonDownloadDashboard from './ButtonDownloadDashboard'
import CountrySelector from './CountrySelector'
import SelectedCountries from './SelectedCountries'

const FraHome: React.FC = () => {
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const user = useUser()
  const sections = useSections()

  // tabs are available when user is logged-in and selected area is country
  const displayTabs = sections.length > 1 && Areas.isISOCountry(countryIso)

  useEffect(() => {
    if (user) {
      dispatch(
        UserManagementActions.getUsers({ countryIso, assessmentName: assessment.props.name, cycleName: cycle.name })
      )
    }
  }, [countryIso, cycle, assessment, user, dispatch])

  return (
    <>
      <div className="landing__page-header space-between">
        <h1 className="landing__page-title title">
          {i18n.t<string>(`area.${countryIso}.listName`)}
          <ButtonDownloadDashboard />
        </h1>

        {Areas.isISOGlobal(countryIso) && <CountrySelector />}
      </div>

      {Areas.isISOGlobal(countryIso) && <SelectedCountries />}

      {displayTabs && (
        <div className="landing__page-menu">
          {sections.map(({ name }) => (
            <NavLink
              key={name}
              to={name}
              className={(navData) =>
                classNames('btn landing__page-menu-button', {
                  disabled: navData.isActive,
                })
              }
            >
              {i18n.t<string>(`landing.sections.${name}`)}
            </NavLink>
          ))}
        </div>
      )}
      <Routes>
        {sections.map(({ name, component }) => (
          <Route key={name} path={name} element={React.createElement(component, {})} />
        ))}
        <Route path="*" element={<Navigate to={AssessmentHomeRouteNames.overview} />} />
      </Routes>
    </>
  )
}
export default FraHome