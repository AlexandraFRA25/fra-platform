export default {
  tableName: 'table_1_2a',
  schemaName: 'pan_european',
  section: 'panEuropean_1_2_a',
  rows: {
    names: [
      'forest_2020',
      'forest_2015',
      'forest_2010',
      'forest_2005',
      'forest_2000',
      'forest_1990',

      '_of_which_available_for_wood_supply_2020',
      '_of_which_available_for_wood_supply_2015',
      '_of_which_available_for_wood_supply_2010',
      '_of_which_available_for_wood_supply_2005',
      '_of_which_available_for_wood_supply_2000',
      '_of_which_available_for_wood_supply_1990',

      'other_wooded_land_2020',
      'other_wooded_land_2015',
      'other_wooded_land_2010',
      'other_wooded_land_2005',
      'other_wooded_land_2000',
      'other_wooded_land_1990',

      'total_forest_and_other_wooded_land_2020',
      'total_forest_and_other_wooded_land_2015',
      'total_forest_and_other_wooded_land_2010',
      'total_forest_and_other_wooded_land_2005',
      'total_forest_and_other_wooded_land_2000',
      'total_forest_and_other_wooded_land_1990',
    ],
  },
  columns: [
    { name: 'total', type: 'numeric' },
    { name: 'coniferous', type: 'numeric' },
    { name: 'broadleaved', type: 'numeric' },
  ],
}