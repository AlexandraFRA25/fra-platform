import { Arrays } from '@utils/arrays'

import { Cycle } from '@meta/assessment'

import { useAppSelector } from '@client/store'

export const useOriginalDataPoint = () => useAppSelector((state) => state.ui.originalDataPoint?.data)

export const useIsOriginalDataPointUpdating = () => useAppSelector((state) => state.ui.originalDataPoint?.updating)

export const useOriginalDataPointReservedYears = () =>
  useAppSelector((state) => state.ui.originalDataPoint.reservedYears)

export const useODPYears = (cycle: Cycle): { years: Array<number>; reservedYears: Array<number> } => {
  const years = cycle ? Arrays.reverse(Arrays.range(1950, Number(cycle.name))) : []
  const reservedYears = useOriginalDataPointReservedYears() ?? []

  return {
    years,
    reservedYears,
  }
}