import { NavigationState } from './ui/navigation/stateType'
import { AssessmentState } from './assessment/stateType'
import { LoginState } from './login/stateType'
import { UserState } from './user/stateType'

export type RootState = {
  assessment: AssessmentState
  login: LoginState
  user: UserState
  ui: {
    navigation: NavigationState
  }
}
