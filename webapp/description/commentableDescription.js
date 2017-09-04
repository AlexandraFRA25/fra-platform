import React from 'react'
import R from 'ramda'
import assert from 'assert'
import { connect } from 'react-redux'

import './style.less'
import ReviewIndicator from '../review/reviewIndicator'
import Description from '../description/description'

const assertProps = props =>
  assert(
    props.name &&
    props.countryIso &&
    props.section,
    'Some property is missing for CommentableDescriptions'
  )
const assertDescriptionProps = props =>
  assert(
    props.descriptionTitle &&
    props.descriptionName &&
    props.commentTarget &&
    props.countryIso &&
    props.section,
    'Some property is missing for CommentableDescription'
  )

class CommentableReviewDescription extends React.Component {
  render() {
    assertDescriptionProps(this.props)
    return <div className="commentable-description">
      <div className={
        R.equals(this.props.openCommentThreadTarget, this.props.commentTarget)
          ? 'commentable-description__description-wrapper fra-row-comments__open'
          : 'commentable-description__description-wrapper'
      }>
        <Description title={this.props.descriptionTitle}
                     name={this.props.descriptionName}
                     countryIso={this.props.countryIso}/>
      </div>
      <div className="commentable-description__review-indicator-wrapper">
        <ReviewIndicator section={this.props.section}
                         name={this.props.descriptionTitle}
                         target={this.props.commentTarget}
                         countryIso={this.props.countryIso}/>
      </div>
    </div>
  }
}

class CommentableReviewDescriptions extends React.Component {

  render() {
    const sourcesTitle = this.props.i18n.t('description.dataSources')
    const originalDatatitle = this.props.i18n.t('description.originalData')
    const nationalClassificationTitle = this.props.i18n.t('description.nationalClassificationAndDefinitions')
    assertProps(this.props)
    return <div>
      <CommentableReviewDescription
        descriptionName={`${this.props.name}_datasources`}
        commentTarget={['dataSources']}
        descriptionTitle={sourcesTitle}
        {...this.props}
      />
      <hr/>
      <CommentableReviewDescription
        descriptionName={`${this.props.name}_originaldata`}
        commentTarget={['originalData']}
        descriptionTitle={originalDatatitle}
        {...this.props}
      />
      <hr/>
      <CommentableReviewDescription
        descriptionName={`${this.props.name}_nationalClassification`}
        commentTarget={['nationalClassification']}
        descriptionTitle={nationalClassificationTitle}
        {...this.props}
      />
    </div>
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    openCommentThreadTarget: state.review.openThread ? state.review.openThread.target : null
  }
}

export default connect(mapStateToProps, {})(CommentableReviewDescriptions)
