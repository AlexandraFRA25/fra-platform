import './login.less'

import React from 'react'
import { Route } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'

import LoginForm from './LoginForm'
import ResetPasswordForm from './ResetPasswordForm'

const Login = () => (
  <div className="login">
    <Route exact path={BasePaths.resetPassword}>
      <ResetPasswordForm />
    </Route>

    <Route exact path={BasePaths.login}>
      <LoginForm />
    </Route>

    <img alt="" src="/img/tucan.svg" className="login__tucan" />
  </div>
)

export default Login