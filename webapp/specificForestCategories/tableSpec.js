import React from 'react'

export default {
  name: 'specificForestCategories', // used to uniquely identify table
  header: <thead>
          <tr>
            <td className="fra-table__header-cell"/>
            <td className="fra-table__header-cell-align-right">1990</td>
            <td className="fra-table__header-cell-align-right">2000</td>
            <td className="fra-table__header-cell-align-right">2010</td>
            <td className="fra-table__header-cell-align-right">2015</td>
            <td className="fra-table__header-cell-align-right">2020</td>
          </tr>
          </thead>,
  rows: [
    [{type: 'readOnly', jsx: <td key="bamboo" className="fra-table__header-cell">Bamboo</td>},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'}
    ],
    [
      {type: 'readOnly', jsx: <td key="mangroves" className="fra-table__header-cell">Mangroves</td>},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'}
    ],
    [
      {type: 'readOnly', jsx: <td key="rubberPlantations" className="fra-table__header-cell">Rubber plantations</td>},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'}
    ]
  ],
  valueSlice: { columnStart: 1 }
}