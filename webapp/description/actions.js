import axios from 'axios'
import * as autosave from '../autosave/actions'
import { applicationError } from '../applicationError/actions'

export const descriptionsFetched = 'nationalDataEntry/descriptions/fetched'

export const fetchDescriptions = (countryIso, name) => dispatch => {
  axios.get(`/api/country/descriptions/${countryIso}/${name}`)
    .then(resp => dispatch({type: descriptionsFetched, data: resp.data, name}))
    .catch(err => dispatch(applicationError(err)))
}

export const descriptionsChangeStart = 'nationalDataEntry/descriptions/change/start'

export const saveDescriptions = (countryIso, name, content) => dispatch => {
  dispatch(startSaveDescriptions(name, content))
  dispatch(autosave.start)
  dispatch(changeDescriptions(countryIso, name, content))
}

const startSaveDescriptions = (name, content) => ({type: descriptionsChangeStart, name, content})

const changeDescriptions = (countryIso, name, content) => {
  const dispatched = dispatch => {
    return axios.post(`/api/country/descriptions/${countryIso}/${name}`, {content}).then(() => {
      dispatch(autosave.complete)
    }).catch((err) => {
      dispatch(applicationError(err))
    })
  }
  dispatched.meta = {
    debounce: {
      time: 800,
      key: `descriptionChangeStart_${name}`
    }
  }
  return dispatched
}