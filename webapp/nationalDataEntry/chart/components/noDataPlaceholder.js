import React from 'react'
import * as d3 from 'd3'
import * as R from 'ramda'
import {hasData} from '../chart'

const Text = ({text, width, y}) =>
  <foreignObject data-y={y} width={width} y={y} style={{textAlign: 'center'}}>
    <text style={{fontSize: '14px', color: '#999999'}} x="0" y="0">{text}</text>
  </foreignObject>

const tucanY = 20
const tucanWidth = 62
const tucanHeight = 87

class NoDataPlaceholder extends React.Component {

  getTucanX() {
    return (this.props.wrapperWidth - tucanWidth) / 2
  }

  tucan() {
    return d3.select(this.refs.tucan)
  }

  texts() {
    let textWrappers = d3.select(this.refs.container).selectAll('foreignObject')
    return textWrappers.selectAll('text')
  }

  hidePlaceholderAnimated() {
    this.tucan()
      .transition()
        .duration(400)
        .delay(100)
        .ease(d3.easeBackInOut)
        .attr('y', -tucanHeight)
        .style('opacity', '0')
      .transition()
        .style('visibility', 'hidden')
    this.texts()
      .transition()
        .duration(400)
        .delay(200)
        .ease(d3.easeExpOut)
        .style('opacity', '0')
      .transition()
        .style('visibility', 'hidden')
  }

  hidePlaceholder() {
    this.tucan()
      .transition()
        .duration(100)
        .style('visibility', 'hidden')
        .style('opacity', '0')
    this.texts()
      .transition()
        .duration(100)
        .style('visibility', 'hidden')
        .style('opacity', '0')
  }

  showPlaceholder() {
    this.tucan()
      .attr('y', tucanY)
      .transition()
        .duration(100)
        .style('visibility', 'visible')
        .style('opacity', '1')
    this.texts()
      .transition()
        .duration(100)
        .style('visibility', 'visible')
        .style('opacity', '1')
  }

  componentDidMount() {
    hasData(this.props.data) ? this.hidePlaceholder() : this.showPlaceholder()
  }

  componentWillReceiveProps(nextProps) {
    const propsHasData = hasData(this.props.data)
    const nextPropsHasData = nextProps ? hasData(nextProps.data) : false

    if (propsHasData && !nextPropsHasData) {
      this.showPlaceholder()
    } else if (!propsHasData && nextPropsHasData) {
      this.hidePlaceholderAnimated()
    }
  }

  componentWillUnmount() {
    this.hidePlaceholder()
  }

  render() {
    const {wrapperWidth, i18n} = this.props

    return <g className="chart__no-data-placeholder" ref="container">
      <image ref="tucan" href="/img/tucan.svg" width={tucanWidth} height={tucanHeight} x={this.getTucanX()} y={tucanY} />
      <Text text={i18n.t('extentOfForest.chart.placeholderLine1')} width={wrapperWidth} y="144"/>
      <Text text={i18n.t('extentOfForest.chart.placeholderLine2')} width={wrapperWidth} y="164"/>
    </g>
  }
}

export default NoDataPlaceholder