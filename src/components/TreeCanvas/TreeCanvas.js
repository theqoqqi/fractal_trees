// import './index.css';
import React from 'react';
import PropTypes from 'prop-types';
import CanvasTreeRenderer from '../../core/CanvasTreeRenderer.js';
import TreeBranch from '../../core/TreeBranch.js';

export default class TreeCanvas extends React.Component {

    static propTypes = {
        tree: PropTypes.instanceOf(TreeBranch),
    };

    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        this.treeRenderer = new CanvasTreeRenderer(this.canvasRef.current);

        this.redrawTree();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.redrawTree();
    }

    redrawTree() {
        if (this.props.tree) {
            this.treeRenderer.clearCanvas();
            this.treeRenderer.drawTree(540, 920, 270, this.props.tree);
        }
    }

    render() {
        return (
            <canvas className={this.props.className} ref={this.canvasRef} width='1080' height='960' />
        );
    }
}