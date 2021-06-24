import axios from 'axios'

import { UserState } from '@webapp/store/user'
import { ApiEndPoint } from '@common/api/endpoint'

export const lastSectionUpdateTimestampReceived = 'audit/lastSectionUpdate/timestamp/received'
export const lastSectionUpdateTimestampReset = 'audit/lastSectionUpdate/timestamp/reset'
export const lastAuditFeedReceived = 'audit/lastAuditFeedReceived'

export const fetchLastSectionUpdateTimestamp =
  (countryIso: any, section: any) => async (dispatch: any, getState: any) => {
    const userInfo = UserState.getUserInfo(getState())
    if (userInfo) {
      const {
        data: { timeStamp = null },
      } = await axios.get(`${ApiEndPoint.Audit.getLatestLogTimestamp(countryIso)}?section=${section}`)
      dispatch({ type: lastSectionUpdateTimestampReceived, timeStamp })
    }
  }

export const resetSectionUpdateTimestamp = () => ({ type: lastSectionUpdateTimestampReset })

export const fetchAuditFeed = (countryIso: any) => async (dispatch: any) => {
  const {
    data: { feed },
  } = await axios.get(ApiEndPoint.Audit.getFeed(countryIso))
  dispatch({ type: lastAuditFeedReceived, feed })
}