import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import * as Cookies from 'js-cookie'

import { follow } from './actions'
import Notfound from '../notfound'

class Router extends React.Component {

  follow() {
    if (!(Cookies.get('loggedIn') === 'true') || !location.hash === '') window.location.hash = ''
    this.props.follow(location.hash)
  }

  componentWillMount () {
    window.onhashchange = () => {
      this.follow()
    }
    window.onload = () => {
      this.follow()
    }
  }

  render () {
    const route = R.find(route => route.route.match(this.props.path))(this.props.routes)
    return (route
            ? React.createElement(route.component, {match: {params: route.route.match(this.props.path)}})
            : <Notfound/>)
  }
}

const mapStateToProps = state => {
  const path = state.router.path
    ? state.router.path
    : (window.location.hash || window.location.pathname)
  return {path}
}

export default connect(mapStateToProps, {follow})(Router)
