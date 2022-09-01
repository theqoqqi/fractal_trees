
export default class TreeBranch {

    type;

    depth;

    width;

    length;

    angle;

    parent;

    childBranches = [];

    constructor(type, depth, width, length, angle) {
        this.type = type;
        this.depth = depth;
        this.width = width;
        this.length = length;
        this.angle = angle;
    }

    setParent(parent) {
        this.parent = parent;
    }

    addBranch(branch) {
        this.childBranches.push(branch);
    }
}
