import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';

export default class LabelledControl extends React.Component  {

    static propTypes = {
        title: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.any,
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
        onChange: PropTypes.func,
    };

    render() {
        let {
            title,
            ...inputProps
        } = this.props;

        let value = this.props.value;

        if (this.props.type === 'number') {
            value = Math.min(this.props.max, Math.max(this.props.min, value));
        }

        return (
            <FormGroup>
                <FormLabel className='mb-1'>{title}</FormLabel>
                <FormControl {...inputProps} value={value} />
            </FormGroup>
        );
    }
}