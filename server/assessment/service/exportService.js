const R = require('ramda')
const Promise = require('bluebird')

const AccessControl = require('../../utils/accessControl')

const CountryService = require('../../country/countryService')

const FRAYearsExporter = require('./fraYears/fraYearsExporter')
const IntervalYearsExporter = require('./intervals/intervalYearsExporter')
const AnnualYearsExporter = require('./annual/annualYearsExporter')
const NdpExporter = require('./ndp/ndpExporter')
const NwfpExporter = require('./nwfpAndGSComp/nwfpExporter')
const GSCompExporter = require('./nwfpAndGSComp/gscompExporter')

const JSONOutput = require('./jsonOutput')

const EXPORT_TYPE = {
  JSON: 'json',
  CSV: 'csv',
}

const exportData = async (user, exportType = EXPORT_TYPE.JSON) => {
  AccessControl.checkAdminAccess(user)

  const countriesAll = await CountryService.getAllCountriesList()
  const countries = R.reject(R.propEq('region', 'atlantis'), countriesAll)

  const isExportTypeJson = exportType === EXPORT_TYPE.JSON

  const fraYearsOutput = isExportTypeJson ? new JSONOutput('fraYears') : FRAYearsExporter.getCsvOutput()
  const intervalsOutput = isExportTypeJson ? new JSONOutput('intervals') : IntervalYearsExporter.getCsvOutput()
  const annualOutput = isExportTypeJson ? new JSONOutput('annual') : AnnualYearsExporter.getCsvOutput()
  const ndpOutput = isExportTypeJson ? new JSONOutput('ndp') : NdpExporter.getCsvOutput()
  const nwfpOutput = isExportTypeJson ? new JSONOutput('ndp') : NwfpExporter.getCsvOutput()
  const gscompOutput = isExportTypeJson ? new JSONOutput('ndp') : GSCompExporter.getCsvOutput()

  await Promise.each(
    countries.map(async country =>
      await Promise.all([
        FRAYearsExporter.getCountryData(country),
        IntervalYearsExporter.getCountryData(country),
        AnnualYearsExporter.getCountryData(country),
        NdpExporter.getCountryData(country),
        NwfpExporter.getCountryData(country),
        GSCompExporter.getCountryData(country),
      ])
    ),

    ([fraYearsRes, intervalsRes, annualRes, ndps, nwfp, gsComp], idx) => {
      fraYearsOutput.pushContent(fraYearsRes, idx)
      intervalsOutput.pushContent(intervalsRes)
      annualOutput.pushContent(annualRes, idx)
      ndpOutput.pushContent(ndps)
      nwfpOutput.pushContent(nwfp)
      gscompOutput.pushContent(gsComp)
    }
  )

  fraYearsOutput.pushContentDone()
  intervalsOutput.pushContentDone()
  annualOutput.pushContentDone()
  ndpOutput.pushContentDone()
  nwfpOutput.pushContentDone()
  gscompOutput.pushContentDone()

  return {
    ...fraYearsOutput.output,
    ...intervalsOutput.output,
    ...annualOutput.output,
    ...ndpOutput.output,
    ...nwfpOutput.output,
    ...gscompOutput.output,
  }
}

module.exports = {
  EXPORT_TYPE,

  exportData,
}