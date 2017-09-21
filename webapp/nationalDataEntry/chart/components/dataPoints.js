import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'

import { formatNumber, defaultTransitionDuration } from '../chart'

class DataPoint extends Component {

  update (props) {
    const {xScale, yScale, data, odpColor} = props

    if (data) {
      const circle = d3.select(ReactDOM.findDOMNode(this.refs.circles))
        .selectAll('circle')
        .data(data)

      //update
      circle
        .transition()
        .duration(defaultTransitionDuration)
        .ease(d3.easeCircleOut)
        .attr('cx', d => xScale(d.year))
        .attr('cy', d => yScale(d.value))
        .attr('r', d => d.type === 'odp' ? 4.5 : 6.5)
        .style('fill', d => d.type === 'fra' ? '#ffffff' : odpColor)
        .style('stroke', d => d.type === 'fra' ? '#333333' : '#ffffff')
        .style('stroke-width', '1.5')
        .style('opacity', '1')

      //exit
      circle.exit()
        .transition()
        .duration(defaultTransitionDuration)
        .ease(d3.easeCircleOut)
        .attr('cy', d => yScale(0))
        .style('opacity', '0')
        .remove()

      //enter
      circle.enter().append('circle')
        .on('mouseover', this.toolTip.show)
        .on('mouseout', this.toolTip.hide)
        .attr('r', 0)
        .attr('cx', d => xScale(1990))
        .attr('cy', d => yScale(0))
        .style('fill', '#ffffff')
        .attr('cx', d => xScale(d.year))
        .transition()
        .duration(defaultTransitionDuration)
        .ease(d3.easeCubicOut)
        .attr('cx', d => xScale(d.year))
        .attr('cy', d => yScale(d.value))
        .attr('r', d => d.type === 'odp' ? 4.5 : 6.5)
        .style('fill', d => d.type === 'fra' ? '#ffffff' : odpColor)
        .style('stroke', d => d.type === 'fra' ? '#333333' : '#ffffff')
        .style('stroke-width', '1.5')
        .style('opacity', '1')

    }
  }

  htmlTooltip (d) {
    return `
        <div class="chart__data-points-tooltip-year">${d.year}</div>
        <div class="chart__data-points-tooltip-value">
            <div class="chart__data-points-tooltip-value-marker" style="background-color: ${d.type === 'fra' ? '#ffffff' : this.props.odpColor}"></div>
            <div>${formatNumber(d.value)} <span class="unit"> (1000 ha)</span></div>
        </div>
    `
  }

  componentDidMount () {
    this.toolTip = d3Tip()
      .attr('class', 'chart__data-points-tooltip')
      .offset([-10, 0])
      .html(this.htmlTooltip.bind(this))

    d3.select(this.refs.circles)
      .call(this.toolTip)

    this.update(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.update(nextProps)
  }

  render () {
    return <g ref="circles" className="chart__data-points"></g>
  }

}

export default DataPoint
