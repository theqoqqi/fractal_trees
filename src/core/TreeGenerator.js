import TreeBranch from './TreeBranch.js';

export default class TreeGenerator {

    #depth;

    #stemDepth;

    #stemLength;

    #startWidth;

    #startLength;

    #widthFactor;

    #lengthFactor;

    #minWidth;

    #forkPredicate;

    #baseForkAngle;

    #forkAngleScatter;

    #inheritAngles;

    constructor(options) {
        this.setOptions(options)
    }

    setOptions(options) {
        this.#depth = options?.depth ?? this.#depth;
        this.#stemDepth = options?.stemDepth ?? this.#stemDepth;
        this.#stemLength = options?.stemLength ?? this.#stemLength;
        this.#startWidth = options?.startWidth ?? this.#startWidth;
        this.#startLength = options?.startLength ?? this.#startLength;
        this.#widthFactor = options?.widthFactor ?? this.#widthFactor;
        this.#lengthFactor = options?.lengthFactor ?? this.#lengthFactor;
        this.#minWidth = options?.minWidth ?? this.#minWidth;
        this.#forkPredicate = options?.forkPredicate ?? this.#forkPredicate;
        this.#baseForkAngle = options?.baseForkAngle ?? this.#baseForkAngle;
        this.#forkAngleScatter = options?.forkAngleScatter ?? this.#forkAngleScatter;
        this.#inheritAngles = options?.inheritAngles ?? this.#inheritAngles;
    }

    generate() {
        return this.createBranch();
    }

    createBranch(parent = null, localAngle = null) {
        let depth = parent?.depth ?? 1;
        let width = parent?.width ?? this.#startWidth;
        let length = parent?.length ?? this.#startLength;
        let angle = 0;
        let type = 'stem';

        if (parent) {
            depth++;
            width *= this.#widthFactor;
            width = Math.max(this.#minWidth, width);
            length *= this.#lengthFactor;
            angle = localAngle + (Math.random() - Math.random()) * this.#forkAngleScatter;

            if (this.#inheritAngles) {
                angle += parent.angle;
            }

            type = depth <= this.#stemDepth ? 'stem' : 'leaf';
        }

        let branch = new TreeBranch(type, depth, width, length, angle);

        if (depth < this.#depth) {
            let forkAngle = this.#baseForkAngle(branch);
            if (this.#forkPredicate(branch)) {
                branch.addBranch(this.createBranch(branch, -forkAngle / 2));
            }
            if (this.#forkPredicate(branch)) {
                branch.addBranch(this.createBranch(branch, forkAngle / 2));
            }
        }

        if (parent) {
            branch.setParent(parent);
        } else {
            branch.length = this.#stemLength;
        }

        return branch;
    }
}
