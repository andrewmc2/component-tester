import _ from 'lodash'

export default function convert (params) {
  const { fromCurrency, targetCurrency, value, valueOnly = false, commas = false, precision = 3, toString = true, minDecimals } = params
  let finalValue
  const multiplier = getMultiplier(targetCurrency, fromCurrency)

  finalValue = applyPrecision(multiplier * value, targetCurrency === 'mBTC' ? 0 : precision)

  // will add commas "to the right" of the decimal for
  // precision > 3, so we avoid using for those
  if (commas && precision <= 3) {
    finalValue = addCommas(finalValue, precision)
  }

  let currency = ''
  if (!valueOnly) {
    let formattedCurrency = targetCurrency.toUpperCase()
    if (targetCurrency.length === 4) {
      formattedCurrency = _.lowerFirst(formattedCurrency)
    }
    currency = ` ${formattedCurrency}`
  }

  if (minDecimals) return parseFloat(finalValue).toFixed(minDecimals)

  return toString ? finalValue + currency : parseFloat(finalValue)
}

// applies the correct precision without rounding up
export function applyPrecision (number, precision) {
  const multiplier = Math.pow(10, precision)
  return (Math.floor(number * multiplier) / multiplier).toFixed(precision)
}

// TODO: support all the currencies
export function getMultiplier (to, from = 'Satoshi') {
  let multiplier = 1
  switch (from) {
    case 'Satoshi':
      if (to === 'mBTC') {
        multiplier = 0.00001
      } else if (to === 'BTC') {
        multiplier = 0.00000001
      }
      break
    case 'BTC':
      if (to === 'Satoshi') {
        multiplier = 100000000
      }
      break
    case 'mBTC':
      if (to === 'Satoshi') {
        multiplier = 100000
      }
      break
    default:
      break
  }
  return multiplier
}

export function roundToMBTC (satoshiValue) {
  return Math.floor(satoshiValue / 100000) * 100000
}

export function getDecimalPlaces (number) {
  return (String(number).split('.')[1] || []).length
}

/* For display purposes, not precision */
const MIN_BTC_DECIMALS = 5
const MIN_MBTC_DECIMALS = 2

export const getSatoshiPrecision = (min) => -String(min).length + 1

export const getDisplayPrecision = (min, currency) => {
  const satoshiPrecision = getSatoshiPrecision(min)
  return currency === 'BTC' ? satoshiPrecision + 8 : satoshiPrecision + 5
}

export const getMinDecimals = (currency, precision) => {
  return currency === 'BTC'
    ? Math.max(precision, MIN_BTC_DECIMALS)
    : Math.max(precision, MIN_MBTC_DECIMALS)
}

/*
 * add commas to delimit units
 */
export function addCommas (numberString, precision = 0) {
  if (!numberString) return
  return Number(numberString).toLocaleString(undefined, { minimumFractionDigits: precision })
}
