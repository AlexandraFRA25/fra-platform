import { getRequestParam } from '@webapp/utils/urlUtils'
import axios from 'axios'
import { createI18nPromise } from '@common/i18n/i18nFactory'
import { applicationError } from '@webapp/components/error/actions'

import * as UserState from '@webapp/store/user/state'

import { ApiEndPoint } from '@common/api/endpoint'
import { sortCountries, sortRegionGroups, sortRegions } from '../utils'
import ActionTypes from './actionTypes'

export const updateCountries = (countries: any) => ({
  type: ActionTypes.updateCountries,
  countries,
})
export const updateRegions = (regions: any) => ({
  type: ActionTypes.updateRegions,
  regions,
})
export const updateRegionGroups = (regionGroups: any) => ({
  type: ActionTypes.updateRegionGroups,
  regionGroups,
})

export const initApp = () => async (dispatch: any) => {
  const lang = getRequestParam('lang')
  try {
    const getCountries = axios.get(ApiEndPoint.Country.GetAll.generalCountries())
    const getRegions = axios.get(ApiEndPoint.Country.getRegions())
    const getRegionGroups = axios.get(ApiEndPoint.Country.getRegionGroups())
    const getUserInfo = axios.get(ApiEndPoint.Auth.loggedInUser())

    const [
      { data: countries },
      { data: regions },
      { data: regionGroups },
      {
        data: { userInfo = null },
      },
    ] = await axios.all([getCountries, getRegions, getRegionGroups, getUserInfo])

    const i18n: any = await createI18nPromise(lang || userInfo ? userInfo.lang : 'en')
    if (i18n.language === 'ar') document.body.classList.add('rtl')

    dispatch({
      type: ActionTypes.appInitDone,
      userInfo,
      i18n,
      countries: sortCountries(countries, i18n),
      regions: sortRegions(regions, i18n),
      regionGroups: sortRegionGroups(regionGroups),
    })
  } catch (err) {
    // 401 (Unauthorized) | Display error if any other status
    if (err.response && err.response.status !== 401) {
      dispatch(applicationError(err))
    }
    dispatch({ type: ActionTypes.appInitDone, i18n: await createI18nPromise(lang || 'en') })
  }
}

export const switchLanguage = (lang: any) => async (dispatch: any, getState: any) => {
  try {
    const userInfo = UserState.getUserInfo(getState())
    if (userInfo) {
      await axios.post(`/api/user/lang?lang=${lang}`)
    }
    const i18n = await createI18nPromise(lang)

    if (lang === 'ar') document.body.classList.add('rtl')
    if (lang !== 'ar') document.body.classList.remove('rtl')

    dispatch({ type: ActionTypes.appI18nUpdate, i18n })
  } catch (err) {
    dispatch(applicationError(err))
  }
}