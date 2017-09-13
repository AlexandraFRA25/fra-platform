import './style.less'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import MirrorTable from './mirrorTable'

import { fetch, updateValues } from './actions'

const GrowingStock = ({i18n, countryIso, fra, values, updateValues}) => {
  const rows = [
    {
      field: 'naturallyRegeneratingForest',
      areaFields: ['naturalForestArea'],
      localizedName: i18n.t('fraForestCharacteristicsClass.naturallyRegeneratingForest')
    }, {
      field: 'plantedForest',
      areaFields: ['plantationForestArea', 'otherPlantedForestArea'],
      calculated: true,
      localizedName: i18n.t('fraForestCharacteristicsClass.plantedForest')
    }, {
      field: 'plantationForest',
      areaFields: ['plantationForestArea'],
      localizedName: i18n.t('fraForestCharacteristicsClass.plantationForest')
    }, {
      field: 'otherPlantedForest',
      areaFields: ['otherPlantedForestArea'],
      localizedName: i18n.t('fraForestCharacteristicsClass.otherPlantedForest')
    }, {
      field: 'totalForest',
      areaFields: ['naturalForestArea', 'plantationForestArea', 'otherPlantedForestArea'],
      calculated: true,
      localizedName: i18n.t('fraForestCharacteristicsClass.totalForest')
    }, {
      field: 'otherWoodedLand',
      localizedName: i18n.t('fraClass.otherWoodedLand')
    },
  ]

  return <div className='nde__data-input-component'>
    <div className="nde__data-page-header">
      <h2 className="headline">{i18n.t('growingStock.growingStock')}</h2>
    </div>
    <MirrorTable
      section="growingStock"
      countryIso={countryIso}
      fra={fra}
      header={i18n.t('growingStock.fra2020Categories')}
      avgTableHeader={i18n.t('growingStock.avgTableHeader')}
      totalTableHeader={i18n.t('growingStock.totalTableHeader')}
      rows={rows}
      values={values}
      updateValues={updateValues}
    />
  </div>

}

class GrowingStockView extends Component {

  componentWillMount () {
    this.fetch(this.props.match.params.countryIso)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      this.fetch(next.match.params.countryIso)
  }

  fetch (countryIso) {
    this.props.fetch(countryIso)
  }

  render () {
    return R.isEmpty(this.props.growingStock)
      ? null
      : <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
        <GrowingStock
          fra={this.props.growingStock.fra}
          countryIso={this.props.match.params.countryIso}
          values={this.props.growingStock.values}
          updateValues={this.props.updateValues}
          {...this.props}/>
      </LoggedInPageTemplate>
  }

}

const mapStateToProps = state => ({i18n: state.user.i18n, growingStock: state.growingStock})

export default connect(mapStateToProps, {fetch, updateValues})(GrowingStockView)
