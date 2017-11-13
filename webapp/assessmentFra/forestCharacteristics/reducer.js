import * as tableWithOdpActions from '../../tableWithOdp/actions'
import { updateValueReducer, updateValuesReducer } from '../../tableWithOdp/reducerFunctions'
import { applyReducerFunction } from '../../utils/reduxUtils'

const actionHandlers = {
  [tableWithOdpActions.valueChangeStart('forestCharacteristics')]: (state, action) => updateValueReducer(state, action),
  [tableWithOdpActions.valuesFetched('forestCharacteristics')]: (state, action) => ({...state, ...action.data, generatingFraValues: false}),
  [tableWithOdpActions.generateFraValuesStart('forestCharacteristics')]: (state, action) => ({...state, generatingFraValues: true}),
  [tableWithOdpActions.pasteChangeStart('forestCharacteristics')]: (state, action) => updateValuesReducer(state, action),
  [tableWithOdpActions.odpCleanAction('forestCharacteristics')]: (state, action) => ({...state, odpDirty: false}),
  [tableWithOdpActions.odpDirtyAction]: (state, action) => ({...state, odpDirty: true})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
