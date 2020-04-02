import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as EmploymentValidatorState from '@webapp/app/assessment/fra/sections/employment/employmentValidatorState'

const section = FRA.sections['7'].children.a
const years = FRA.yearsTable.slice(0, FRA.yearsTable.length - 1)
const categories = ['total', 'female', 'male']

const getDataCols = (validator = null) =>
  years
    .map(() =>
      categories.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: validator,
        })
      )
    )
    .flat()

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.employment,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'employment.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 3,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'employment.unitHeader',
          [SectionSpec.KEYS_COL.colSpan]: years.length * categories.length,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: years.map((year) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: year,
          [SectionSpec.KEYS_COL.colSpan]: categories.length,
        })
      ),
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: years
        .map(() =>
          categories.map((category) =>
            SectionSpec.newColHeader({
              [SectionSpec.KEYS_COL.labelKey]: `employment.${category}`,
            })
          )
        )
        .flat(),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'employment.inForestry',
      [SectionSpec.KEYS_ROW.cols]: getDataCols(),
    }),
    ...['ofWhichSilviculture', 'ofWhichLogging', 'ofWhichGathering', 'ofWhichSupport'].map((subcateogry) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: `employment.${subcateogry}`,
        [SectionSpec.KEYS_ROW.subcategory]: true,
        [SectionSpec.KEYS_ROW.cols]: getDataCols(EmploymentValidatorState.genderSubCategoryValidator),
      })
    ),
    SectionSpec.newRowNoticeMessage({
      [SectionSpec.KEYS_ROW.rowSpan]: 2,
    }),
    SectionSpec.newRowValidationMessages({
      [SectionSpec.KEYS_ROW.getValidationMessages]: EmploymentValidatorState.getValidationMessages,
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const employment = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
  [SectionSpec.KEYS_SECTION.descriptions]: {
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: false,
  },
})

export default employment
