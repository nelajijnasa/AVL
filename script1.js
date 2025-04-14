// Declare necessary variables and classes
class AVLNode {
    constructor(value) {
        this.value = value;
        this.height = 1;
        this.left = null;
        this.right = null;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    getHeight(node) {
        return node ? node.height : 0;
    }

    getBF(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    // **RIGHT ROTATION LOGIC**
    // Hint: Right rotation is performed when the left subtree is taller than the right.
    // Steps:
    // 1. The left child becomes the new root of the subtree.
    // 2. The right child of the left subtree becomes the left child of the old root.
    // 3. Update the heights of the nodes involved.
    rightRotate(y) {
        const x = y.left;
        const T2 = x.right;
        x.right = y;
        y.left = T2;
        
        // Update heights
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        return x;
    }

    // **LEFT ROTATION LOGIC**
    // Hint: Left rotation is performed when the right subtree is taller than the left.
    // Steps:
    // 1. The right child becomes the new root of the subtree.
    // 2. The left child of the right subtree becomes the right child of the old root.
    // 3. Update the heights of the nodes involved.
    leftRotate(x) {
        const y = x.right;
        const T2 = y.left;
        y.left = x;
        x.right = T2;
        
        // Update heights
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        return y;
    }

    // **INSERTION LOGIC:**
    // Hint: Implement the insertion logic to add a node and balance the tree.
    // Steps:
    // 1. Use the same logic as a regular BST insert to find the correct position.
    // 2. After insertion, update the height of the node and check the balance factor.
    // 3. Balance the tree if needed by performing rotations (Left-Left, Right-Right, Left-Right, Right-Left).

    insert(node, value) {
        if (!node) {
            return new AVLNode(value); // Base case, node insertion
        }

        // **WRITE INSERTION LOGIC HERE**
        // Traverse the tree to find the correct position to insert the value:
        // If value is less than node.value, insert in the left subtree.
        // If value is greater, insert in the right subtree.
        // If value is equal, return the node (no duplicates).

        // After insertion, update the height of the node and check for imbalance.
        
        // **WRITE BALANCE CHECK AND ROTATION HERE**
        // Use getBF(node) to determine the balance factor and perform the appropriate rotations
        // For example:
        // if (balance > 1 && value < node.left.value) {
        //     return rightRotate(node); // Left-Left case
        // }
        // if (balance < -1 && value > node.right.value) {
        //     return leftRotate(node); // Right-Right case
        // }
        // if (balance > 1 && value > node.left.value) {
        //     node.left = leftRotate(node.left); // Left-Right case
        //     return rightRotate(node); // Right rotation
        // }
        // if (balance < -1 && value < node.right.value) {
        //     node.right = rightRotate(node.right); // Right-Left case
        //     return leftRotate(node); // Left rotation
        // }

        return node;
    }

    // **DELETION LOGIC:**
    // Hint: Implement the deletion logic and balance the tree after deletion.
    // Steps:
    // 1. Find the node to delete.
    // 2. Handle the three cases of node deletion:
    //    - No child (leaf node): simply remove the node.
    //    - One child: replace the node with its only child.
    //    - Two children: find the in-order successor (smallest node in the right subtree), replace the value, and delete the successor.
    // 3. After deletion, update the height and balance the tree.
    delete(node, value) {
        if (!node) return node; // Base case if node is null

        // **WRITE DELETION LOGIC HERE**
        // Traverse the tree to find the node to delete:
        // If value is smaller, delete in the left subtree.
        // If value is greater, delete in the right subtree.
        // If node to be deleted is found:
        // - Case 1: Node has no child or only one child.
        // - Case 2: Node has two children (find in-order successor).

        // After deletion, update height and balance the tree:
        // **WRITE BALANCE CHECK AND ROTATION AFTER DELETION HERE**
        // Check the balance factor and apply rotations if necessary (Left-Left, Right-Right, etc.).

        return node;
    }

    // Function to get the node with the minimum value (no need to modify)
    getMinValueNode(node) {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current;
    }

    // Visualizing the tree (no need to modify)
    visualizeTree(node, container) {
        if (!node) return;

        const div = document.createElement('div');
        div.className = "node";
        div.innerHTML = node.value;
        container.appendChild(div);

        if (node.left || node.right) {
            const children = document.createElement('div');
            children.className = "children";
            container.appendChild(children);

            if (node.left) {
                const left = document.createElement('div');
                left.className = "child left";
                children.appendChild(left);
                this.visualizeTree(node.left, left);
                const link = document.createElement('div');
                link.className = "link left";
                left.appendChild(link);
            }

            if (node.right) {
                const right = document.createElement('div');
                right.className = "child right";
                children.appendChild(right);
                this.visualizeTree(node.right, right);
                const link = document.createElement('div');
                link.className = "link right";
                right.appendChild(link);
            }
        }
    }

    // Refreshing the tree visualization (no need to modify)
    refreshTree() {
        const treeContainer = document.getElementById('treeContainer');
        treeContainer.innerHTML = '';
        const tree = document.createElement('div');
        tree.className = "tree";
        treeContainer.appendChild(tree);
        this.visualizeTree(this.root, tree);
    }
}

// Event listeners to handle user actions
const tree = new AVLTree();
const inputField = document.getElementById("valueInput");
const addButton = document.getElementById("addButton");
const deleteButton = document.getElementById("deleteButton");

addButton.addEventListener("click", () => {
    const value = parseInt(inputField.value);
    if (!isNaN(value)) {
        tree.add(value); // Calls the add method to insert a node
    } else {
        console.log("Invalid input");
    }
    inputField.value = "";
});

deleteButton.addEventListener("click", () => {
    const value = parseInt(inputField.value);
    if (!isNaN(value)) {
        tree.remove(value); // Calls the remove method to delete a node
    } else {
        console.log("Invalid input");
    }
    inputField.value = "";
});
