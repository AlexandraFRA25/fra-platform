import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { fetchOdps } from './actions'

import { Link } from './../link'
import LoggedInPageTemplate from '../loggedInPageTemplate'

const ODPListing = ({countryIso, odps = []}) => <div className="odp-list__container">
  <h2>National data</h2>
  <table className="odp-list__list-table">
    <thead>
    <tr className='odp-list__list-row'>
      <th>Year</th>
      <th>Methods</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    { odps.map(odp => <tr className='odp-list__list-row' key={odp.odpId}>
      <td>{odp.year == 0 ? '-' : odp.year}</td>
      <td>-</td>
      <td><Link to={`/country/${countryIso}/odp/${odp.odpId}`}>Edit</Link></td>
    </tr>)}
    </tbody>
  </table>
  <Link className="btn btn-primary" to={`/country/${countryIso}/odp`}>
    <svg className="icon icon-middle icon-white">
      <use xlinkHref="img/icon.svg#icon-small-add"/>
    </svg>
    Add national data point
  </Link>
</div>

class DataFetchingComponent extends React.Component {
  componentWillMount () {
    this.fetch(this.props.match.params.countryIso)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      this.fetch(next.match.params.countryIso)
  }

  fetch (countryIso) {
    this.props.fetchOdps(countryIso)
  }

  render () {
    return <LoggedInPageTemplate>
      <ODPListing countryIso={this.props.match.params.countryIso} {...this.props} />
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => {
  return state.originalDataPoint
}

export default connect(mapStateToProps, {fetchOdps})(DataFetchingComponent)