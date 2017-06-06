import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import './style.less'
import { postComment, retrieveComments, openCommentThread, closeCommentThread } from './actions'

const mapIndexed = R.addIndex(R.map)

const Comments = ({comments}) =>
  <div>
    {
      mapIndexed((c, i) =>
          <div key={i} className="fra-issue__comment">
            <div className="fra-issue__comment-author">{c.email}</div>
            <div className="fra-issue__comment-time">just now</div>
            <div className="fra-issue__comment-text">
              {c.message}
            </div>
          </div>,
        comments)
    }
  </div>

const AddComment = ({countryIso, target, postComment, isFirst}) =>
  <div>
    <div
      className={`fra-issue__comment-edit-author${isFirst ? '' : '-empty'} `}>{isFirst ? `Jan Egeland` : ''}</div>
    <div contentEditable={true}
         id="fra-issue__comment-input"
         className="fra-issue__issue-comment-input"
         placeholder="Write comment message"></div>
    <button className="btn btn-icon btn-s"
            onClick={() =>
              postComment(countryIso, target, '1', null, document.getElementById('fra-issue__comment-input').innerHTML)}>
      <svg className="icon-24 icon-accent">
        <use xlinkHref="img/icon.svg#icon-circle-add"/>
      </svg>
    </button>
    <div className="great-clear"></div>
  </div>

const CommentStatus = ({count, visible, ...props}) =>
  <div {...props} className={`fra-issue__issue-status-${visible ? 'visible' : 'hidden'}`} >
    {
      count > 0 ? <div className="fra-issue__issue-status-count">{count}</div> : <svg className="icon-24">
        <use xlinkHref="img/icon.svg#icon-circle-add"/>
      </svg>
    }
  </div>

const CommentThread = ({countryIso, target, comments, showAdd, postComment, close}) =>
  <div className={`fra-issue__issue ${showAdd ? '' : 'fra-issue__issue-hidden'}`}>
    <i className="fra-issue__issue-close" onClick={ e => close(e) }>
      <svg className="icon-24">
        <use xlinkHref="img/icon.svg#icon-small-remove"/>
      </svg>
    </i>
    <Comments comments={comments}/>
    <AddComment countryIso={countryIso} target={target} postComment={postComment}
                isFirst={comments.length === 0}/>
  </div>

class IssueWidget extends React.Component {

  constructor (props) {
    super(props)
    this.state = {showAddComment: false}
  }

  componentWillMount () {
    this.props.retrieveComments(this.props.countryIso, this.props.target)
  }

  componentWillReceiveProps (next) {
    if (next.countryIso !== this.props.countryIso) { // changing country
      this.props.closeCommentThread(this.props.target)
      this.props.retrieveComments(next.countryIso, this.props.target)
      this.setState({showAddComment: false})
    }
    if(next.openThread !== this.props.target) { // other comment thread is opened, close this
      this.setState({showAddComment: false})
    }
  }

  render () {
    const comments = this.props[this.props.target] || []
    const count = comments ? comments.length  : 0
    const style= {'zIndex': this.state.showAddComment ? 1: 0 }
    const close = R.partial(ctx => {
      ctx.props.closeCommentThread(ctx.props.taret)
      ctx.setState({showAddComment: false})}, [this])

    const statusVisible = this.props.openThread === this.props.target || !this.props.openThread

    return <div className="fra-issue__add-issue" style={style}>{
      this.state.showAddComment ? <CommentThread
        countryIso={this.props.countryIso}
        target={this.props.target}
        comments={comments}
        showAdd={this.state.showAddComment}
        postComment={this.props.postComment}
        close={close}/> :
        <CommentStatus count={count} visible={statusVisible} onClick={() => {
          this.props.openCommentThread(this.props.target)
          this.setState({showAddComment: true})
        }}/>
    }</div>
  }
}

const mapStateToProps = state => {
  return state.issue
}

export default connect(mapStateToProps, {
  openCommentThread,
  closeCommentThread,
  postComment,
  retrieveComments
})(IssueWidget)
