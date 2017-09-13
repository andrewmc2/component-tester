import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'

export class ChipIcon extends PureComponent {
  render () {
    const {
      id,
      fillColor,
      primaryCheckerColor,
      secondaryCheckerColor,
      borderGradientColorOne,
      borderGradientColorTwo,
      opacity
    } = this.props

    const borderGradientId = `${id}_borderGradient`
    const borderId = `${id}_border`
    const checkerBorderId = `${id}_checkerBorder`
    const chipGleamGradientId = `${id}_chipGleam`

    return (
      <svg width='100%' height='100%' viewBox='0 0 23 23' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
        <defs>
          <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id={borderGradientId}>
            <stop stopColor={borderGradientColorOne} offset='0%' />
            <stop stopColor={borderGradientColorTwo} offset='100%' />
          </linearGradient>
          <mask id={borderId} x='-2' y='-2' width='22.564' height='22.518'>
            <path fill='#fff' d='M1.356 1.356H23.92v22.518H1.356z' />
            <ellipse cx='12.638' cy='12.615' rx='9.282' ry='9.259' />
          </mask>
          <mask id={checkerBorderId} fill='#fff'>
            <ellipse cx='12.638' cy='12.615' rx='9.282' ry='9.259' />
          </mask>
          <linearGradient id={chipGleamGradientId} x1='27.409%' y1='119.745%' x2='50%' y2='100%' >
            <stop stopColor='#FFF' stopOpacity='0' offset='0%' />
            <stop stopColor='#FFF' offset='100%' />
          </linearGradient>
        </defs>
        <g transform='translate(-1 -1)' fill='none' fillRule='evenodd'>
          <circle fill='#068D51' cx='12.5' cy='12.5' r='10.5' />
          <g opacity={opacity}>
            <ellipse fill={secondaryCheckerColor} cx='12.638' cy='12.615' rx='9.282' ry='9.259' />
            <ellipse stroke={`url(#${borderGradientId})`} mask={`url(#${borderId})`} strokeWidth='4' cx='12.638' cy='12.615' rx='9.282' ry='9.259' />
            <path fill={primaryCheckerColor} mask={`url(#${checkerBorderId})`} d='M2.261 10.66h20.837v3.838H2.261z' />
            <path fill={primaryCheckerColor} mask={`url(#${checkerBorderId})`} transform='rotate(60 12.656 12.92)' d='M2.237 11h20.837v3.838H2.237z' />
            <path fill={primaryCheckerColor} mask={`url(#${checkerBorderId})`} transform='scale(-1 1) rotate(60 0 -9.002)' d='M2.237 11h20.837v3.838H2.237z' />
            <ellipse fill={fillColor} cx='12.585' cy='12.585' rx='7.178' ry='7.178' />
            <path d='M19.674 12.99c-.083-5.014-4.183-9.052-9.228-9.052-5.046 0-9.146 4.038-9.23 9.051h18.458z' fill={`url(#${chipGleamGradientId})`} style={{ mixBlendMode: 'soft-light' }} transform='rotate(-28 10.446 8.464)' />
          </g>
        </g>
      </svg>
    )
  }
}

ChipIcon.propTypes = {
  id: PropTypes.string.isRequired,
  fillColor: PropTypes.string.isRequired,
  primaryCheckerColor: PropTypes.string.isRequired,
  secondaryCheckerColor: PropTypes.string.isRequired,
  borderGradientColorOne: PropTypes.string.isRequired,
  borderGradientColorTwo: PropTypes.string.isRequired,
  opacity: PropTypes.string
}

ChipIcon.defaultProps = {
  opacity: '1.0'
}
