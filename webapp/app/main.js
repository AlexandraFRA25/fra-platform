import '../app-styles/style.less'
import '../ckEditor/style.less'

import React from 'react'
import ReactDOM from 'react-dom'
import Page from './routes'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createDebounce from 'redux-debounced'
import reducer from './rootReducer'
import * as loginStatusChecker from '../user/loginStatusChecker'

const store = createStore(reducer, applyMiddleware(createDebounce(), thunkMiddleware))

function renderApp () {

  ReactDOM.render(
    <Provider store={store}>
      <Page/>
    </Provider>,
    document.getElementById('main')
  )
}

renderApp()
loginStatusChecker.startPeriodicCheck(60*1000)