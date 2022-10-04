import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

enum defaults {
  assessmentName = ':assessmentName',
  countryIso = ':countryIso',
  cycleName = ':cycleName',
  id = ':id',
  sectionName = ':sectionName',
  year = ':year',
}

export enum AssessmentHomeRouteNames {
  overview = 'overview',
  messageBoard = 'messageBoard',
  contentCheck = 'contentCheck',
  userManagement = 'userManagement',
  recentActivity = 'recentActivity',
  links = 'links',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _generate = (...parts: any[]) => `/${parts.filter(Boolean).join('/')}`

export const BasePaths = {
  Root: () => '/',

  Admin: {
    root: () => '/admin',
  },

  Assessment: {
    root: (
      countryIso: CountryIso | defaults.countryIso | string = defaults.countryIso,
      assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
      cycleName: string = defaults.cycleName
    ) => _generate(countryIso, 'assessments', assessmentName, cycleName),

    home: (
      countryIso: CountryIso | defaults.countryIso | string = defaults.countryIso,
      assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
      cycleName: string = defaults.cycleName,
      route: AssessmentHomeRouteNames = null
    ) => _generate(countryIso, 'assessments', assessmentName, cycleName, 'home', route),

    section: (
      countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
      assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
      cycleName: string = defaults.cycleName,
      sectionName: string | defaults.sectionName = defaults.sectionName
    ) => _generate(countryIso, 'assessments', assessmentName, cycleName, sectionName),

    dataDownload: (
      countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
      assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
      cycleName: string = defaults.cycleName
    ) => _generate(countryIso, 'assessments', assessmentName, cycleName, 'dataDownload'),

    print: (
      countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
      assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
      cycleName: string = defaults.cycleName,
      tables = false
    ) => _generate(countryIso, assessmentName, cycleName, 'print', tables && 'tables'),

    OriginalDataPoint: {
      one: (
        countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
        assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
        cycleName: string = defaults.cycleName,
        year = ':year'
      ) => _generate(countryIso, 'assessments', assessmentName, cycleName, 'originalDataPoint', year),
      section: (
        countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
        assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
        cycleName: string = defaults.cycleName,
        year = ':year',
        sectionName: string | defaults.sectionName = defaults.sectionName
      ) => _generate(countryIso, 'assessments', assessmentName, cycleName, 'originalDataPoint', year, sectionName),
      tab: (sectionName: string | defaults.sectionName = defaults.sectionName) =>
        _generate(
          defaults.countryIso,
          'assessments',
          defaults.assessmentName,
          defaults.cycleName,
          'originalDataPoint',
          defaults.year,
          sectionName
        ),
    },
  },

  Login: {
    root: () => '/login',
    resetPassword: () => `/login/resetPassword`,
    invitation: () => '/login/invitation',
  },

  User: {
    root: (id: number | defaults.id = defaults.id) => `/user/${id}`,
  },

  Geo: {
    root: (countryIso: CountryIso | defaults.countryIso | string = defaults.countryIso) => `/${countryIso}/geo`,
  },
}