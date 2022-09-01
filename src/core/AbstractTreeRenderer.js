
export default class AbstractTreeRenderer {

    canvas;

    /**
     * @type CanvasRenderingContext2D
     * */
    context;

    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    }

    drawTree(x, y, angle, tree) {

    }

    walkBranches(branch, callback, before = null, after = null) {
        before?.(branch);

        callback(branch);

        for (const childBranch of branch.childBranches) {
            this.walkBranches(childBranch, callback, before, after);
        }

        after?.(branch);
    }

    drawBranchLine(branch) {
        let color = this.getBranchColor(branch);
        this.drawLine(0, 0, -branch.length, 0, branch.width, color);
    }

    drawLeaf(branch) {
        this.drawCircle(0, 0, Math.sqrt(branch.length), '#498c0a');
    }

    drawLine(x1, y1, x2, y2, width, color) {
        this.context.strokeStyle = color;
        this.context.lineWidth = width;
        this.context.lineCap = 'round';

        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    drawCircle(x, y, radius, color) {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.fill();
    }

    getBranchColor(branch) {
        return branch.depth > 6 ? `rgb(73,${110 + branch.depth * 2},10)` : '#845a39';
    }
}
