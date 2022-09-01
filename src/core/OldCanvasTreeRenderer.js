import AbstractTreeRenderer from './AbstractTreeRenderer.js';

export default class OldCanvasTreeRenderer extends AbstractTreeRenderer {

    drawTree(x, y, angle, tree) {
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(angle * Math.PI / 180);

        this.drawBranch(tree);
        // this.drawLeaves(tree);

        this.context.restore();
    }

    drawBranch(branch) {
        this.walkBranchesWithCanvas(branch, branch => {
            this.drawBranchLine(branch);
        });
    }

    drawLeaves(branch) {
        this.walkBranchesWithCanvas(branch, branch => {
            if (branch.childBranches.length === 0) {
                this.drawLeaf(branch);
            }
        });
    }

    walkBranchesWithCanvas(branch, callback) {
        this.walkBranches(
            branch,
            callback,
            branch => {
                this.context.save();

                this.context.rotate(branch.angle * Math.PI / 180);
                this.context.translate(branch.length, 0);
            },
            branch => {
                this.context.restore();
            },
        );
    }
}
