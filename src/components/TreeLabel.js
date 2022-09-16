import React from 'react'
import PropTypes from 'prop-types'
const TreeLabel = ({ title, className }) => {
    return (
        <div className={className}>
            {title}
        </div>
    )
}

TreeLabel.defaultProps = {
    title: 'صفحه اصلی',
    size: 'text-xs'
}

TreeLabel.propTypes = {
    title: PropTypes.string,
    size: PropTypes.string
}

export default TreeLabel