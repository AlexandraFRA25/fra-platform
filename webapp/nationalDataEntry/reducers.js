import * as R from "ramda"

import * as types from "./actions"
import initial from "./initialState"

const actions = {
  [types.valueChangeCompleted]: (state, action) =>
    R.pipe(
      R.assocPath(['columns', action.name, 'value'], action.value),
      R.assocPath(['columns', action.name, 'status'], "saved"),
    )(state),
  [types.valueChangeStart]: (state, action) =>
    R.pipe(
      R.assocPath(['columns', action.name, 'value'], action.value),
      R.assocPath(['columns', action.name, 'status'], "saving")
    )(state)
}

export default (state=initial, action) => {
  console.log("action", action)
  const actionHandler = actions[action.type]
  if (actionHandler) return actionHandler(state, action)
  console.log("state", state)
  return state
}
