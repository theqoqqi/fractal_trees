import AbstractTreeRenderer from './AbstractTreeRenderer.js';

export default class CanvasTreeRenderer extends AbstractTreeRenderer {

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawTree(x, y, angle, tree) {
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(angle * Math.PI / 180);

        this.preparedTree = this.precalculateBranch(tree);
        this.branchesByDepths = this.groupBranchesByDepth(this.preparedTree);
        this.maxDepth = Math.max(...Object.keys(this.branchesByDepths).map(n => +n));

        this.drawBranches();
        // this.drawLeaves(preparedTree);

        this.context.restore();
    }

    drawBranches() {
        for (const branches of Object.values(this.branchesByDepths)) {
            this.drawBranchesLayer(branches);
        }
    }

    drawBranchesLayer(branches) {
        this.context.strokeStyle = this.getBranchColor(branches[0]);
        this.context.lineWidth = branches[0].width;
        this.context.lineCap = 'round';

        this.context.beginPath();

        for (const branch of branches) {
            this.context.moveTo(branch.start.x, branch.start.y);
            this.context.lineTo(branch.end.x, branch.end.y);
        }

        this.context.stroke();
    }

    precalculateBranch(branch, parent = null) {
        let point = (x, y) => ({x, y});

        let rotate = function (v, angle) {
            angle = -angle * (Math.PI / 180);

            let cos = Math.cos(angle);
            let sin = Math.sin(angle);

            return {
                x: v.x * cos - v.y * sin,
                y: v.x * sin + v.y * cos,
            };
        };

        let add = (a, b) => {
            return {
                x: a.x + b.x,
                y: a.y + b.y,
            };
        };

        if (parent) {
            branch.angle += parent.angle;
        }

        branch.start = point(0, 0);
        branch.end = rotate(point(branch.length, 0), branch.angle);

        if (parent) {
            branch.start = add(parent.end, branch.start);
            branch.end = add(parent.end, branch.end);
        }

        for (const childBranch of branch.childBranches) {
            this.precalculateBranch(childBranch, branch);
        }

        return branch;
    }

    drawLeaves(branch) {
        this.context.fillStyle = '#498c0a80';
        this.context.beginPath();

        this.walkBranches(branch, branch => {
            // Если произойдет больше 164480 операций, отрисовка не произойдет
            if (branch.childBranches.length === 0 && Math.random() < 0.5) {
                this.context.moveTo(branch.end.x, branch.end.y);
                this.context.arc(branch.end.x, branch.end.y, Math.sqrt(branch.length), 0, 2 * Math.PI);
            }
        });

        this.context.fill();
    }

    groupBranchesByDepth(branch) {
        let branchesByDepths = {};

        this.walkBranches(branch, b => {
            if (!branchesByDepths[b.depth]) {
                branchesByDepths[b.depth] = [];
            }

            branchesByDepths[b.depth].push(b);
        });

        return branchesByDepths;
    }

    getBranchColor(branch) {
        if (branch.type === 'stem') {
            return '#845a39';
        }

        let r = 73;
        let g = 110 + branch.depth * 2;
        let b = 10;
        let a = 1 - this.getLeafDepth(branch) * 0.1;

        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    getLeafDepth(branch) {
        if (branch.type !== 'leaf') {
            return 0;
        }

        let depth = 1;

        while (branch.parent.type === 'leaf') {
            depth++;
            branch = branch.parent;
        }

        return depth;
    }
}
