import axios from 'axios'

export const localLoginResponseLoaded = 'localLogin/response/loaded'
export const localLoginResetPasswordResponseLoaded = 'localLogin/resetPassword/loaded'

export const localLoginReset = () => dispatch =>
  dispatch({type: localLoginResponseLoaded, message: null})

export const localLoginSubmit = (user, invitationUUID) => dispatch => {

  axios.post('/auth/local/login', {email: 'hackPassport', invitationUUID, ...user})
    .then(resp => {
      const data = resp.data
      if (data.redirectUrl) {
        window.location = data.redirectUrl
      } else if (data.message) {
        dispatch({type: localLoginResponseLoaded, message: data.message})
      }
    }).catch(error => dispatch({type: localLoginResponseLoaded, message: error}))

}

export const resetPasswordFormReset = () => dispatch =>
  dispatch({type: localLoginResetPasswordResponseLoaded, message: null, error: null})

export const resetPassword = email => dispatch => {

  axios.post('/auth/local/createResetPassword', {email})
    .then(resp => {
      const data = resp.data

      dispatch({type: localLoginResetPasswordResponseLoaded, ...data})
    })
    .catch(error => dispatch({type: localLoginResetPasswordResponseLoaded, message: error}))

}
