import * as R from 'ramda'
import {
  parse,
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
  differenceInHours,
  differenceInMilliseconds,
  format
} from 'date-fns'

export const getRelativeDate = (rawDate, i18n) => {
  const timestamp = parse(rawDate)
  const now = new Date()
  const formatDiff = (fn, unit) => i18n.t(`time.${unit}`, {count: fn(now, timestamp)})

  if(R.isNil(rawDate))
    return null
  if (differenceInMonths(now, timestamp) > 0)
    return format(timestamp, 'DD MMMM YYYY')
  if (differenceInWeeks(now, timestamp) > 0)
    return formatDiff(differenceInWeeks, 'week')
  if (differenceInDays(now, timestamp) > 0)
    return formatDiff(differenceInDays, 'day')
  if (differenceInHours(now, timestamp) > 0)
    return formatDiff(differenceInHours, 'hour')

  return i18n.t('time.aMomentAgo')
}