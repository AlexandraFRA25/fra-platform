import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CountryIso } from '@meta/area'
import { TableData } from '@meta/data'

export const getOriginalDataPointData = createAsyncThunk<
  TableData,
  { countryIso: CountryIso; assessmentName: string; cycleName: string }
>('section/get/originalDataPointData', async ({ countryIso, assessmentName, cycleName }) => {
  const { data } = await axios.get(ApiEndPoint.CycleData.OriginalDataPoint.data(), {
    params: {
      countryIso,
      assessmentName,
      cycleName,
    },
  })
  return data
})
