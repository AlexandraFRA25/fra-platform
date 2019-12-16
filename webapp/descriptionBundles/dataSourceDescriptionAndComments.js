import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as R from 'ramda'
import ReviewIndicator from '../review/reviewIndicator'
import Description from '../description/description'

const dataSourcesEditorTemplate = (i18n) =>
  `<strong>${i18n.t('description.dataSources')}</strong>
  <p></p>
  <strong>${i18n.t('description.originalData')}</strong>
  <p></p>
  <strong>${i18n.t('description.nationalClassificationAndDefinitions')}</strong>
  <p></p>`

const CommentableReviewDescriptions = props => {
  const { section, openCommentThreadTarget, i18n,  } = props
  const { countryIso } = useParams()
  const dataSources = 'dataSources'
  const dataSourcesTarget = [dataSources] // ?
  const generalComments = 'generalComments'
  const generalCommentsTarget = [generalComments]

  return <div className="fra-description__container">
    <div className="fra-description">
      <div className={
        R.equals(openCommentThreadTarget, dataSourcesTarget)
          ? 'fra-description__wrapper fra-row-comments__open'
          : 'fra-description__wrapper'
      }>
        <Description
          title={i18n.t('description.dataSourcesTitle')}
          section={section}
          name={dataSources}
          template={dataSourcesEditorTemplate(i18n)}
          countryIso={countryIso} />
      </div>
      <div className="fra-description__review-indicator-wrapper">
        <ReviewIndicator
          section={section}
          title={i18n.t('description.dataSourcesTitle')}
          target={dataSourcesTarget}
          countryIso={countryIso} />
      </div>
    </div>
    <div className="fra-description">
      <div className={
        R.equals(openCommentThreadTarget, generalCommentsTarget)
          ? 'fra-description__wrapper fra-row-comments__open'
          : 'fra-description__wrapper'
      }>
        <Description
          title={i18n.t('description.generalCommentsTitle')}
          section={section}
          name={generalComments}
          countryIso={countryIso} />
      </div>
      <div className="fra-description__review-indicator-wrapper">
        <ReviewIndicator
          section={section}
          title={i18n.t('description.generalCommentsTitle')}
          target={generalCommentsTarget}
          countryIso={countryIso} />
      </div>
    </div>
  </div>
}
}

CommentableReviewDescriptions.propTypes = {
  name: PropTypes.any.isRequired,
  section: PropTypes.any.isRequired,
  countryIso: PropTypes.string.isRequired,
}
  
const mapStateToProps = (state, props) => {
  return {
    ...props,
    openCommentThreadTarget: state.review.openThread ? state.review.openThread.target : null
  }
}

export const DataSourceDescriptionAndComments = connect(mapStateToProps, {})(CommentableReviewDescriptions)
