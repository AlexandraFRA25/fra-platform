import { combineReducers } from 'redux'

import applicationError from './applicationError/reducer'
import nationalDataEntry from './nationalDataEntry/reducers'
import eofDescriptions from './nationalDataEntry/description/reducers'
import originalDataPoint from './originalDataPoint/reducers'
import autoSave from './autosave/reducer'
import navigation from './navigation/reducers'
import router from './router/reducers'
import user from './login/reducer'
import issue from './issue/reducer'

export default combineReducers({
  applicationError,
  nationalDataEntry,
  eofDescriptions,
  originalDataPoint,
  autoSave,
  navigation,
  router,
  user,
  issue
})
