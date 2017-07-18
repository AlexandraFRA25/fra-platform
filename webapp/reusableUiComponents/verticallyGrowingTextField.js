import React from 'react'
import './verticallyGrowingTextField.less'

// Based on http://dev.edenspiekermann.com/2016/08/26/react-textarea-auto-resize/

class VerticallyGrowingTextField extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.setFilledTextareaHeight()
  }

  setFilledTextareaHeight () {
    this.setState({
      height: this.ghost.clientHeight,
    })
  }

  expandableField () {
    const {height} = this.state

    return (
      <div>
        <textarea
          className="vgtf__textarea"
          value={this.props.value}
          style={{height}}
          onChange={this.props.onChange}
          onPaste={this.props.onPaste}
          onKeyUp={() => this.setFilledTextareaHeight()}
        />
      </div>
    )
  }

  ghostField () {
    return (
      <div
        className="vgtf__textarea--ghost"
        ref={(c) => this.ghost = c}
        aria-hidden="true"
      >
        {/*
          Use 'x' as a placeholder to keep ghost field in right height even when
          there's no input or plain newline before any text in new row
         */}
        { this.props.value ? this.props.value.replace(/\n/g, '\nx') : 'x' }
      </div>
    )
  }

  render () {
    return (
      <div className="vgtf__container">
        {this.expandableField()}
        {this.ghostField()}
      </div>
    )
  }
}

export default VerticallyGrowingTextField