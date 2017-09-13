import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import MobileDetect from 'mobile-detect'
import styled from 'styled-components'
import _ from 'lodash'
import CurrencyConversion from '../currencyConversion'
import { ChipIcon } from './chipIcon'
// import ChipContainer from '../chipContainer'

const CHIP_STYLES = {
  PURPLE: {
    fillColor: '#6a52f4',
    primaryCheckerColor: '#918dfd',
    secondaryCheckerColor: '#4b43bc',
    borderGradientColorOne: '#9792f8',
    borderGradientColorTwo: '#2a5395'
  },
  ORANGE: {
    fillColor: '#ffcb77',
    primaryCheckerColor: '#fbdb9b',
    secondaryCheckerColor: '#eeac3d',
    borderGradientColorOne: '#fade9e',
    borderGradientColorTwo: '#a48229'
  },
  RED: {
    fillColor: '#f45061',
    primaryCheckerColor: '#ff9ca9',
    secondaryCheckerColor: '#d22e3f',
    borderGradientColorOne: '#f39396',
    borderGradientColorTwo: '#7c3535'
  },
  BLUE: {
    fillColor: '#458fc4',
    primaryCheckerColor: '#6ca2c0',
    secondaryCheckerColor: '#19669e',
    borderGradientColorOne: '#64c0f8',
    borderGradientColorTwo: '#19667a'
  },
  TEAL: {
    fillColor: '#60c6bb',
    primaryCheckerColor: '#9fd3d5',
    secondaryCheckerColor: '#1f8e93',
    borderGradientColorOne: '#88ddd3',
    borderGradientColorTwo: '#55ad97'
  },
  GREEN: {
    fillColor: '#7bce12',
    primaryCheckerColor: '#9de05a',
    secondaryCheckerColor: '#57a301',
    borderGradientColorOne: '#b4ed50',
    borderGradientColorTwo: '#348224'
  },
  BLACK: {
    fillColor: '#5e5452',
    primaryCheckerColor: '#858c8a',
    secondaryCheckerColor: '#3f3d3e',
    borderGradientColorOne: '#929093',
    borderGradientColorTwo: '#214838'
  }
}

const ForegroundDefault = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  font-size: 12px;
  line-height: 1.4;
`

const Foreground = ForegroundDefault.extend`
  left: -50%;
  transform: translate(-50%, -50%);
`

const ForegroundRight = ForegroundDefault.extend`
  transform: translate(50%, -50%);
`

const ForegroundTableDefault = styled.div`
  position: absolute;
  z-index: -2;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.4;
  border: none;
  border-radius: 25px;
  top: 120%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  padding: 0em 0.5em;
`

const ForegroundTableRight = ForegroundTableDefault.extend`
  opacity: 0.5;
`

const ChipContainer = styled.div`
  display: block;
  position: relative;
  border-radius: 50%;
  transform: ${(props) => props.transform || 'none'};
  ${(props) => {
    if (!props.size) {
      return `
        width: 100%;
        height: 100%;
      `
    } else if (props.size < 50) {
      return `
        width: 30px;
        height: 30px;
      `
    } else {
      return `
        width: 75px;
        height: 75px;
        @media (min-width: 570px) and (max-width: 1200px) {
          width: 50px;
          height: 50px;
        }

        /* iPhone 5 */
        @media (max-width: 570px) {
          width: 40px;
          height: 40px;
        }
      `
    }
  }}
`

class Chip extends PureComponent {
  constructor (props) {
    super(props)
    const md = new MobileDetect(window.navigator.userAgent)
    this.state = {
      isMobile: !_.isNull(md.mobile())
    }
  }

  render () {
    const { id, align, textColor, size, color, active, value, valuePrefix, currency, isOnTable, showValue, chipStyleKey, opacity } = this.props
    let valueLeft = '50%'
    let valueColor = textColor || '#fff'
    let chipContent = align === 'right' ? ForegroundRight : Foreground
    let chipValueStyle = {left: valueLeft, color: valueColor}
    if (isOnTable) {
      const colors = {
        blue: '#1d7ac7',
        red: '#ca354b',
        black: '#241e1e',
        yellow: '#eca94a',
        pink: '#d45db4'
      }
      chipContent = align === 'right' ? ForegroundTableRight : ForegroundTableDefault
      delete chipValueStyle.left
      chipValueStyle.background = colors[`${color}`]
    }
    if (active) valueColor = '#fff'

    return (
      <ChipContainer className='chip' size={size} transform={isOnTable && this.state.isMobile ? 'transform: scale(0.8)' : null}>
        <ChipIcon id={`${id}_icon`} {...CHIP_STYLES[chipStyleKey]} opacity={opacity} />
        {
          React.createElement(chipContent, { style: chipValueStyle }, [
            !!valuePrefix && <span key='chip-label'>{valuePrefix}</span>,
            !!value && showValue && <CurrencyConversion key='chip-value' to={currency} value={value} valueOnly />
          ])
        }
      </ChipContainer>
    )
  }
}

Chip.defaultProps = {
  isOnTable: false,
  showValue: true
}

Chip.propTypes = {
  id: PropTypes.string.isRequired,
  currency: PropTypes.oneOf(['BTC', 'mBTC', 'Satoshi']),
  value: PropTypes.number,
  valuePrefix: PropTypes.string,
  size: PropTypes.number,
  align: PropTypes.string,
  border: PropTypes.bool,
  active: PropTypes.bool,
  textColor: PropTypes.string,
  isOnTable: PropTypes.bool,
  showValue: PropTypes.bool,
  chipStyleKey: PropTypes.oneOf(Object.keys(CHIP_STYLES)).isRequired,
  opacity: PropTypes.string
}

module.exports = {
  Chip,
  ChipContainer
}
