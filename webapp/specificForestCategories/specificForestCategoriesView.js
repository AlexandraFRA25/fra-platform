import '../app-styles/traditionalView.less'
import React from 'react'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import Description from '../description/description'

const SpecificForestCategoriesView = props =>
  <LoggedInPageTemplate>
    <div className="tw__container">
      <h2 className="headline tw__page-header">Specific forest categories</h2>
      <TraditionalTable tableSpec={tableSpec} countryIso={props.match.params.countryIso}/>
      <Description title="Description"
                   name="specificForestCategories"
                   countryIso={props.match.params.countryIso}/>
    </div>
  </LoggedInPageTemplate>

export default SpecificForestCategoriesView
