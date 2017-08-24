import React from 'react'
import { hasData } from './chartData'

const Text = ({text, width, y}) =>
  <foreignObject width={width} y={y} style={{textAlign: 'center'}}>
    <text style={{fontSize: '14px', color: '#999999'}} x="0" y="0">{text}</text>
  </foreignObject>

const NoDataPlaceholder = ({data, wrapperWidth, i18n, showNoDataText}) =>
  !hasData(data)
    ? <g className="noDataPlaceholder">
      <image href="/img/tucan.svg"
             width="62" height="87"
             x={((wrapperWidth - 62) / 2)} y="14"></image>
      {showNoDataText ?
        <Text text={i18n.t('extentOfForest.chart.noDataPlaceholderLine1')} width={wrapperWidth} y="136"/> : null}
      {showNoDataText ?
        <Text text={i18n.t('extentOfForest.chart.noDataPlaceholderLine2')} width={wrapperWidth} y="156"/> : null}
    </g>
    : null

export default NoDataPlaceholder
