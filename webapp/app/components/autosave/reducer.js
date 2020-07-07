import * as R from 'ramda'
import { exportReducer } from '@webapp/utils/reduxUtils'
import {
  lastSectionUpdateTimestampReceived,
  lastSectionUpdateTimestampReset,
} from '@webapp/app/components/audit/actions'

import * as AutosaveState from './autosaveState'
import { autoSaveStart, autoSaveComplete } from './actions'

const actionHandlers = {
  [autoSaveStart]: (state) => AutosaveState.assocStatus(AutosaveState.status.saving)(state),
  [autoSaveComplete]: (state) => AutosaveState.assocStatus(AutosaveState.status.complete)(state),

  [lastSectionUpdateTimestampReceived]: (state, { timeStamp }) =>
    R.pipe(
      AutosaveState.assocStatus(AutosaveState.status.lastSaveTimestampReceived),
      AutosaveState.assocLastSaveTimeStamp(timeStamp)
    )(state),

  [lastSectionUpdateTimestampReset]: (state) =>
    R.pipe(AutosaveState.assocStatus(null), AutosaveState.assocLastSaveTimeStamp(null))(state),
}

export default exportReducer(actionHandlers)