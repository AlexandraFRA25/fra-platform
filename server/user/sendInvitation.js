const nodemailer = require('nodemailer')

const { getCountryName } = require('../../common/country')
const { createI18nPromise } = require('../../common/i18n/i18nFactory')
const { sendMail } = require('../email/sendMail')

const createMail = (countryIso, invitedUser, loggedInUser, url, i18n) => {
  const link = `${url}/login${invitedUser.invitationUuid ? `?i=${invitedUser.invitationUuid}` : ''}`
  const country = getCountryName(countryIso, 'en')
  const role = invitedUser.role.toLowerCase()
  return {
    to: invitedUser.email,
    subject: i18n.t('userManagement.invitationEmail.subject', {country}),
    text: i18n.t('userManagement.invitationEmail.textMessage', {country, invitedUser: invitedUser.name, role: `$t(user.roles.${role})`, loggedInUser: loggedInUser.name, link, url}),
    html: i18n.t('userManagement.invitationEmail.htmlMessage', {country, invitedUser: invitedUser.name, role: `$t(user.roles.${role})`, loggedInUser: loggedInUser.name, link, url})
  }
}

const sendInvitation = async (countryIso, invitedUser, loggedInUser, url) => {
  const i18n = await createI18nPromise('en')
  const invitationEmail = createMail(countryIso, invitedUser, loggedInUser, url, i18n)
  await sendMail(invitationEmail)
}

module.exports.sendInvitation = sendInvitation