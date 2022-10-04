import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { ApiEndPoint } from '@meta/api/endpoint'

import { useAppDispatch } from '@client/store'
import { LoginActions, useInvitation } from '@client/store/login'
import { useToaster } from '@client/hooks/useToaster'
import { ClientRoutes } from '@client/clientRoutes'
import { isError, LoginValidator } from '@client/pages/Login/utils/LoginValidator'
import { Urls } from '@client/utils/urls'

type Props = {
  invitationUuid?: string
}

const LoginForm: React.FC<Props> = (props: Props) => {
  const { invitationUuid } = props

  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const loginFailed = Urls.getRequestParam('loginFailed')
  const { toaster } = useToaster()

  const { invitedUser } = useInvitation()

  const [loginLocal, setLoginLocal] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (loginFailed) toaster.error(i18n.t<string>('login.notAuthorized'))
    dispatch(LoginActions.initLogin())
    if (invitationUuid) {
      dispatch(LoginActions.fetchUserByInvitation({ invitationUuid }))
    }
  }, [dispatch, i18n, invitationUuid, loginFailed, toaster])

  useEffect(() => {
    if (invitedUser?.email) setEmail(invitedUser.email)
  }, [invitedUser?.email])

  const onLogin = () => {
    const fieldErrors = LoginValidator.localValidate(email, password)
    setErrors(fieldErrors)

    if (!isError(fieldErrors)) {
      dispatch(
        LoginActions.localLogin({
          email,
          password,
          invitationUuid,
          navigate,
        })
      )
    }
  }

  if (loginLocal)
    return (
      <div className="login__form">
        <input
          onFocus={() => setErrors({ ...errors, email: null })}
          name="email"
          value={email}
          disabled={!!invitedUser}
          type="text"
          placeholder={i18n.t<string>('login.email')}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors.email && <span className="login__field-error">{i18n.t<string>(errors.email)}</span>}

        <input
          onFocus={() => setErrors({ ...errors, password: null })}
          value={password}
          type="password"
          placeholder={i18n.t<string>('login.password')}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors.password && <span className="login__field-error">{i18n.t<string>(errors.password)}</span>}

        {invitedUser && invitedUser.status !== 'active' && (
          <>
            <input
              onFocus={() => setErrors({ ...errors, password2: null })}
              value={password2}
              type="password"
              placeholder={i18n.t<string>('login.repeatPassword')}
              onChange={(event) => setPassword2(event.target.value)}
            />
            {errors.password2 && <span className="login__field-error">{i18n.t<string>(errors.password2)}</span>}
          </>
        )}

        {invitedUser && (
          <button type="button" className="btn" onClick={onLogin}>
            {i18n.t<string>('login.acceptInvitation')}
          </button>
        )}

        {!invitedUser && (
          <>
            <div>
              <button type="button" className="btn" onClick={() => setLoginLocal(false)}>
                {i18n.t<string>('login.cancel')}
              </button>

              <button type="button" className="btn" onClick={onLogin}>
                {i18n.t<string>('login.login')}
              </button>
            </div>

            <Link to={ClientRoutes.Login.ResetPassword.getLink()} type="button" className="btn-forgot-pwd">
              {i18n.t<string>('login.forgotPassword')}
            </Link>
          </>
        )}
      </div>
    )
  return (
    <div className="login__formWrapper">
      <div>
        <a
          className="btn"
          href={`${ApiEndPoint.Auth.google()}${invitationUuid ? `?invitationUuid=${invitationUuid}` : ''}`}
        >
          {i18n.t<string>('login.signInGoogle')}
        </a>

        <button className="btn" type="button" onClick={() => setLoginLocal(true)}>
          {i18n.t<string>('login.signInFRA')}
        </button>
      </div>
      <div>
        <div>{i18n.t<string>('login.accessLimited')}</div>
        <div>
          {i18n.t<string>('login.returnHome')} <a href="/">{i18n.t<string>('login.returnHomeClick')}</a>
        </div>
      </div>
    </div>
  )
}

LoginForm.defaultProps = {
  invitationUuid: null,
}

export default LoginForm