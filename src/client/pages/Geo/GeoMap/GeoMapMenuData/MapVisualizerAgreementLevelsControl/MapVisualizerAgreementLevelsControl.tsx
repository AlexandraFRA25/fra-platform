import './MapVisualizerAgreementLevelsControl.scss'
import React from 'react'
import { batch } from 'react-redux'

import classNames from 'classnames'

import { useAppDispatch } from '@client/store'
import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'

import GeoMapMenuListElement from '../../GeoMapMenuListElement'
import { layers } from '../MapVisualizerPanel'
import LayerOptionsPanel from '../MapVisualizerPanel/LayerOptionsPanel'

const AgreementLevelsControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const forestOptions = useForestSourceOptions()
  const agreementLayerKey = 'Agreement'

  const toggleAgreementLayer = (selected: boolean) => {
    batch(() => {
      dispatch(GeoActions.setRecipe('custom'))
      dispatch(GeoActions.setAgreementLayerSelected(selected))
    })
  }

  const setAgreementLevel = (level: number) => {
    batch(() => {
      dispatch(GeoActions.setRecipe('custom'))
      dispatch(GeoActions.setAgreementLevel(level))
    })
  }

  return forestOptions.selected.length >= 2 ? (
    <GeoMapMenuListElement
      title="Agreement layer"
      tabIndex={layers.length * -1 - 1}
      checked={forestOptions.agreementLayerSelected}
      onCheckboxClick={() => toggleAgreementLayer(!forestOptions.agreementLayerSelected)}
    >
      <>
        <LayerOptionsPanel layerKey={agreementLayerKey} checked={forestOptions.agreementLayerSelected} />
        {forestOptions.agreementLayerSelected && (
          <div className="geo-map-menu-data-visualizer-agreement-levels-control">
            <p>
              <small>
                Choose the agreement level between all map layers. Agreement level <i>N</i> means that at least <i>N</i>{' '}
                of the selected data sources need to agree that a certain pixel is forest area.
              </small>
            </p>
            <div className="geo-map-menu-data-visualizer-agreement-levels-boxes">
              {Array(layers.length)
                .fill(undefined)
                .map((_, i) => {
                  const level = i + 1
                  const id = `agreement-${level}`
                  const disabled = level > forestOptions.selected.length

                // Agreement layer color legend
                const agreementLevelOffset = level - forestOptions.agreementLevel
                const style =
                  agreementLevelOffset >= 0 &&
                  level <= forestOptions.selected.length &&
                  agreementLevelOffset < forestOptions.agreementPalette.length
                    ? {
                        borderBottom: `10px solid ${forestOptions.agreementPalette[agreementLevelOffset]}`,
                      }
                    : {}

                  return (
                    <span
                      className={classNames('geo-map-menu-data-visualizer-agreement-level', { disabled })}
                      key={level}
                    >
                      <input
                        id={id}
                        className="geo-map-menu-data-visualizer-agreement-levels-box"
                        type="checkbox"
                        checked={level <= forestOptions.agreementLevel}
                        disabled={disabled}
                        onChange={() => setAgreementLevel(level)}
                        style={style}
                      />
                      <label htmlFor={id}>{level}</label>
                    </span>
                  )
                })}
            </div>
          </div>
        )}
      </>
    </GeoMapMenuListElement>
  ) : null
}

export default AgreementLevelsControl
