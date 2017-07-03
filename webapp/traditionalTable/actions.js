import * as table from './table'
import assert from 'assert'
import axios from 'axios'
import * as autosave from '../autosave/actions'
import { applicationError } from '../applicationError/actions'
import { acceptNextInteger } from '../utils/numberInput'

export const tableValueChangedAction = 'traditionalTable/tableValueChanged'

const createNewTableState = (tableSpec, rowIdx, colIdx, newValue, getState) => {
  const traditionalTableState = getState().traditionalTable
  assert(tableSpec.name, 'tableSpec is missing name')
  const tableValues = traditionalTableState[tableSpec.name] || table.createTableData(tableSpec)
  //When we accept more than integers as input, we should use tableSpec to determine
  //the type here and use the proper transformation
  const sanitizedNewValue = acceptNextInteger(newValue, tableValues[rowIdx][colIdx])
  return table.update(tableValues, rowIdx, colIdx, sanitizedNewValue)
}

const saveChanges = (countryIso, tableSpec, tableData) => {
  const debounced = dispatch =>
    axios.post(
      `/api/traditionalTable/${countryIso}/${tableSpec.name}`,
      table.getValueSliceFromTableData(tableSpec, tableData)
    ).then(() => {
      dispatch(autosave.complete)
    }).catch((err) => {
      dispatch(applicationError(err))
      dispatch(autosave.complete)
    })

  debounced.meta = {
    debounce: {
      time: 800,
      key: 'saveTraditionalTable-' + tableSpec.name
    }
  }
  return debounced
}

export const tableValueChanged = (countryIso, tableSpec, rowIdx, colIdx, newValue) => (dispatch, getState) => {
  const newTableState = createNewTableState(tableSpec, rowIdx, colIdx, newValue, getState)
  dispatch({type: tableValueChangedAction, tableSpec, newTableState})
  dispatch(autosave.start)
  dispatch(saveChanges(countryIso, tableSpec, newTableState))
}

export const fetchTableData = (countryIso, tableSpec) => dispatch => {
  axios.get(`/api/traditionalTable/${countryIso}/${tableSpec.name}`).then(resp => {
    const emptyTableData = table.createTableData(tableSpec)
    if (resp.data) {
      const filled = table.fillTableDatafromValueSlice(tableSpec, emptyTableData, resp.data)
      dispatch({type: tableValueChangedAction, tableSpec, newTableState: filled})
    } else {
      dispatch({type: tableValueChangedAction, tableSpec, newTableState: emptyTableData})
    }
  }).catch((err) => {
    dispatch(applicationError(err))
  })
}