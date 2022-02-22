import { createAsyncThunk } from '@reduxjs/toolkit'
import { RouteComponentProps } from 'react-router-dom'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { BasePaths } from '@client/basePaths'

export const createResetPassword = createAsyncThunk<
  { message?: string; error?: string },
  { email: string; history: RouteComponentProps['history'] }
>('login/post/createResetPassword', async ({ email, history }) => {
  const { data } = await axios.post(ApiEndPoint.Auth.ResetPassword.one(), { email })
  if (data?.message) history.push(BasePaths.Root())
  return data
})