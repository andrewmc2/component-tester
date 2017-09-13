import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import convert from '../../helpers/currencyConversion/conversions'

class CurrencyConversion extends PureComponent {
  render () {
    const { value, from, to, className, valueOnly, precision, commas, minDecimals } = this.props
    return (
      <span className={className || ''}>
        {convert({fromCurrency: from, targetCurrency: to, value, valueOnly, commas, precision, minDecimals})}
      </span>
    )
  }
}

CurrencyConversion.defaultProps = {
  from: 'Satoshi',
  precision: 3
}

CurrencyConversion.propTypes = {
  className: PropTypes.string,
  from: PropTypes.oneOf(['Satoshi', 'BTC', 'mBTC']).isRequired,
  to: PropTypes.oneOf(['Satoshi', 'BTC', 'mBTC']).isRequired,
  valueOnly: PropTypes.bool,
  commas: PropTypes.bool,
  value: PropTypes.number.isRequired,
  precision: PropTypes.number,
  minDecimals: PropTypes.number
}

export default CurrencyConversion
