/*
 * Functions for dealing with and creating the OriginalDataPoint datastructure
 */

import * as R from 'ramda'
import { sum, mul, sub, add, div } from '@common/bignumberUtils'

import { v4 as uuidv4 } from 'uuid'

export const updateNationalClass = (odp: any, index: any, field: any, value: any) => {
  const nationalClassToUpdate = odp.nationalClasses[index]
  const wasPlaceHolder = !R.isNil(R.path(['placeHolder'], nationalClassToUpdate))
  const updatedNationalClass = R.dissoc('placeHolder', { ...nationalClassToUpdate, [field]: value })
  const classesWithValueUpdated = R.update(index, updatedNationalClass, odp.nationalClasses)

  return wasPlaceHolder
    ? { ...odp, nationalClasses: [...classesWithValueUpdated, nationalClassPlaceHolder()] }
    : { ...odp, nationalClasses: classesWithValueUpdated }
}

export const removeNationalClass = (odp: any, index: any) => ({
  ...odp,
  nationalClasses: R.remove(index, 1, odp.nationalClasses),
})

export const removeClassPlaceholder = (odp: any) => {
  const updatedClasses = R.filter((nClass: any) => !nClass.placeHolder, odp.nationalClasses)
  return { ...odp, nationalClasses: updatedClasses }
}

export const defaultNationalClass = (className = '', definition = '') => ({
  className,
  definition,
  area: null,
  forestPercent: null,
  otherWoodedLandPercent: null,
  otherLandPercent: null,
  naturalForestPercent: null,
  plantationPercent: null,
  plantationIntroducedPercent: null,
  otherPlantedPercent: null,
  uuid: uuidv4(),
}) as any

export const nationalClassPlaceHolder = () => ({ ...defaultNationalClass(), placeHolder: true })

export const emptyDataPoint = () => ({
  year: null,
  forestArea: null,
  nationalClasses: [nationalClassPlaceHolder()],
}) as any

export const addNationalClassPlaceHolder = (odp: any) => ({
  ...odp,
  nationalClasses: [...odp.nationalClasses, nationalClassPlaceHolder()],
})

export const totalArea = (odp: any) =>
  R.pipe(
    R.map((nationalClass: any) => nationalClass.area),
    R.reject((v: any) => !v),
    sum
  )(odp.nationalClasses)

export const classTotalArea = (odp: any, percentFieldName: any) =>
  R.pipe(
    R.filter((nationalClass: any) => nationalClass.area && nationalClass[percentFieldName]),
    R.map((nationalClass: any) => mul(nationalClass.area, nationalClass[percentFieldName]).div(100.0)),
    sum
  )(odp.nationalClasses)

export const otherLandTotalArea = (odp: any) => {
  const total = totalArea(odp)
  const forestArea = classTotalArea(odp, 'forestPercent')
  const otherWoodedArea = classTotalArea(odp, 'otherWoodedLandPercent')
  return sub(total, add(forestArea, otherWoodedArea))
}

export const subClassTotalArea = (odp: any, percentFieldName: any, subClassPercentFieldName: any) =>
  R.pipe(
    R.filter(
      (nationalClass: any) =>
        nationalClass.area && nationalClass[percentFieldName] && nationalClass[subClassPercentFieldName]
    ),
    R.map((nationalClass: any) => {
      const x = mul(nationalClass.area, nationalClass[percentFieldName])
      const y = mul(x, nationalClass[subClassPercentFieldName])
      return div(y, 10000.0)
    }),
    sum
  )(odp.nationalClasses)

export const subSubClassTotalArea = (
  odp: any,
  percentFieldName: any,
  subClassPercentFieldName: any,
  subSubClassPercentFieldName: any
) =>
  R.pipe(
    R.filter(
      (nationalClass: any) =>
        nationalClass.area &&
        nationalClass[percentFieldName] &&
        nationalClass[subClassPercentFieldName] &&
        nationalClass[subSubClassPercentFieldName]
    ),
    R.map((nationalClass: any) => {
      const x = mul(nationalClass.area, nationalClass[percentFieldName])
      const y = mul(x, nationalClass[subClassPercentFieldName])
      const z = mul(y, nationalClass[subSubClassPercentFieldName])
      return div(z, 1000000.0)
    }),
    sum
  )(odp.nationalClasses)

export const allowCopyingOfPreviousValues = R.pipe(
  R.path(['nationalClasses', 0, 'className']),
  R.defaultTo(''),
  R.isEmpty
)

export const copyNationalClassDefinitions = (odpTarget: any, odpSource: any) => ({
  ...odpTarget,
  nationalClasses: [
    ...odpSource.nationalClasses.map((c: any) =>
      R.merge(
        defaultNationalClass(c.className, c.definition),
        R.pick(
          [
            'forestPercent',
            'otherWoodedLandPercent',
            'otherLandPercent',
            'naturalForestPercent',
            'plantationPercent',
            'plantationIntroducedPercent',
            'otherPlantedPercent',
            'otherLandPalmsPercent',
            'otherLandTreeOrchardsPercent',
            'otherLandAgroforestryPercent',
            'otherLandTreesUrbanSettingsPercent',
          ],
          c
        )
      )
    ),
    nationalClassPlaceHolder(),
  ],
})