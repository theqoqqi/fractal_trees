import styles from './TreeGeneratorUI.module.css';
import React from 'react';
import TreeGenerator from '../../core/TreeGenerator.js';
import TreeCanvas from '../TreeCanvas/TreeCanvas.js';
import TreeGeneratorOptionsSidebar from '../TreeGeneratorOptionsSidebar/TreeGeneratorOptionsSidebar.js';
import {Container} from 'react-bootstrap';

export default class TreeGeneratorUI extends React.Component {

    static propTypes = {
        // TODO: propTypes
    };

    static defaultOptions = {
        depth: 20,
        stemDepth: 15,
        stemLength: 400,
        startWidth: 40,
        startLength: 100,
        widthFactor: 0.6,
        lengthFactor: 0.85,
        minWidth: 0.5,
        forkPredicate: b => b.depth < 10 || Math.random() < 0.9,
        baseForkAngle: b => 120 - b.depth * 5,
        forkAngleScatter: 45,
        inheritAngles: false,
    };

    constructor(props) {
        super(props);

        this.state = {
            generatorOptions: TreeGeneratorUI.defaultOptions,
        };

        this.treeGenerator = new TreeGenerator(TreeGeneratorUI.defaultOptions);

        this.regenerateTree();
    }

    regenerateTree() {
        this.tree = this.treeGenerator.generate();
    }

    onOptionsChanged(options) {
        this.treeGenerator.setOptions(options);

        this.regenerateTree();

        this.setState({
            generatorOptions: options,
        });
    }

    render() {
        return (
            <Container
                fluid
                className={styles.treeGeneratorUI}
                style={{
                    height: '100vh',
                }}
            >
                <TreeGeneratorOptionsSidebar
                    className={styles.treeGeneratorOptionsSidebar}
                    options={this.state.generatorOptions}
                    onChange={options => this.onOptionsChanged(options)}
                    regenerateOnChanges={true}
                />
                <TreeCanvas className={styles.treeCanvas} tree={this.tree} />
            </Container>
        );
    }
}