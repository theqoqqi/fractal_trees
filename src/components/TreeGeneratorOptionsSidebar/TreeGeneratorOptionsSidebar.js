import styles from './TreeGeneratorOptionsSidebar.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Col, FormCheck, FormGroup, Row} from 'react-bootstrap';
import LabelledControl from '../LabelledControl/LabelledControl.js';

export default class TreeGeneratorOptionsSidebar extends React.Component {

    static propTypes = {
        options: PropTypes.shape({
            depth: PropTypes.number,
            stemDepth: PropTypes.number,
            stemLength: PropTypes.number,
            startWidth: PropTypes.number,
            startLength: PropTypes.number,
            widthFactor: PropTypes.number,
            lengthFactor: PropTypes.number,
            minWidth: PropTypes.number,
            forkPredicate: PropTypes.func,
            baseForkAngle: PropTypes.func,
            forkAngleScatter: PropTypes.number,
            inheritAngles: PropTypes.bool,
        }),
        regenerateOnChanges: PropTypes.bool,
        onChange: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            options: props.options,
            regenerateOnChanges: props.regenerateOnChanges,
        };
    }


    render() {
        let options = this.state.options;
        let onChange = (e, optionName, valueType) => {
            let value = e.target.value;

            if (valueType === 'lambda') {
                value = eval('b => ' + value);
            } else {
                value = +value;
            }

            let newOptions = {
                ...this.state.options,
                [optionName]: value,
            };

            this.setState({
                options: newOptions,
            });

            if (this.state.regenerateOnChanges) {
                this.props.onChange(newOptions);
            }
        };
        let triggerChange = (e, optionName) => {
            this.props.onChange(this.state.options);
        };

        return (
            <Row className={this.props.className}>
                <Col className={styles.inputList}>
                    <LabelledControl
                        title='Уровни'
                        type='number'
                        value={options.depth}
                        min={1}
                        max={25}
                        onChange={e => onChange(e, 'depth')}
                    />
                    <LabelledControl
                        title='Уровни древесины'
                        type='number'
                        value={options.stemDepth}
                        min={0}
                        max={options.depth}
                        onChange={e => onChange(e, 'stemDepth')}
                    />
                    <LabelledControl
                        title='Длина ствола'
                        type='number'
                        value={options.stemLength}
                        min={0}
                        max={1000}
                        step={10}
                        onChange={e => onChange(e, 'stemLength')}
                    />
                    <LabelledControl
                        title='Стартовая ширина'
                        type='number'
                        value={options.startWidth}
                        min={0}
                        max={100}
                        step={5}
                        onChange={e => onChange(e, 'startWidth')}
                    />
                    <LabelledControl
                        title='Стартовая длина'
                        type='number'
                        value={options.startLength}
                        min={0}
                        max={500}
                        step={10}
                        onChange={e => onChange(e, 'startLength')}
                    />
                    <LabelledControl
                        title='Множитель ширины'
                        type='number'
                        value={options.widthFactor}
                        min={0}
                        max={2}
                        step={0.01}
                        onChange={e => onChange(e, 'widthFactor')}
                    />
                    <LabelledControl
                        title='Множитель длины'
                        type='number'
                        value={options.lengthFactor}
                        min={0}
                        max={2}
                        step={0.01}
                        onChange={e => onChange(e, 'lengthFactor')}
                    />
                    <LabelledControl
                        title='Минимальная ширина'
                        type='number'
                        value={options.minWidth}
                        min={0}
                        max={100}
                        step={0.1}
                        onChange={e => onChange(e, 'minWidth')}
                    />
                    <LabelledControl
                        title='forkPredicate'
                        type='text'
                        value={('' + options.forkPredicate).slice(5)}
                        onChange={e => onChange(e, 'forkPredicate', 'lambda')}
                    />
                    <LabelledControl
                        title='baseForkAngle'
                        type='text'
                        value={('' + options.baseForkAngle).slice(5)}
                        onChange={e => onChange(e, 'baseForkAngle', 'lambda')}
                    />
                    <LabelledControl
                        title='Случайный угол'
                        type='number'
                        value={options.forkAngleScatter}
                        min={-360}
                        max={360}
                        onChange={e => onChange(e, 'forkAngleScatter')}
                    />
                    <FormCheck
                        type='checkbox'
                        id='regenerate-on-changes-checkbox'
                        label='Генерировать автоматически'
                        checked={this.state.regenerateOnChanges}
                        onChange={e => this.setState({
                            regenerateOnChanges: e.target.checked,
                        })}
                    />
                    <Button onClick={() => triggerChange()} className='w-100'>
                        Сгенерировать
                    </Button>
                </Col>
            </Row>
        );
    }
}