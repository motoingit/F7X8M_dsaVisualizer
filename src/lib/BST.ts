export class BST {
    private root: BSTNode | null = null;

    constructor() { }

    getRoot() { return this.root; }

    insert(value: number) {
        const newNode: BSTNode = { value, left: null, right: null, x: 0, y: 0 };
        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
        this.generatePositions();
        return this.root;
    }

    private insertNode(node: BSTNode, newNode: BSTNode) {
        if (newNode.value < node.value) {
            if (node.left === null) node.left = newNode;
            else this.insertNode(node.left, newNode);
        } else {
            if (node.right === null) node.right = newNode;
            else this.insertNode(node.right, newNode);
        }
    }

    generatePositions() {
        if (!this.root) return;
        this.positionNode(this.root, 400, 50, 200); // Standard spacing
    }

    private positionNode(node: BSTNode | null, x: number, y: number, offset: number) {
        if (!node) return;
        node.x = x;
        node.y = y;
        // Decrease offset for deeper levels to prevent overlap
        this.positionNode(node.left, x - offset, y + 60, offset / 1.7);
        this.positionNode(node.right, x + offset, y + 60, offset / 1.7);
    }
}

export interface BSTNode {
    value: number;
    left: BSTNode | null;
    right: BSTNode | null;
    x: number;
    y: number;
}
