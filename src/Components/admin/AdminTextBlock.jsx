import React, { Fragment } from 'react'
import { Input } from 'reactstrap';
import PropTypes from 'prop-types'

const AdminTextBlock = ({
    type,
    maxLength,
    style,
    onChange,
    name,
    value,
    placeholder
}) => {
    return (
        <Fragment>
            <Input
                className="mt-3"
                name={name}
                type={type}
                maxLength={maxLength}
                style={style}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e)} />
        </Fragment>
    )
}

AdminTextBlock.propTypes = {
    type: PropTypes.string,
    maxLength: PropTypes.string,
    style: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string
}

AdminTextBlock.defaultProps = {
    type: 'text',
    maxLength: "140",
    name: '',
    placeholder: 'Enter your question here',
    value: ''
}

export default AdminTextBlock
