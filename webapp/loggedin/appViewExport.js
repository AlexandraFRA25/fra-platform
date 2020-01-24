import component from './appView'

import extentOfForest from '@webapp/loggedin/assessmentFra/extentOfForest/reducers'
import forestCharacteristics from '@webapp/loggedin/assessmentFra/forestCharacteristics/reducer'
import growingStock from '@webapp/loggedin/assessmentFra/growingStock/reducer'
import originalDataPoint from '../originalDataPoint/reducers'
import autoSave from '../autosave/reducer'
import navigation from './navigation/reducers'
import traditionalTable from '@webapp/traditionalTable/reducer'
import descriptions from '@webapp/description/reducers'
import review from './review/reducer'
import userManagement from '../userManagement/reducer'
import country from '../country/reducer'
import sustainableDevelopment from '@webapp/loggedin/assessmentFra/sustainableDevelopment/reducer'
import landing from '../landing/reducer'
import panEuropeanIndicators from '../panEuropeanIndicators/reducer'
import admin from './admin/reducer'
import userChat from './userChat/reducer'
import countryMessageBoard from './countryMessageBoard/reducer'

// TODO: Add for each file '<module>/state.js and add state key as ex.:
// { name: HomeState.stateKey, fn: homeReducer },

const reducers = [
  { name: 'extentOfForest', fn: extentOfForest },
  { name: 'forestCharacteristics', fn: forestCharacteristics },
  { name: 'growingStock', fn: growingStock },
  { name: 'originalDataPoint', fn: originalDataPoint },
  { name: 'autoSave', fn: autoSave },
  { name: 'navigation', fn: navigation },
  { name: 'traditionalTable', fn: traditionalTable },
  { name: 'descriptions', fn: descriptions },
  { name: 'review', fn: review },
  { name: 'userManagement', fn: userManagement },
  { name: 'country', fn: country },
  { name: 'sustainableDevelopment', fn: sustainableDevelopment },
  { name: 'landing', fn: landing },
  { name: 'panEuropeanIndicators', fn: panEuropeanIndicators },
  { name: 'userChat', fn: userChat },
  { name: 'countryMessageBoard', fn: countryMessageBoard },
  { name: 'admin', fn: admin },
]

export { component, reducers }