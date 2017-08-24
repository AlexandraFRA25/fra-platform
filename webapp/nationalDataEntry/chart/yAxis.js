import React, { Component } from 'react'
import * as d3 from 'd3'
import * as R from 'ramda'

class YAxis extends Component {
  componentDidMount () {
    this.renderAxis()
  }

  componentDidUpdate () {
    this.renderAxis()
  }

  hasData () {
    const hasData = R.pipe(
      R.map(d => d.length),
      R.values,
      R.any(v => v > 0)
    )(this.props.data)
    return hasData
  }

  renderAxis () {
    const formatLabel = v => d3.format(',')(v).replace(/,/g, ' ')

    var axis = d3.axisLeft(this.props.yScale)
      .ticks(5).tickSizeInner(-this.props.wrapperWidth).tickSizeOuter(0).tickFormat(formatLabel).tickPadding(8)

    const node = this.refs.axis

    d3.select(node).call(axis)
      .selectAll('path').style('stroke', '#cccccc')

    d3.select(node).call(axis)
      .selectAll('text').style('fill', '#666666').style('font-size', '11px')

    if (!this.hasData())
      d3.select(node).selectAll('text').remove()

    d3.select(node).selectAll('line').style('stroke', (val, i) => i == 0 ? '#cccccc' : 'rgba(0,0,0,.08)')
  }

  render () {
    return <g className="axis" ref="axis" transform={`translate(${this.hasData() ? this.props.left : '0'}, 0)`}></g>
  }
}

export default YAxis
