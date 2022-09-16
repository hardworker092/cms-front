import React from 'react'
import PropTypes from 'prop-types'
const SizedBox = ({ width, height }) => {
    return (
        <div style={{ width, height }} />
    )
}

SizedBox.defaultProps = {
    width: 0,
    height: 0
}

SizedBox.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
}

export default SizedBox