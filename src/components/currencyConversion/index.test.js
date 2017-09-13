/* eslint-env jest */

const { shallow } = require('enzyme')
const React = require('react')
const toJSON = require('enzyme-to-json').default
const CurrencyConversion = require('./index').default

describe('<CurrencyConversion />', () => {
  const defaultProps = {
    value: 1e6, // a mil
    to: 'BTC',
    valueOnly: undefined,
    precision: 10,
    commas: undefined
  }

  function buildComponent (props = {}) {
    props = Object.assign({}, defaultProps, props)
    return <CurrencyConversion {...props} />
  }

  it('renders satoshi values to btc', () => {
    const component = shallow(buildComponent())
    expect(toJSON(component)).toMatchSnapshot('currencyConversion')
  })

  it('renders satoshi values to mbtc', () => {
    const component = shallow(buildComponent({ to: 'mBTC', valueOnly: false }))
    expect(toJSON(component)).toMatchSnapshot('currencyConversion')
  })

  it('should allow for only rendering the value', () => {
    const component = shallow(buildComponent({ valueOnly: true }))
    expect(toJSON(component)).toMatchSnapshot('currencyConversion')
  })

  it('should allow for overriding precision', () => {
    const component = shallow(buildComponent({ valueOnly: false, precision: 2 }))
    expect(toJSON(component)).toMatchSnapshot('currencyConversion')
  })

  it('should allow for comma separation', () => {
    const component = shallow(buildComponent({ value: 100e6, to: 'mBTC', valueOnly: false, precision: 0, commas: true }))
    expect(toJSON(component)).toMatchSnapshot('currencyConversion')
  })
})
