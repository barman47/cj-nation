import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Comment = ({
    value,
    placeholder,
    id,
    name,
    onChange,
    errorMessage
}) => (
    <Fragment>
        <textarea 
            className={classnames('validate', {
                'invalid': errorMessage
            })}
            id={id}
            name={name}
            value={value} 
            onChange={onChange} 
            placeholder={placeholder}
        >
        </textarea>
        {errorMessage ? (<span className="helper-text invalid-text">{errorMessage}</span>) : null}
    </Fragment>
);

Comment.propTypes = {
    value: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

export default Comment;