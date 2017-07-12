import R from 'ramda'
import * as types from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'
import { emptyDataPoint } from './originalDataPoint'

const actionHandlers = {
  [types.odpSaveDraftStart]: (state, action) => R.assoc('active', action.active, state),
  [types.odpSaveDraftCompleted ]: (state, action) => R.assocPath(['active', 'odpId'], Number(action.odpId), state),
  [types.odpFetchCompleted]: (state, action) => R.assoc('active', action.active)(state),
  [types.odpClearActiveAction ]: (state, action) => R.assoc('active', emptyDataPoint(), state),
  [types.odpListFetchCompleted]: (state, action) => R.assoc('odps', action.data)(state),
  [types.odpValidationCompleted]: (state, action) =>
    R.assocPath(['active', 'validationStatus'], action.data)(state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
